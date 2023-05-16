import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, Project } from "../types/models";

const useProject = (id?: string) => {
  const { data, error } = useSWR<ApiResult<Project>>(id ? `/api/projects/${id}` : null, fetcher);

  return {
    project: data?.data,
    loading: !error && !data,
    error,
  };
};

export default useProject;
