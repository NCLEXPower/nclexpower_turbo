/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { time } from "console";
import * as yup from "yup";

export const contentDateSchema = yup.object({
  title: yup
    .string()
    .required("Title is required.")
    .max(100, "Title cannot be longer than 100 characters."),
  description: yup
    .string()
    .required("Description is required.")
    .max(500, "Title cannot be longer than 100 characters."),
  schedule: yup
    .date()
    .required("Date is required.")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be before today"
    ),
  countries: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one country."),
  timezones: yup
    .string()
    .required("Timezone is required."),
  environment: yup
    .string()
    .required("Environment is required.")
    .oneOf(["Dev", "Pre-Prod"]),
});

export type ContentDateType = yup.InferType<typeof contentDateSchema>;