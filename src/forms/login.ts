import * as yup from "yup";

import { YubObjectSchema } from "../types";

export type LoginForm = {
  email: string;
  password: string;
};

export const loginFormSchema = yup.object<YubObjectSchema<LoginForm>>({
  email: yup.string().required("Please enter the Email"),
  password: yup.string().required("Please enter the Password"),
});
