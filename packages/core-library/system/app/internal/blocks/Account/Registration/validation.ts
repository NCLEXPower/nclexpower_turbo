/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import * as yup from "yup";
import { EMAIL_REGEX } from "../../../../../../utils";

export const registrationSchema = yup.object({
  hasNoMiddleName: yup.boolean().default(false),
  firstname: yup.string().required("First Name is required").default(""),
  middlename: yup
    .string()
    .when("hasNoMiddleName", {
        is: false,
        then: () =>
          yup
            .string()
            .required(
              "Please provide your middle initial"
            ),
        otherwise: () => yup.string().notRequired(),
      })
    .default(""),
  lastname: yup.string().required("Last Name is required").default(""),
  email: yup
    .string()
    .email()
    .matches(EMAIL_REGEX, "Please provide a valid email")
    .required("Email is required")
    .default(""),
  password: yup.string().required("Password is required").default(""),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password")
    .default(""),
  termsofservice: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Service")
    .required(),
  consent: yup
    .boolean()
    .oneOf([true], "You must consent to the Privacy Policy")
    .required(),
});

export type RegistrationFormType = yup.InferType<typeof registrationSchema>;
