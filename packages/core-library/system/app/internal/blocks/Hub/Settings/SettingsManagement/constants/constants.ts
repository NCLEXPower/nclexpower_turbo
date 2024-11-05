import { SelectOption } from "../../../../../../../../components";
import { ContainedCaseStudyQuestionType } from '../steps/content/simulator/types';
import { RegularQuestionSelectionOptions } from "../types";

const createNumberList = (length: number) => {
  return Array.from({ length: length }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));
};

export const questionType = [
  { value: "SATA", label: "SATA" },
  { value: "MRSN", label: "MRSN" },
  { value: "DDC", label: "DDC" },
];

export const tabsSequence: SelectOption[] = Array.from(
  { length: 6 },
  (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  })
);

export const maxPoints: SelectOption[] = createNumberList(25);

export const maxAnswer: SelectOption[] = createNumberList(5);

export const initBgValues = { seqNum: 1, seqContent: "" };

export const initAnswerValues = { answer: "", answerKey: false };

export const caseStudyQuestionnaires = {
  maxPoints: 1,
  seqNum: 1,
  itemNum: 1,
  itemStem: "",
  transitionHeader: "",
};

export const questionnairesDefaultValue = Array.from({ length: 6 }, (_, index) => ({
  ...caseStudyQuestionnaires,
  itemNum: index + 1,
}))

export const initCaseStudyQuestionnaires = {
  questionnaires: questionnairesDefaultValue,
}

export const initQuestionsValues = (
  questionnaireType: RegularQuestionSelectionOptions | undefined
) => {
  const answers =
    questionnaireType === "MCQ"
      ? Array(4).fill(initAnswerValues)
      : questionnaireType === "SATA"
        ? Array(5).fill(initAnswerValues)
        : [];

  return {
    clientNeeds: "",
    question: "",
    cognitiveLevel: "",
    contentArea: "",
    answers,
  };
};

export const actionButtons = [
  { action: "view", label: "View" },
  { action: "approval", label: "Approve" },
  { action: "reject", label: "Reject" },
];