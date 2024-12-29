import * as yup from "yup";

export const accountSchema = yup.object({
  firstName: yup.string().default("").required("First Name is required"),
  lastName: yup.string().default("").required("Last Name is required"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required")
    .default(""),
  contactNumber: yup.string().default("").required("Last Name is required"),
  username: yup.string().default("").required("Username is required"),
  city: yup.string().default("").required("City is required"),
  country: yup.string().default("").required("Country is required"),
  zip: yup.string().default(""),
});

export type LoginFormType = yup.InferType<typeof accountSchema>;
