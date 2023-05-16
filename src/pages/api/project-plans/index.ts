import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD_NOT_ALLOWED_ERROR } from "../../../constants/error";
import {
  CreateProjectPlanForm,
  createProjectPlanFormSchema,
  UpdateProjectPlanForm,
  updateProjectPlanFormSchema,
} from "../../../forms/projectPlan";
import { createProjectPlan, updateProjectPlan } from "../../../services/projectPlan";
import { ApiException } from "../../../types/error";
import { getCurrentUserToken, validateInput } from "../../../utils/server";
import withExceptionHandler from "../../../utils/withExceptionHandler";

export default withExceptionHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getCurrentUserToken(req);

  // Create project plan
  if (req.method === "POST") {
    const params = await validateInput<CreateProjectPlanForm>(createProjectPlanFormSchema, req);
    const result = await createProjectPlan(token, params);
    res.status(200).json(result);
    return res.end();
  }

  // Update project plan
  if (req.method === "PUT") {
    const params = await validateInput<UpdateProjectPlanForm>(updateProjectPlanFormSchema, req);
    const result = await updateProjectPlan(token, params);
    res.status(200).json(result);
    return res.end();
  }

  throw new ApiException(405, METHOD_NOT_ALLOWED_ERROR);
});
