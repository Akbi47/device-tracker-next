import useSWR from "swr";

import { SearchConditionForm } from "../forms";
import { fetcher } from "../services";
import { ApiResult, Project } from "../types/models";

const useProjects = (searchConditionForm: SearchConditionForm) => {
  const { data, error } = useSWR<ApiResult<Project[]>>(["/api/projects", searchConditionForm], fetcher);

  return {
    projects: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useProjects;
