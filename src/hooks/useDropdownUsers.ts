import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, User } from "../types/models";

const useDropdownUsers = (includeUserSkills = false) => {
  const { data, error } = useSWR<ApiResult<User[]>>(["/api/users/dropdown", { includeUserSkills }], fetcher);

  return {
    users: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useDropdownUsers;
