import * as yup from "yup";

import { YubObjectSchema } from "../types";
import { UserSkillLevel } from "../types/models";

export type CreateProjectUserApiForm = {
  projectId: string;
  userId: string;
  joinDate: Date;
  position?: UserSkillLevel;
};

export const createProjectUserApiSchema = yup.object<YubObjectSchema<CreateProjectUserApiForm>>({
  projectId: yup.number().nullable().required(),
  userId: yup.number().nullable().required(),
  joinDate: yup.date().nullable().required(),
  position: yup.lazy((value) =>
    value ? yup.string().oneOf(["PM", "PL", "QC", "DEV", "TESTER"]) : yup.string().nullable()
  ),
});

export type CreateProjectUserForm = {
  projectId: string | null;
  userId: string | null;
  joinDate: Date;
  position?: UserSkillLevel | null;
};

export const createProjectUserFormSchema = yup.object<YubObjectSchema<CreateProjectUserForm>>({
  projectId: yup.number().nullable().required(),
  userId: yup.number().nullable().required("Xin vui lòng chọn nhân sự"),
  joinDate: yup.date().nullable().required("Xin vui lòng nhập ngày tham gia"),
});
