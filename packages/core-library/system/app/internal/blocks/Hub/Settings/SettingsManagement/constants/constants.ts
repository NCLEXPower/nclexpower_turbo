/**
 * Property of the Arxon Solutions, LLC.
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

export const questionTypes = {
  UNFOLDING: [
    { value: "SATA", label: "Select All That Apply" },
    { value: "MRSN", label: "Multi-response Select N" },
    { value: "DDCloze", label: "Drop-down Cloze" },
    { value: "DDTable", label: "Drop-down Table" },
    { value: "DNDrop", label: "Drag and Drop" },
    { value: "Highlight", label: "Highlight Phrases" },
    { value: "MatrixNoGrp", label: "Matrix MCQ Without Grouping" },
    { value: "MatrixWithGrp", label: "Matrix MCQ With Grouping" },
  ],
  STANDALONE: [{ value: "Bowtie", label: "Bowtie" }],
};

export const caseStudyType = [
  {
    label: "Unfolding Case",
    value: "UNFOLDING",
  },
  {
    label: "Standalone Case",
    value: "STANDALONE",
  },
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
  rationale: "",
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
  data: [],
  implementationSchedule: new Date(),
};

export const initMCQColumn = { label: "" };
export const initMCQRow = {
  rowTitle: "",
  rowId: 0,
  choices: [
    { value: false, choiceId: 0 },
    { value: false, choiceId: 1 },
  ],
};
