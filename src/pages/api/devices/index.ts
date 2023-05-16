import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { CreateDeviceForm, createDeviceFormSchema } from "../../../forms/device";
import { createDevice, getDevices } from "../../../services/devices";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getCurrentUserToken(req);

  // Query device
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const result = await getDevices(token);
    res.status(200).json(result);
    return res.end();
  }

  // Create device
  if (req.method === "POST") {
    const params = await validateInput<CreateDeviceForm>(createDeviceFormSchema, req);
    const result = await createDevice(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
