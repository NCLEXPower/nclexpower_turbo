import { RegularQuestionsSteps, RegularQuestionStepProps } from "./types";
import { RegularQuestionFormType } from "../types";
import { WizardFormMap } from '../../../../../../../hooks';

export type CreateNewRegularQuestionsFormSteps =
  | "CreateNewRegularQuestionMCQ"
  | "CreateNewRegularQuestionSATA";

export const CreateRegularQuestionsSteps = {
  ChooseQuestionType: {
    nextStep: "SummaryView",
    previousStep: "ChooseQuestionType",
    content: (props) => <></>,
  },
} as WizardFormMap<
  Partial<RegularQuestionsSteps>,
  RegularQuestionFormType,
  RegularQuestionStepProps
>;
