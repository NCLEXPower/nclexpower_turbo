/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { atom } from "jotai";
import * as yup from "yup";

export const documentSchema = yup.object({
  title: yup.string().required("Title is required").default(""),
  link: yup
    .mixed<File[]>()
    .required("Document file is required")
    .test(
      "is-document-selected",
      "No document selected",
      (value) => value && value.length > 0
    )
    .default<File[]>([]),
});

export const videoSchema = yup.object({
  title: yup.string().required("Video Title is required").default(""),
  link: yup
    .mixed<File[]>()
    .required("Video file is required")
    .test(
      "is-video-selected",
      "No video selected",
      (value) => value && value.length > 0
    )
    .default<File[]>([]),
  videoPlaceholder: yup
    .mixed<File[]>()
    .required("Video Placeholder is required")
    .test(
      "is-video-placeholder-selected",
      "No video placeholder selected",
      (value) => value && value.length > 0
    )
    .default<File[]>([]),
  authorName: yup.string().required("Author Name is required").default(""),
  authorImage: yup
    .mixed<File[]>()
    .required("Author Image is required")
    .test(
      "is-author-image-selected",
      "No author image selected",
      (value) => value && value.length > 0
    )
    .default<File[]>([]),
  description: yup.string().required("Description is required").default(""),
});

export const simulatorSchema = yup.object({
  title: yup.string().required("Title is required").default(""),
  contentArea: yup.string().required("Select a Content Area").default(""),
  guided: yup.boolean().default(false),
  unguided: yup.boolean().default(false),
  practice: yup.boolean().default(false),
});

export const contentCardsSchema = yup.object({
  title: yup.string().required("Title is required").default(""),
  cards: yup
    .array()
    .of(
      yup.object({
        cardTopic: yup.string().default(""),
        cardFaces: yup
          .array()
          .of(yup.mixed<File>().required("Card face is required"))
          .required("Card faces array is required")
          .default([]),
      })
    )
    .default([]),
});

export const CATSchema = yup.object({
  catSimulator: yup.string().required("CAT Simulator is required").default(""),
  contentAreaCoverage: yup
    .array()
    .of(yup.string().required("Each content area is required"))
    .min(1, "At least one content area is required")
    .required("Content area coverage is required"),
});

export type SectionFormType =
  | yup.InferType<typeof documentSchema>
  | yup.InferType<typeof videoSchema>
  | yup.InferType<typeof simulatorSchema>
  | yup.InferType<typeof contentCardsSchema>
  | yup.InferType<typeof CATSchema>;

export const SectionTitleAtom = atom<string>("");
export const SectionTypeAtom = atom<string>("");
export const SectionDataIdAtom = atom<string>("");
export const SectionIdAtom = atom<string>("");
