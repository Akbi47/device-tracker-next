import moment from "moment";
import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, Project, ProjectPlan, ProjectUser } from "../types/models";

type ProjectPlanApiResult = ApiResult<{
  project: Project;
  projectPlan: ProjectPlan;
  projectUsers: ProjectUser[];
}>;

const useProjectPlanAtMonth = (projectId?: string, projectPlanId?: string, month?: string) => {
  projectPlanId = projectPlanId || "null";
  const projectPlanMonth = moment(month).format("YYYY-MM-DD[T]00:00:00[Z]");
  const url = `/api/projects/${projectId}/project-plans/${projectPlanId}/${projectPlanMonth}`;
  const { data, error } = useSWR<ProjectPlanApiResult>(projectId && month ? url : null, fetcher);

  return {
    project: data?.data.project,
    projectPlan: data?.data.projectPlan,
    projectUsers: data?.data.projectUsers,
    loading: !error && !data,
    error,
  };
};

export default useProjectPlanAtMonth;
