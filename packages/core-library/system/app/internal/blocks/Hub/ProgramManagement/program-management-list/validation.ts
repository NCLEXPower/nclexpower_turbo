/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { atom } from "jotai";
import * as yup from "yup";

export const removeProgramSchema = yup.object({
  program: yup
    .string()
    .required("Program topic is required for deletion")
    .default(""),
});

export type RemoveProgramFormType = yup.InferType<typeof removeProgramSchema>;

export const createProgramSchema = yup.object({
  programImage: yup
    .mixed<File[]>()
    .required("Program Image is required")
    .test(
      "is-image-selected",
      "No image selected",
      (value) => value && value.length > 0
    )
    .default<File[]>([]),
  programName: yup.string().required("Program Name is required").default(""),
  sections: yup
    .array()
    .of(
      yup.object({
        sectionTitle: yup.string().required("Enter Section Title").default(""),
        sectionType: yup.string().required("Select Section Type").default(""),
        sectionValue: yup
          .mixed()
          .test(
            "is-string-or-array",
            "Select Section Data must be a string or an array",
            (value) => typeof value === "string" || Array.isArray(value)
          )
          .required("Select Section Data is required")
          .default(""),
      })
    )
    .min(1, "At least one section is required"),
  sectionTimer: yup.string().optional().default("")
});

export type CreateProgramFormType = yup.InferType<typeof createProgramSchema>;

export const programIDAtom = atom<string>("");
export const programTypeAtom = atom<number>(0);