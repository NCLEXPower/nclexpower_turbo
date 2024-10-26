import * as yup from 'yup'
import { STRING_REGEX } from '../../../../../../../utils'

export const accountSetupSchema = yup.object({
  firstname: yup.string().required('First Name is required').default("").matches(STRING_REGEX, "Special characters not allowed"),
  lastname: yup.string().required('Last Name is required').default("").matches(STRING_REGEX, "Special characters not allowed"),
  middlename: yup.string().optional().default("").matches(STRING_REGEX, "Special characters not allowed"),
  imgurl: yup.string().optional().default("none"),
  email: yup.string().email("Invalid email").required('Email is required').default(""),
  username: yup.string().required('Username is required').default(""),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').default(""),
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("password")], "Passwords must match")
    .default(""),
  accessLevel: yup.number().required('Access Level is required.'),
  routers: yup.array().of(
    yup.object().shape({
      label: yup.string().required('Label is required'),
      value: yup.string().required('Value is required'),
    })
  ).required('Routers are required')
    .default([])
})

export type AccountSetupType = yup.InferType<typeof accountSetupSchema>
