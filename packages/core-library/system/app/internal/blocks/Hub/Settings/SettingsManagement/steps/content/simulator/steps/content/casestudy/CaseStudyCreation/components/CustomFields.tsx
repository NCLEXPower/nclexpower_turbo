import React from "react";
import {
  CaseStudyQuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../../../../../../types";
import { HCPContentField } from "../../../../../../../../../../../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/HCP/HCPContentField";
import { BowtieAnswerArea } from "../../../../../../../../../../../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/Bowtie/components/BowtieAnswerArea";

type Props = {
  questionIndex: number;
  questionType:
    | CaseStudyQuestionSelectionOptions
    | RegularQuestionSelectionOptions;
};

export const CustomFields: React.FC<Props> = ({
  questionIndex,
  questionType,
}) => {
  switch (questionType) {
    case "Highlight":
      return <HCPContentField questionIndex={questionIndex} />;
    case "Bowtie":
      return <BowtieAnswerArea questionIndex={questionIndex} />;
    default:
      return <></>;
  }
};
