import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, Project } from "../types/models";

const useDropdownProjects = () => {
  const { data, error } = useSWR<ApiResult<Project[]>>("/api/projects/dropdown", fetcher);

  return {
    projects: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useDropdownProjects;
