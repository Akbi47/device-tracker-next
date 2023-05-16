import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { getDropdownSkills } from "../../../services/skill";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query skills
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const result = await getDropdownSkills(token);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
