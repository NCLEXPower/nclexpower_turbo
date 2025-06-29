import * as yup from "yup";
import { OTP_REGEX } from "../utils";

export const OTPSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(OTP_REGEX, "OTP must be exactly 6 digits"),
});

export type OTPType = yup.InferType<typeof OTPSchema>;
