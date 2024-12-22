import * as yup from "yup";
import { EMAIL_REGEX } from "../../../../../utils";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .matches(EMAIL_REGEX, "Please provide a valid email")
    .required("Email is required")
    .default(""),
  password: yup.string().required("Password is required").default(""),
  appName: yup.string().default(""),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;
