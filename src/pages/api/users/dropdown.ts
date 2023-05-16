import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { getDropdownUsers } from "../../../services/user";
import { ApiException } from "../../../types/error";
import { toBoolean } from "../../../utils";
import { getCurrentUserToken } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query users
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const { includeUserSkills } = req.query;
    const result = await getDropdownUsers(token, toBoolean(includeUserSkills));
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
