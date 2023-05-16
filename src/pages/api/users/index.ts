import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { SearchUserApiForm, searchUserApiSchema } from "../../../forms/user";
import { getUsers } from "../../../services/user";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query users
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<SearchUserApiForm>(searchUserApiSchema, req);
    const result = await getUsers(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
