import { caseStudyQuestionnaires } from "../../../../../../../../constants/constants";

export const createInitialQuestionnairesValues = (number: number) => {
  return {
    questionnaires: Array.from({ length: number }, (_, index) => ({
      ...caseStudyQuestionnaires,
      itemNum: index + 1,
    })),
  };
};
