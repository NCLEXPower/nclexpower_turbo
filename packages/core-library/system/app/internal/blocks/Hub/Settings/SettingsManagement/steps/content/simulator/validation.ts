import * as yup from "yup";
import {
  CaseStudyQuestionSelectionOptions,
  QuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../types";
import { initAnswerValues } from "../../../constants/constants";
import {
  CaseStudyType,
  DDCAnswerOptionType,
  DNDAnswerOptionType,
  HCPNAnswerOptionType,
  SATAAnswerOptionType,
} from "./types";
import { generateQuestionErrorMessage } from "./utils/generateQuestionErrorMessage";
/**
 * Regular Questions Schemas
 */

export const defaultOptionSchema = yup.object().shape({
  answer: yup
    .string()
    .required(({ path }) =>
      generateQuestionErrorMessage(path, "Answer field is required")
    ),
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
export const ddcAnswerOptionsSchema = yup
  .object({
    optionName: yup
      .string()
      .required(({ path }) =>
        generateQuestionErrorMessage(path, "Option name is required")
      ),
    options: yup.array(defaultOptionSchema).min(1).max(8),
  })
  .required();

export const dndAnswerOptionsSchema = yup.object({
  value: yup.string().required(),
  answer: yup.string().required(),
});

export const dndAnswersSchema = yup.object({
  indexPos: yup.number().required(),
  fieldKey: yup.string().required(),
  answerId: yup
    .string()
    .required(({ path }) =>
      generateQuestionErrorMessage(path, "Must select correct answer")
    ),
});

const dndKeysSchema = yup.object({
  dndAnswer: yup
    .array()
    .of(dndAnswersSchema)
    .when("questionType", {
      is: "DND",
      then: (schema) =>
        schema.required(({ path }) =>
          generateQuestionErrorMessage(path, "Dnd answer options is required")
        ),
    }),
});

const mcqGroupColumn = yup.object({
  label: yup
    .string()
    .when("questionType", {
      is: (val: string) => val === "MCQGROUP" || val === "MCQNOGROUP",
      then: (schema) =>
        schema.required(({ path }) =>
          generateQuestionErrorMessage(path, "Column label is required")
        ),
    })
    .required("Column Title is Required"),
});

const mcqGroupRow = yup.object().shape({
  rowIndexPos: yup.number(),
  rowTitle: yup
    .string()
    .when("questionType", {
      is: (val: string) => val === "MCQGROUP" || val === "MCQNOGROUP",
      then: (schema) =>
        schema.required(({ path }) =>
          generateQuestionErrorMessage(path, "Row title is required")
        ),
    })
    .required("Row Title is required"),
  choices: yup
    .array()
    .of(
      yup.object({
        value: yup.boolean().default(false),
        choiceIndexPos: yup.number(),
      })
    )
    .required("Choices are required.")
    .test("must-select-one", "You must select at least one choice", (choices) =>
      choices.some((choice) => choice.value === true)
    ),
});

export const mcqGroupAnswerSchema = yup.object({
  columns: yup
    .array()
    .of(mcqGroupColumn)
    .when("questionType", {
      is: (val: string) => val === "MCQGROUP" || val === "MCQNOGROUP",
      then: (schema) =>
        schema.required(({ path }) =>
          generateQuestionErrorMessage(path, "This is required")
        ),
    }),
  rows: yup
    .array()
    .of(mcqGroupRow)
    .when("questionType", {
      is: (val: string) => val === "MCQGROUP" || val === "MCQNOGROUP",
      then: (schema) =>
        schema.required(({ path }) =>
          generateQuestionErrorMessage(path, "This is required")
        ),
    }),
});

const mrsnMaxAnswer = yup.object({
  maxAnswer: yup.number().when("questionType", {
    is: "MRSN",
    then: (schema) =>
      schema.required(({ path }) =>
        generateQuestionErrorMessage(path, "Max answer is required")
      ),
  }),
});

const mrsnAnswerSchema = yup
  .array()
  .of(defaultOptionSchema)
  .when(
    ["maxAnswer", "itemNum", "maxPoints"],
    ([maxAnswer, itemNum, maxPoints], schema) =>
      schema.test(
        "answerKey-test",
        `Question No. ${itemNum} ${maxAnswer ?? ""} correct answer(s) must be selected.`,
        (answers) =>
          Array.isArray(answers) &&
          answers.filter((answer) => answer.answerKey).length === maxAnswer
      )
  );

export const bowtieAnswerOptionsSchema = yup.object({
  value: yup
    .string()
    .required(({ path }) =>
      generateQuestionErrorMessage(path, " Label is required")
    )
    .default(""),
  container: yup.string(),
  isAnswer: yup.boolean().default(false),
});

export const bowtieAnswerSchema = yup.object({
  leftLabelName: yup.string().when("questionType", {
    is: "BOWTIE",
    then: (schema) =>
      schema.required(({ path }) =>
        generateQuestionErrorMessage(path, "Left Label is required")
      ),
  }),
  centerLabelName: yup.string().when("questionType", {
    is: "BOWTIE",
    then: (schema) =>
      schema.required(({ path }) =>
        generateQuestionErrorMessage(path, "Center Label is required")
      ),
  }),
  rightLabelName: yup.string().when("questionType", {
    is: "BOWTIE",
    then: (schema) =>
      schema.required(({ path }) =>
        generateQuestionErrorMessage(path, "Right Label is required")
      ),
  }),

  leftSection: yup
    .array()
    .of(bowtieAnswerOptionsSchema)
    .when("questionType", {
      is: "BOWTIE",
      then: (schema) =>
        schema.test(
          "left-exactly-two-true-isAnswer",
          "Left Section must have exactly 2 checked answers.",
          (answers) =>
            Array.isArray(answers) &&
            answers.filter((answer) => answer.isAnswer).length === 2
        ),
      otherwise: (schema) => schema.notRequired(),
    }),

  centerSection: yup
    .array()
    .of(bowtieAnswerOptionsSchema)
    .when("questionType", {
      is: "BOWTIE",
      then: (schema) =>
        schema.test(
          "exactly-one-true-isAnswer",
          "Center Section must have exactly 1 checked answer.",
          (answers) =>
            Array.isArray(answers) &&
            answers.filter((answer) => answer.isAnswer).length === 1
        ),
      otherwise: (schema) => schema.notRequired(),
    }),

  rightSection: yup
    .array()
    .of(bowtieAnswerOptionsSchema)
    .when("questionType", {
      is: "BOWTIE",
      then: (schema) =>
        schema.test(
          "right-exactly-two-true-isAnswer",
          "Right Section must have exactly 2 checked answers.",
          (answers) =>
            Array.isArray(answers) &&
            answers.filter((answer) => answer.isAnswer).length === 2
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const hcpOptionSchema = yup.object().shape({
  answer: yup
    .string()
    .required(({ path }) =>
      generateQuestionErrorMessage(path, "Answer field is required")
    ),
  answerKey: yup.boolean().default(false),
  attrName: yup
    .string()
    .required(({ path }) =>
      generateQuestionErrorMessage(path, "Attribute name is required")
    ),
});

const questionOptionsSchemas = {
  DDCloze: yup
    .array(ddcAnswerOptionsSchema)
    .min(1, ({ path }) =>
      generateQuestionErrorMessage(path, "Maximum answer count")
    )
    .max(10, ({ path }) =>
      generateQuestionErrorMessage(path, "Maximum answer count")
    ),
  DNDrop: yup
    .array(dndAnswerOptionsSchema)
    .min(1, ({ path }) =>
      generateQuestionErrorMessage(path, "Maximum answer count")
    )
    .max(10, ({ path }) =>
      generateQuestionErrorMessage(path, "Maximum answer count")
    ),
  SATA: yup.array(defaultOptionSchema).min(4),
  MRSN: mrsnAnswerSchema,
  Highlight: yup
    .array(hcpOptionSchema)
    .required(({ path }) =>
      generateQuestionErrorMessage(path, "Must contained atleast 1 option")
    )
    .test(
      "select-atleast-2",
      "You must select atleast 1 correct answer",
      (val) => val.filter((val) => val.answerKey === true).length >= 1
    ),
};

const answersSchema = yup.object({
  answers: yup
    .mixed<
      | DDCAnswerOptionType[]
      | SATAAnswerOptionType[]
      | DNDAnswerOptionType[]
      | HCPNAnswerOptionType[]
    >()
    .when("questionType", (questionType, schema) => {
      const matchedSchema = Object.entries(questionOptionsSchemas).find(
        ([key]) => questionType?.includes(key)
      )?.[1];
      return matchedSchema || schema;
    }),
});

const bgInfoContent = yup.object({
  seqNum: yup
    .number()
    .transform((value) => parseInt(value))
    .default(1),
  seqContent: yup.string(),
});

const hcpContentSchema = yup.object({
  hcpContent: yup.string().when("questionType", {
    is: "HCP",
    then: (schema) =>
      schema.required(({ path }) =>
        generateQuestionErrorMessage(path, "HCP content is required")
      ),
  }),
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
            .required(({ path }) =>
              generateQuestionErrorMessage(path, "Max options is required")
            )
            .typeError(({ path }) =>
              generateQuestionErrorMessage(
                path,
                "Max points must be a valid number."
              )
            ),

          seqNum: yup
            .number()
            .required(({ path }) =>
              generateQuestionErrorMessage(path, "Sequence number is required")
            )
            .typeError(({ path }) =>
              generateQuestionErrorMessage(
                path,
                "Sequence number must be a valid number"
              )
            ),

          questionType: yup
            .mixed<CaseStudyQuestionSelectionOptions>()
            .transform((v) => (!v ? undefined : v))
            .when("itemNum", (itemNum, schema) =>
              schema.required(({ path }) =>
                generateQuestionErrorMessage(path, "Question type is required")
              )
            ),

          itemNum: yup
            .number()
            .required(({ path }) =>
              generateQuestionErrorMessage(path, "Item number is required")
            )
            .typeError(({ path }) =>
              generateQuestionErrorMessage(
                path,
                "Item number must be a valid number."
              )
            ),

          itemStem: yup
            .string()
            .required(({ path }) =>
              generateQuestionErrorMessage(path, "Item stem is required.")
            ),
          transitionHeader: yup.string().optional().default(""),
          rationale: yup
            .string()
            .required(({ path }) =>
              generateQuestionErrorMessage(path, "Rationale is required.")
            ),
        })
        .concat(answersSchema)
        .concat(hcpContentSchema)
        .concat(dndKeysSchema)
        .concat(mrsnMaxAnswer)
        .concat(bowtieAnswerSchema)
        .concat(mcqGroupAnswerSchema)
    )
    .default([]),
});

// Contained Case Study Question Schema
export const containedCaseStudyQuestionSchema = yup
  .object({
    caseName: yup
      .array()
      .transform((value) => (Array.isArray(value) ? value : [value]))
      .min(1, "Please select at least 1 case name")
      .required("Select at least 1 case name"),
    formId: yup.string(),
    caseType: yup.mixed<CaseStudyType>().required(),
    caseNum: yup.number().required(),
    nurseNotes: yup.array(bgInfoContent).default([]),
    hxPhy: yup.array(bgInfoContent).default([]),
    labs: yup.array(bgInfoContent).default([]),
    orders: yup.array(bgInfoContent).default([]),
    type: yup.mixed<CaseStudyQuestionSelectionOptions>().optional(),
    main_type: yup.mixed<QuestionSelectionOptions>().default("Case Study"),
    mainText: yup.string().when("$step", {
      is: 2,
      then: (schema) => schema.required("Main Text Field is Required"),
    }),
  })
  .concat(caseStudyQuestionnaireSchema);
