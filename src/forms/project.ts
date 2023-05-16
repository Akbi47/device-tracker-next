import * as yup from "yup";

import { YubObjectSchema } from "../types";
import { Project } from "../types/models";

export const getProjectByIdSchema = yup.object<YubObjectSchema<Project>>({
  id: yup.number().required(),
});

export type SearchProjectApiForm = {
  year?: number;
  projectId?: string;
  userId?: string;
};

export const searchProjectApiSchema = yup.object<YubObjectSchema<SearchProjectApiForm>>({
  projectId: yup.number().nullable(),
  userId: yup.number().nullable(),
});

export type SearchProjectForm = {
  year: number;
  date: Date;
  projectId?: string | null;
  userId?: string | null;
};

export const searchProjectFormSchema = yup.object<YubObjectSchema<SearchProjectForm>>({
  date: yup.date().nullable(),
  projectId: yup.number().nullable(),
  userId: yup.number().nullable(),
});
