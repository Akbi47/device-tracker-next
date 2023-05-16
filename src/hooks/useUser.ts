import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, User } from "../types/models";

const useUser = (id?: string) => {
  const { data, error } = useSWR<ApiResult<User>>(id ? `/api/users/${id}` : null, fetcher);

  return {
    user: data?.data,
    loading: !error && !data,
    error,
  };
};

export default useUser;
