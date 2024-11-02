/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { atom } from 'jotai'
import * as yup from "yup";

export const DeleteConfirmationSchema = yup.object({
    id: yup.string().optional(),
    text: yup.string().required().default(""),
    inputText: yup
    .string()
    .required("Please input")
    .oneOf([yup.ref("text")], "Input doesn't match").default("")
})

export type DeleteConfirmationType = yup.InferType<typeof DeleteConfirmationSchema>

export const DeleteConfirmationAtom = atom<DeleteConfirmationType | undefined>(
    undefined
)
