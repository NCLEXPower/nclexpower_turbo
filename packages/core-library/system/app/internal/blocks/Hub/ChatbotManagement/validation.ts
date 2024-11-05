/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as yup from 'yup';

export const SubsequentSchema = yup.object({
  optionText: 
    yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Subsequent field is required')
    .default("")
})

export const EndConversationSchema = yup.object({
  end: yup.number().required().default(0)
})

export const SubsequentOptionsSchema = yup.object({
  OptionText: 
    yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Subsequent field is required')
    .default(""),
  optionKey: yup.string().required(''),
  AnswerText:  yup.string().required('')
  
})

export const ChatbotOptionSchema = yup.object({
  OptionText:     
  yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Subsequent field is required')
    .default(""),
  AnswerText: yup.string().required('Answer field is required').default(""),
  SubsequentOption: yup.array(SubsequentOptionsSchema)

})

export type SubsequentType = yup.InferType<typeof SubsequentSchema>
export type ChatbotOptionType = yup.InferType<typeof ChatbotOptionSchema>
export type EndConversationType = yup.InferType<typeof EndConversationSchema>

