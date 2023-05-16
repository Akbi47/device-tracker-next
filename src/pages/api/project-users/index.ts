import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { CreateProjectUserApiForm, createProjectUserApiSchema } from "../../../forms/projectUser";
import { createProjectUser } from "../../../services/projectUser";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Create project user
  if (req.method === "POST") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<CreateProjectUserApiForm>(createProjectUserApiSchema, req);
    const result = await createProjectUser(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
