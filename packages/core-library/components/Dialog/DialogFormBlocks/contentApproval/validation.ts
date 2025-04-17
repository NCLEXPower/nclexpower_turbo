/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { atom } from "jotai";
import * as yup from "yup";

export const contentDateSchema = yup.object({
  data: yup.array(
    yup.object({
      contentId: yup.string().required().default(""),
      contentAuthorId: yup.string().required().default(""),
    })
  ),
  implementationSchedule: yup
    .date()
    .required("Date is required.")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be before today"
    ),
});

export type ContentDateType = yup.InferType<typeof contentDateSchema>;

export const ContentDateAtom = atom<ContentDateType | undefined>(undefined);
