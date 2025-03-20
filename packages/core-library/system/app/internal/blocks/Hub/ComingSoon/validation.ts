/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { time } from "console";
import * as yup from "yup";

export const contentDateSchema = yup.object({
  eventName: yup
    .string()
    .required("Title is required.")
    .max(100, "Title cannot be longer than 100 characters."),
  description: yup
    .string()
    .required("Description is required.")
    .max(500, "Title cannot be longer than 100 characters."),
  hasNoSchedule: yup.boolean().default(false),
  goLiveDate: yup.date().when("hasNoSchedule", {
    is: false,
    then: () =>
      yup
        .date()
        .required("Date is required.")
        .min(
          new Date(new Date().setHours(0, 0, 0, 0)),
          "Date cannot be before today"
        ),
    otherwise: () => yup.string().notRequired(),
  }),
  countries: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one country."),
  countryName: yup.array().of(yup.string()).optional(),
  timeZone: yup.string().required("Timezone is required."),
  countryKey: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one timezone.")
    .required("Timezone is required. Please select at least one timezone."),
  TargetEnvironment: yup
    .string()
    .required("Environment is required.")
    .oneOf(["dev", "pre-prod"]),
  announcement: yup.boolean().optional(),
  isActive: yup.boolean().optional(),
});

export type ContentDateType = yup.InferType<typeof contentDateSchema>;
