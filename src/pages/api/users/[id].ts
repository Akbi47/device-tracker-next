import { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { getUserByIdSchema } from "../../../forms/user";
import { getUser } from "../../../services/user";
import { ApiException } from "../../../types/error";
import { User } from "../../../types/models";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query user by id
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<User>(getUserByIdSchema, req);
    const result = await getUser(token, params.id);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
