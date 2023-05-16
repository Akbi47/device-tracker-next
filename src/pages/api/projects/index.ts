import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import { SearchProjectApiForm, searchProjectApiSchema } from "../../../forms/project";
import { getProjects } from "../../../services/project";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query projects
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<SearchProjectApiForm>(searchProjectApiSchema, req);
    const result = await getProjects(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
