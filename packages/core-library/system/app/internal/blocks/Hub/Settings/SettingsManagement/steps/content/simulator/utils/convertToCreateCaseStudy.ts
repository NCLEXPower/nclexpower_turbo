import {
  CaseStudyContentCollectionDtos,
  MainContentCollectionsDtos,
  TokenizeInformations,
} from "../../../../../../../../../../../api/types";
import { QuestionSelectionOptions } from "../../../../types";
import { ContainedCaseStudyQuestionType } from "../types";

export const convertToCreateCaseStudy = (
  containedCaseStudyQuestion: ContainedCaseStudyQuestionType,
  internal: TokenizeInformations | undefined
) => {
  const mainCaseStudyContentCollectionDtos = [
    {
      caseNum: containedCaseStudyQuestion.caseNum,
      mainText: containedCaseStudyQuestion.mainText,
      caseName: containedCaseStudyQuestion.caseName,
      nurseNotes: containedCaseStudyQuestion.nurseNotes.map((item) => ({
        seqContent: item?.seqContent,
        seqNum: item.seqNum,
      })),
      hxPhy: containedCaseStudyQuestion.hxPhy.map((item) => ({
        seqContent: item?.seqContent,
        seqNum: item.seqNum,
      })),
      labs: containedCaseStudyQuestion.labs.map((item) => ({
        seqContent: item?.seqContent,
        seqNum: item.seqNum,
      })),
      orders: containedCaseStudyQuestion.orders.map((item) => ({
        seqContent: item?.seqContent,
        seqNum: item.seqNum,
      })),
      questionnaires: containedCaseStudyQuestion.questionnaires.map(
        (questionnairesItem) => ({
          itemNum: questionnairesItem.itemNum,
          itemStem: questionnairesItem?.itemStem,
          maxPoints: questionnairesItem.maxPoints,
          questionType: questionnairesItem?.questionType,
          seqNum: questionnairesItem.seqNum,
          transitionHeader: questionnairesItem.transitionHeader,
          maxAnswer: questionnairesItem?.maxAnswer,
          answers: questionnairesItem.answers ?? [],
          centerLabelName: questionnairesItem.centerLabelName,
          leftLabelName: questionnairesItem.leftLabelName,
          rightLabelName: questionnairesItem.rightLabelName,
          leftSection: questionnairesItem.leftSection,
          centerSection: questionnairesItem.centerSection,
          rightSection: questionnairesItem.rightSection,
          columns: questionnairesItem.columns,
          rows: questionnairesItem.rows,
          hcpContent: questionnairesItem.hcpContent,
          dndAnswer: questionnairesItem.dndAnswer,
          rationale: questionnairesItem.rationale,
        })
      ),
    },
  ];

  if (!internal) {
    throw new Error("Internal is undefined");
  }

  return {
    email: internal.email,
    contentDto: {
      type: "",
      mainType:
        containedCaseStudyQuestion.main_type as QuestionSelectionOptions,
      mainCaseStudyContentCollectionDtos:
        mainCaseStudyContentCollectionDtos as CaseStudyContentCollectionDtos[],
      mainContentCollectionsDtos: [] as MainContentCollectionsDtos[],
    },
  };
};
