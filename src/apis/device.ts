import { CreateDeviceForm, GetDeviceForm } from "../forms/device";
import { creator, fetcher, updater } from "../services";
import { ApiResult, Device } from "../types/models";
import { UpdateDeviceForm } from "./../forms/device";

export const createDevice = (deviceForm: CreateDeviceForm) => creator("/api/devices", deviceForm);

export const getDevice = async (deviceForm: GetDeviceForm): Promise<ApiResult<Device>> => {
  const { id, date } = deviceForm;
  return await fetcher(`/api/devices/${id}`, { date });
};

export const updateDeviceName = (deviceForm: UpdateDeviceForm) => {
  const { id, name } = deviceForm;
  return updater(`/api/devices/${id}`, { name });
};
