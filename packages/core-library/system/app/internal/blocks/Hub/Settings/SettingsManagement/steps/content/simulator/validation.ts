import * as yup from "yup";
import {
  CaseStudyQuestionSelectionOptions,
  QuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../types";
import { initAnswerValues } from "../../../constants/constants";
import { DDCAnswerOptionType, SATAAnswerOptionType } from "./types";

/**
 * Regular Questions Schemas
 */

export const answerSchema = yup.object().shape({
  answer: yup.string().required("Answer field is required"),
  answerKey: yup.boolean().default(false),
});

export const answerOptionsSchema = yup.object().shape({
  answers: yup.array(answerSchema).when("$type", {
    is: "SATA",
    then: (schema) =>
      schema
        .min(5)
        .max(8)
        .required()
        .test(
          "select-atleast-2",
          "You must select atleast 2 correct answer",
          (val) => val.filter((val) => val.answerKey === true).length >= 2
        ),
    otherwise: (schema) =>
      schema
        .max(4)
        .required()
        .test(
          "select-atleast-1",
          "Select ateleast 1 corrrect answer",
          (val) => {
            if (val.some((val) => val.answerKey === true)) return true;
          }
        ),
  }),
});

export const regularQuestionsFormSchema = yup.object({
  questionnaires: yup.array(
    yup
      .object({
        cognitiveLevel: yup
          .string()
          .required("Cognitive level is required")
          .default(""),
        clientNeeds: yup
          .string()
          .required("Client needs is required")
          .default(""),
        contentArea: yup
          .string()
          .default("")
          .required("Content area is required"),
        question: yup.string().required("Question is required").default(""),
      })
      .concat(answerOptionsSchema)
  ),
});

export const containedRegularQuestionSchema = yup
  .object({
    type: yup.mixed<RegularQuestionSelectionOptions>().required(),
    main_type: yup.mixed<QuestionSelectionOptions>().default("Regular"),
  })
  .required()
  .concat(regularQuestionsFormSchema);

/**
 * Case Study Questions Schemas
 */
const bgInfoContent = yup.object({
  seqNum: yup.number().transform((value) => parseInt(value)).default(1),
  seqContent: yup.string(),
});

export const ddcAnswerOptionsSchema = yup
  .object({
    optionName: yup.string().required(),
    options: yup.array(answerSchema).min(1).max(8),
  })
  .required();

const caseStudyAnswerFormSchema = yup.object({
  questionnaires: yup
    .array(
      yup.object({
        maxPoints: yup
          .number()
          .required("Max points are required.")
          .typeError("Max points must be a valid number."),
        seqNum: yup
          .number()
          .required("Sequence number are required.")
          .typeError("Sequence number must be a valid number."),
        questionType: yup
          .mixed<CaseStudyQuestionSelectionOptions>()
          .transform((v) => (!v ? undefined : v))
          .when("itemNum", (itemNum, schema) => {
            return schema.required(
              `Question No. ${itemNum} Question Type is required`
            );
          }),
        itemNum: yup
          .number()
          .required("Item number are required.")
          .typeError("Item number must be a valid number."),
        itemStem: yup.string().when("itemNum", (itemNum, schema) => {
          return schema.required(
            `Question No. ${itemNum} Item stem is required`
          );
        }),
        transitionHeader: yup.string().optional().default(""),
        maxAnswer: yup.number().when("questionType", {
          is: "MRSN",
          then: (schema) => schema.required("Max answer is required"),
        }),
        answers: yup
          .mixed<DDCAnswerOptionType[] | SATAAnswerOptionType[]>()
          .when("questionType", (questionType, schema) => {
            if (questionType.includes("DDC")) {
              return yup.array(ddcAnswerOptionsSchema).min(1).max(8);
            } else if (questionType.includes("SATA")) {
              return yup
                .array(answerSchema)
                .min(4)
                .max(8)
                .default(Array(5).fill(initAnswerValues));
            } else if (questionType.includes("MRSN")) {
              return yup
                .array(answerSchema)
                .when(["maxAnswer", "itemNum","maxPoints"], ([maxAnswer, itemNum,maxPoints], schema) =>
                  schema.test(
                    "answerKey-test",
                    `Question No. ${itemNum} ${maxAnswer ?? ""} correct answer must be selected.`,
                    (answers) => {
                      if (answers) {
                        const correctAnswersCount = answers.filter(
                          (answer) => answer.answerKey === true
                        ).length;
                        return correctAnswersCount == maxAnswer;
                      }
                    }
                  ).length(maxPoints, `Question No. ${itemNum} must have ${maxPoints ?? ""} options only`)
                );
            }
            return schema;
          })
          .optional(),
      })
    )
    .default([]),
});

export const caseStudyQuestionsFormSchema = yup
  .object({
    nurseNotes: yup.array(bgInfoContent).default([]),
    hxPhy: yup.array(bgInfoContent).default([]),
    labs: yup.array(bgInfoContent).default([]),
    orders: yup.array(bgInfoContent).default([]),
  })
  .concat(caseStudyAnswerFormSchema);

export const containedCaseStudyQuestionSchema = yup
  .object({
    caseName: yup
      .array()
      .min(1, "Please select atleast 1 case name")
      .required("Select atleast 1 case name")
      .default([]),
  })
  .concat(caseStudyQuestionsFormSchema);
