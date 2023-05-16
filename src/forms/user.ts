import isArray from "lodash/isArray";
import * as yup from "yup";

import { YubObjectSchema } from "../types";
import { User } from "../types/models";

export const getUserByIdSchema = yup.object<YubObjectSchema<User>>({
  id: yup.number().required(),
});

export type SearchUserApiForm = {
  year?: string;
  projectId?: string;
  userId?: string;
  skillIds?: string[];
};

export const searchUserApiSchema = yup.object<YubObjectSchema<SearchUserApiForm>>({
  year: yup.number().nullable(),
  projectId: yup.number().nullable(),
  userId: yup.number().nullable(),
  skillIds: yup.lazy((value) => (isArray(value) ? yup.array().of(yup.number().nullable()) : yup.number().nullable())),
});
