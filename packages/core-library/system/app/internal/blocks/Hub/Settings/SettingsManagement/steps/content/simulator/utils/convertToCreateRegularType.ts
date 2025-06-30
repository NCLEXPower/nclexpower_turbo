import {
  MainContentCollectionsDtos,
  TokenizeInformations,
} from "../../../../../../../../../../../api/types";
import { AccountReferenceInformation } from "../../../../../../../../../../../contexts/AccountReferenceContext";
import { ContainedRegularQuestionType } from "../types";

export const convertToCreateRegularType = (
  containedRegularQuestion: ContainedRegularQuestionType,
  internal: AccountReferenceInformation | undefined
) => {
  const mainContentCollectionsDtos: MainContentCollectionsDtos[] = (
    containedRegularQuestion.questionnaires || []
  ).map((item) => ({
    cognitiveLevel: item.cognitiveLevel,
    clientNeeds: item.clientNeeds,
    contentArea: item.contentArea,
    question: item.question,
    mainContentAnswerCollectionDtos: (item.answers || []).map((answerItem) => ({
      answer: answerItem.answer,
      answerKey: answerItem.answerKey as boolean,
    })),
  }));

  if (!internal) {
    throw new Error("Internal is undefined");
  }

  return {
    email: internal.email,
    contentDto: {
      type: containedRegularQuestion.type,
      mainType: containedRegularQuestion.main_type,
      mainContentCollectionsDtos: mainContentCollectionsDtos,
    },
  };
};
