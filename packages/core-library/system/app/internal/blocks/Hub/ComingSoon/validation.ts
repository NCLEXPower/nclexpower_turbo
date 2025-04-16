import * as yup from "yup";

export const contentDateSchema = yup.object({
  eventName: yup
    .string()
    .required("Title is required.")
    .max(100, "Title cannot be longer than 100 characters."),
  description: yup
    .string()
    .required("Description is required.")
    .max(500, "Description cannot be longer than 500 characters."),
  hasNoSchedule: yup.boolean().default(false),
  countdownEnabled: yup.boolean().default(false),
  goLiveDate: yup.date().when(["hasNoSchedule", "countdownEnabled"], {
    is: (hasNoSchedule: boolean, countdownEnabled: boolean) =>
      !hasNoSchedule && countdownEnabled,
    then: () =>
      yup
        .date()
        .required("Date is required.")
        .min(new Date(), "Date cannot be in the past"),
    otherwise: () => yup.date().notRequired(),
  }),
  countryKey: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one country.")
    .required("At least one country is required."),
  timeZone: yup.string().when(["hasNoSchedule", "countdownEnabled"], {
    is: (hasNoSchedule: boolean, countdownEnabled: boolean) =>
      !hasNoSchedule && countdownEnabled,
    then: (schema) => schema.required("Timezone is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  TargetEnvironment: yup
    .string()
    .required("Environment is required.")
    .oneOf(["dev", "pre-prod"]),
  announcement: yup.boolean().optional(),
  isActive: yup.boolean().optional(),
});

export type ContentDateType = yup.InferType<typeof contentDateSchema>;
