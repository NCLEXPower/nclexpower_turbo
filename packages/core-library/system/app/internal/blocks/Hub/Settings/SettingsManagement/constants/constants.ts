/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SelectOption } from "../../../../../../../../components";
import { ContentDateType } from "../../../../../../../../components/Dialog/DialogFormBlocks/contentApproval/validation";
import { RegularQuestionSelectionOptions, SectionType } from "../types";

export type BowtieFieldGroupType = {
  key: keyof typeof labelNames;
  count: number;
};

const createNumberList = (length: number) => {
  return Array.from({ length: length }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));
};

export const labelNames = {
  leftSection: "leftLabelName",
  centerSection: "centerLabelName",
  rightSection: "rightLabelName",
};

export const questionType = [
  { value: "SATA", label: "SATA" },
  { value: "MRSN", label: "MRSN" },
  { value: "DDC", label: "DDC" },
  { value: "DND", label: "DND" },
  { value: "HCP", label: "HCP" },
  { value: "MCQ", label: "MCQ(No Group)" },
  { value: "MCQ", label: "MCQ(Group)" },
  { value: "BOWTIE", label: "BOWTIE" },
];

export const BowtieFieldGroups: BowtieFieldGroupType[] = [
  { key: "leftSection", count: 5 },
  { key: "centerSection", count: 4 },
  { key: "rightSection", count: 5 },
];

export const labelMapping: { sectionName: SectionType; labelName: string }[] = [
  { sectionName: "leftSection", labelName: "leftLabelName" },
  { sectionName: "centerSection", labelName: "centerLabelName" },
  { sectionName: "rightSection", labelName: "rightLabelName" },
];

export const groupLabels = ({
  LeftLabel,
  CenterLabel,
  RightLabel,
}: {
  LeftLabel: string;
  CenterLabel: string;
  RightLabel: string;
}) => {
  return [
    {
      label: LeftLabel || "Left Label",
      section: "leftSection",
      count: 5,
    },
    {
      label: CenterLabel || "Center Label",
      section: "centerSection",
      count: 4,
    },
    {
      label: RightLabel || "Right Label",
      section: "rightSection",
      count: 5,
    },
  ];
};

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

export const bowtieInitAnswerValues = {
  value: "",
  container: "",
  isAnswer: false,
};

export const caseStudyQuestionnaires = {
  maxPoints: 1,
  seqNum: 1,
  itemNum: 1,
  itemStem: "",
  transitionHeader: "",
};

export const questionnairesDefaultValue = Array.from(
  { length: 6 },
  (_, index) => ({
    ...caseStudyQuestionnaires,
    itemNum: index + 1,
  })
);

export const initCaseStudyQuestionnaires = {
  questionnaires: questionnairesDefaultValue,
};

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

export const EnvironmentList: string[] = ["dev", "uat", "preprod", "prod"];

export const defaultValues: ContentDateType = {
  approval: [],
  implementationSchedule: new Date(),
};
