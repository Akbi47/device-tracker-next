import { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../../../../constants/error";
import { GetProjectPlanByIdApiForm, getProjectPlanByIdSchema } from "../../../../../../forms/projectPlan";
import { getProjectPlanById } from "../../../../../../services/projectPlan";
import { ApiException } from "../../../../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../../../../utils/server";
import withExceptionHandler from "../../../../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // Query project plan by id
  if (req.method === "GET") {
    const token = await getCurrentUserToken(req);
    const params = await validateInput<GetProjectPlanByIdApiForm>(getProjectPlanByIdSchema, req);
    const result = await getProjectPlanById(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
