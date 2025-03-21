/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as yup from "yup";

export const crbSchema = yup.object({
  contentId: yup.string().required("Must contain content id"),
  authorId: yup.string().required("Must contain author id"),
  comment: yup.string().optional(),
  option: yup.number().required("Select at least one option."),
  date: yup
    .date()
    .required("Date is required.")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be before today"
    ),
});

export const approverSchema = yup.object({
  reply: yup.string().optional(),
});

export type crbType = yup.InferType<typeof crbSchema>;
export type approverType = yup.InferType<typeof approverSchema>;
