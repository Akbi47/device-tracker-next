import { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../../constants/error";
import { getProjectByIdSchema } from "../../../../forms/project";
import { getProject } from "../../../../services/project";
import { ApiException } from "../../../../types/error";
import { Project } from "../../../../types/models";
import { getCurrentUserToken, validateInput } from "../../../../utils/server";
import withExceptionHandler from "../../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query project by id
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<Project>(getProjectByIdSchema, req);
    const result = await getProject(token, params.id);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
