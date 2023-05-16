import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../../constants/error";
import { GetDeviceForm, getDeviceFormSchema, UpdateDeviceForm, updateDeviceFormSchema } from "../../../../forms/device";
import { getDevice, updateDeviceName } from "../../../../services/devices";
import { ApiException } from "../../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../../utils/server";
import withExceptionHandler from "../../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getCurrentUserToken(req);

  // Query projects
  if (req.method === "GET") {
    const params = await validateInput<GetDeviceForm>(getDeviceFormSchema, req);
    const result = await getDevice(token, params);
    res.status(200).json(result);
    return res.end();
  }

  // Update device name
  if (req.method === "PUT") {
    const params = await validateInput<UpdateDeviceForm>(updateDeviceFormSchema, req);
    const result = await updateDeviceName(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
