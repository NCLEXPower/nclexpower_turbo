import * as yup from "yup";
import {
  CaseStudyQuestionSelectionOptions,
  QuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../types";
import { initAnswerValues } from "../../../constants/constants";
import { DDCAnswerOptionType, DNDAnswerOptionType, SATAAnswerOptionType } from "./types";
import { generateQuestionErrorMessage } from './utils/generateQuestionErrorMessage';

/**
 * Regular Questions Schemas
 */

export const defaultOptionSchema = yup.object().shape({
  answer: yup
    .string()
    .required(({ path }) => generateQuestionErrorMessage(path, "Answer field is required")),
  answerKey: yup.boolean().default(false),
});

export const answerOptionsSchema = yup.object().shape({
  answers: yup.array(defaultOptionSchema).when("$type", {
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

// Case Study Questions Schemas

// DDC Answer Options Schema
export const ddcAnswerOptionsSchema = yup
  .object({
    optionName: yup
      .string()
      .required(({ path }) => generateQuestionErrorMessage(path, "Option name is required")),
    options: yup.array(defaultOptionSchema).min(1).max(8),
  })
  .required();

// DND Answer Options Schema
export const dndAnswerOptionsSchema = yup.object({
  value: yup.string().required(),
  label: yup.string().required(),
});

// DND Keys Schema
const dndKeysSchema = yup.object({
  dndAnswer: yup
    .array()
    .of(
      yup.object({
        indexPos: yup.number().required(),
        fieldKey: yup.string().required(),
        answerId: yup.string().required(({ path }) => generateQuestionErrorMessage(path, "Must select correct answer")),
      })
    )
    .when("questionType", {
      is: "DND",
      then: (schema) => schema.required(({ path }) => generateQuestionErrorMessage(path, "Dnd answer options is required")),
    }),
});

// MRSN Max Answer Schema
const mrsnMaxAnswer = yup.object({
  maxAnswer: yup
    .number()
    .when("questionType", {
      is: "MRSN",
      then: (schema) =>
        schema.required(({ path }) => generateQuestionErrorMessage(path, "Max answer is required")),
    }),
});

// MRSN Answer Schema
const mrsnAnswerSchema = yup.array()
  .of(defaultOptionSchema)
  .when(["maxAnswer", "itemNum", "maxPoints"], ([maxAnswer, itemNum, maxPoints], schema) =>
    schema
      .test(
        "answerKey-test",
        `Question No. ${itemNum} ${maxAnswer ?? ""} correct answer(s) must be selected.`,
        (answers) => Array.isArray(answers) && answers.filter((answer) => answer.answerKey).length === maxAnswer
      )
      .length(maxPoints, `Question No. ${itemNum}: Must have exactly ${maxPoints ?? ""} option(s).`)
  );

// Question Options Schema
const questionOptionsSchemas = {
  DDC: yup
    .array(ddcAnswerOptionsSchema)
    .min(1, ({ path }) => generateQuestionErrorMessage(path, "Maximum answer count"))
    .max(10, ({ path }) => generateQuestionErrorMessage(path, "Maximum answer count")),
  DND: yup
    .array(dndAnswerOptionsSchema)
    .min(1, ({ path }) => generateQuestionErrorMessage(path, "Maximum answer count"))
    .max(10, ({ path }) => generateQuestionErrorMessage(path, "Maximum answer count")),
  SATA: yup
    .array(defaultOptionSchema)
    .min(4)
    .default(Array(5).fill(initAnswerValues)),
  MRSN: mrsnAnswerSchema,
};

// Answers Schema
const answersSchema = yup.object({
  answers: yup
    .mixed<DDCAnswerOptionType[] | SATAAnswerOptionType[] | DNDAnswerOptionType[]>()
    .when("questionType", (questionType, schema) => {
      const matchedSchema = Object.entries(questionOptionsSchemas).find(([key]) =>
        questionType?.includes(key)
      )?.[1];
      return matchedSchema || schema;
    }),
});

// Background Information Content Schema
const bgInfoContent = yup.object({
  seqNum: yup.number().transform((value) => parseInt(value)).default(1),
  seqContent: yup.string(),
});

// Case Study Questionnaire Schema
const caseStudyQuestionnaireSchema = yup.object({
  questionnaires: yup
    .array()
    .of(
      yup
        .object({
          maxPoints: yup
            .number()
            .required(({ path }) => generateQuestionErrorMessage(path, "Max options is required"))
            .typeError(({ path }) => generateQuestionErrorMessage(path, "Max points must be a valid number.")),

          seqNum: yup
            .number()
            .required(({ path }) => generateQuestionErrorMessage(path, "Sequence number is required"))
            .typeError(({ path }) => generateQuestionErrorMessage(path, "Sequence number must be a valid number")),

          questionType: yup
            .mixed<CaseStudyQuestionSelectionOptions>()
            .transform((v) => (!v ? undefined : v))
            .required(({ path }) => generateQuestionErrorMessage(path, "Question type is required")),

          itemNum: yup
            .number()
            .required(({ path }) => generateQuestionErrorMessage(path, "Item number is required"))
            .typeError(({ path }) => generateQuestionErrorMessage(path, "Item number must be a valid number.")),

          itemStem: yup
            .string()
            .required(({ path }) => generateQuestionErrorMessage(path, "Item stem is required.")),

          transitionHeader: yup.string().optional().default(""),
        })
        .concat(answersSchema)
        .concat(dndKeysSchema)
        .concat(mrsnMaxAnswer)
    )
    .default([]),
});

// Contained Case Study Question Schema
export const containedCaseStudyQuestionSchema = yup
  .object({
    caseName: yup
      .array()
      .min(1, "Please select at least 1 case name")
      .required("Select at least 1 case name"),
    formId: yup.string(),
    nurseNotes: yup.array(bgInfoContent).default([]),
    hxPhy: yup.array(bgInfoContent).default([]),
    labs: yup.array(bgInfoContent).default([]),
    orders: yup.array(bgInfoContent).default([]),
    type: yup.mixed<CaseStudyQuestionSelectionOptions>().optional(),
    main_type: yup.mixed<QuestionSelectionOptions>().default("Case Study"),
  })
  .concat(caseStudyQuestionnaireSchema);
