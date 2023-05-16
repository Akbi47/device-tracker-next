import * as yup from "yup";

import { YubObjectSchema } from "../types";

export type SearchConditionForm = {
  year: number;
  date?: Date;
  projectId?: string | null;
  userId?: string | null;
  skillIds?: string | null;
};

export const searchConditionFormSchema = yup.object<YubObjectSchema<SearchConditionForm>>({
  date: yup.date().required().typeError("Xin vui lòng nhập năm"),
  projectId: yup.number().nullable(),
  userId: yup.number().nullable(),
  skillIds: yup.number().nullable(),
});
