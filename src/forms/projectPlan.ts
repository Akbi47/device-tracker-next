import * as yup from "yup";

import { YubObjectSchema } from "../types";

export type ProjectUserPlanForm = {
  projectUserId: string;
  projectUserPlanId?: string;
  month: string;
  plan: string;
  actual?: string;
  note: string;
};

export type CreateProjectPlanForm = {
  projectId: string | null;
  month: string;
  plan: string;
  note: string;
  projectUserPlans: ProjectUserPlanForm[];
};

export const createProjectPlanFormSchema = yup.object<YubObjectSchema<CreateProjectPlanForm>>({
  projectId: yup.number().nullable().required(),
  month: yup.date().nullable().required(),
  plan: yup.number().nullable().required("Xin vui lòng nhập số lượng Man/Month").typeError("Xin vui lòng nhập %"),
  note: yup.string().nullable().max(255, "Xin vui lòng nhập từ 255 ký tự trở lại"),
  projectUserPlans: yup.array().of(
    yup.object<YubObjectSchema<ProjectUserPlanForm>>({
      projectUserId: yup.number().nullable().required(),
      month: yup.date().nullable().required(),
      plan: yup.lazy((value) => (value === "" ? yup.string() : yup.number().typeError("Xin vui lòng nhập %"))),
      note: yup.string().nullable().max(255, "Xin vui lòng nhập từ 255 ký tự trở lại"),
    })
  ),
});

export type UpdateProjectPlanForm = {
  projectId: string | null;
  projectPlanId: string | null;
  month: string;
  plan: string;
  note: string;
  projectUserPlans: ProjectUserPlanForm[];
};

export const updateProjectPlanFormSchema = yup.object<YubObjectSchema<UpdateProjectPlanForm>>({
  projectId: yup.number().nullable().required(),
  projectPlanId: yup.number().nullable().required(),
  month: yup.date().nullable().required(),
  plan: yup.number().nullable().required("Xin vui lòng nhập số lượng Man/Month").typeError("Xin vui lòng nhập %"),
  note: yup.string().nullable().max(255, "Xin vui lòng nhập từ 255 ký tự trở lại"),
  projectUserPlans: yup.array().of(
    yup.object<YubObjectSchema<ProjectUserPlanForm>>({
      projectUserId: yup.number().nullable().required(),
      month: yup.date().nullable().required(),
      plan: yup.lazy((value) => (value === "" ? yup.string() : yup.number().typeError("Xin vui lòng nhập %"))),
      actual: yup.lazy((value) => (value === "" ? yup.string() : yup.number().typeError("Xin vui lòng nhập %"))),
      note: yup.string().nullable().max(255, "Xin vui lòng nhập từ 255 ký tự trở lại"),
    })
  ),
});

export type GetProjectPlanByIdApiForm = {
  id: string; // projectId
  projectPlanId?: string | null;
};

export const getProjectPlanByIdSchema = yup.object<YubObjectSchema<GetProjectPlanByIdApiForm>>({
  id: yup.number().required(),
  projectPlanId: yup.lazy((value) => (value === "null" ? yup.string() : yup.number())),
});

export type GetProjectPlanByIdAndMonthApiForm = GetProjectPlanByIdApiForm & {
  month: string;
};

export const getProjectPlanByIdAndMonthSchema = yup.object<YubObjectSchema<GetProjectPlanByIdAndMonthApiForm>>({
  id: yup.number().required(),
  projectPlanId: yup.lazy((value) => (value === "null" ? yup.string() : yup.number())),
  month: yup.date().required(),
});
