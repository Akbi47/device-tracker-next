import useSWR from "swr";

import { SearchConditionForm } from "../forms";
import { fetcher } from "../services";
import { ApiResult, User } from "../types/models";

const useUsers = (searchConditionForm: SearchConditionForm) => {
  const { data, error } = useSWR<ApiResult<User[]>>(["/api/users", searchConditionForm], fetcher);

  return {
    users: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useUsers;
