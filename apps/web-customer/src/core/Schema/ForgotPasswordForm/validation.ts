import * as yup from "yup";
import { atom } from "jotai";
import { EMAIL_REGEX } from "core-library";

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email must be in a valid email format")
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please provide a valid email")
    .default(""),
});

export type ForgotPasswordType = yup.InferType<typeof forgotPasswordSchema>;

export const ForgotPasswordAtom = atom<ForgotPasswordType | undefined>(
  undefined
);
