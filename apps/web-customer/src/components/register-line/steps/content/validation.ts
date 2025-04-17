import * as yup from "yup";
import { atom } from "jotai";
import { EMAIL_REGEX } from "core-library";

export const registrationSchema = yup.object({
  firstname: yup.string().required("First Name is required").default(""),
  middlename: yup.string().optional().default(""),
  lastname: yup.string().required("Last Name is required").default(""),
  email: yup
    .string()
    .email()
    .matches(EMAIL_REGEX, "Please provide a valid email")
    .required("Email is required")
    .default(""),
  password: yup
    .string()
    .required("Password is required")
    .default("")
    .min(8, "Password must be at least 8 characters"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password")
    .default(""),
  termsofservice: yup
    .boolean()
    .default(false)
    .required(),
});

export const informationRegistrationSchema = registrationSchema.pick([
  "firstname",
  "middlename",
  "lastname",
]);

export const emailRegistrationSchema = registrationSchema.pick([
  "email",
  "password",
  "confirmpassword",
]);

export const agreementRegistrationSchema = registrationSchema.pick([
  "termsofservice",
]);

export type RegistrationFormType = yup.InferType<typeof registrationSchema>;
export type EmailRegistrationFormType = yup.InferType<
  typeof emailRegistrationSchema
>;
export type InformationRegistrationFormType = yup.InferType<
  typeof informationRegistrationSchema
>;
export type AgreementRegistrationFormType = yup.InferType<
  typeof agreementRegistrationSchema
>;

export const RegistrationAtom = atom<Partial<RegistrationFormType>>({});
