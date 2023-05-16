import useSWR from "swr";

import { fetcher } from "../services";
import { ApiResult, Device } from "../types/models";

const useDevices = () => {
  const { data, error } = useSWR<ApiResult<Device[]>>("/api/devices", fetcher);

  return {
    devices: data?.data || [],
    loading: !error && !data,
    error,
  };
};

export default useDevices;
