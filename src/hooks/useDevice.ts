import useSWR from "swr";

import { GetDeviceForm } from "../forms/device";
import { fetcher } from "../services";
import { ApiResult, Device } from "../types/models";

const useDevice = (params: GetDeviceForm) => {
  const { id, date } = params;
  const { data, error } = useSWR<ApiResult<Device>>([id ? `/api/devices/${id}` : null, { date }], fetcher);

  return {
    device: data?.data,
    loading: !error && !data,
    error,
  };
};

export default useDevice;
