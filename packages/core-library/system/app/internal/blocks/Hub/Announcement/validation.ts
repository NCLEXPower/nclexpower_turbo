import * as yup from "yup"

export const AnnouncementSchema = yup.object().shape({
  title: yup.string().required( "Title is required"),
  content: yup.string().required("Content is required"),
  image: yup.mixed<File[]>().default<File[]>([]),
});

export type AnnouncementType = yup.InferType<typeof AnnouncementSchema>