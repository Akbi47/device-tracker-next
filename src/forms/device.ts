import * as yup from "yup";

import { YubObjectSchema } from "../types";

export type CreateDeviceForm = {
  name: string | null;
};

export const createDeviceFormSchema = yup.object<YubObjectSchema<CreateDeviceForm>>({
  name: yup.string().nullable().required("Please enter the Device name"),
});

export type GetDeviceForm = {
  id?: string | null;
  date?: Date | string;
};

export const getDeviceFormSchema = yup.object<YubObjectSchema<GetDeviceForm>>({
  id: yup.number().required(),
  date: yup.date().nullable(),
});

export type UpdateDeviceForm = {
  id: string | null;
  name: string | null;
};

export const updateDeviceFormSchema = createDeviceFormSchema;
