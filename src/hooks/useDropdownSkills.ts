import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, Skill } from "../types/models";

const useDropdownSkills = () => {
  const { data, error } = useSWR<ApiResult<Skill[]>>("/api/skills/dropdown", fetcher);

  return {
    skills: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useDropdownSkills;
