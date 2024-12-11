import { TokenizeInformations } from "../../../../../../../../../../../api/types";
import { ContainedCaseStudyQuestionType } from "../types";

export const convertToCreateCaseStudy = (
  containedCaseStudyQuestion: ContainedCaseStudyQuestionType, internal: TokenizeInformations | undefined
) => {
  const mainCaseStudyContentCollectionDtos = [{
    caseName: containedCaseStudyQuestion.caseName,
    nurseNotes: containedCaseStudyQuestion.nurseNotes.map((item) => ({
      seqContent: item?.seqContent,
      seqNum: item.seqNum
    })),
    hxPhy: containedCaseStudyQuestion.hxPhy.map((item) => ({
      seqContent: item?.seqContent,
      seqNum: item.seqNum,
    })),
    labs: containedCaseStudyQuestion.labs.map((item) => ({
      seqContent: item?.seqContent,
      seqNum: item.seqNum
    })),
    orders: containedCaseStudyQuestion.orders.map((item) => ({
      seqContent: item?.seqContent,
      seqNum: item.seqNum 
    })),
    questionnaires: containedCaseStudyQuestion.questionnaires.map((questionnairesItem) => ({
      itemNum: questionnairesItem.itemNum,
      itemStem: questionnairesItem?.itemStem,
      maxPoints: questionnairesItem.maxPoints,
      questionType: questionnairesItem?.questionType,
      seqNum: questionnairesItem.seqNum,
      transitionHeader: questionnairesItem.transitionHeader,
      maxAnswer: questionnairesItem?.maxAnswer,
      answers: questionnairesItem.answers 
    }))
  }];

  if (!internal) {
    throw new Error("Internal is undefined");
  }

  return {
    email: internal.email,
    contentDto: {
      type: "",
      mainType: containedCaseStudyQuestion.main_type,
      mainCaseStudyContentCollectionDtos: mainCaseStudyContentCollectionDtos,
      mainContentCollectionsDtos: [],
    },
  };
};