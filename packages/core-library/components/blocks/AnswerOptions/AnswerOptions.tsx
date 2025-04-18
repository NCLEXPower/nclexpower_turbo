import React from "react";
import {
  CaseStudyQuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/types";
import { MCQ } from "./blocks/Regular/MCQ/MCQ";
import { SATA } from "./blocks/Regular/SATA/SATA";
import { DDClozeAndTable } from "./blocks/CaseStudy/DDC/DDC";
import { MRSN } from "./blocks/CaseStudy/MRSN/MRSN";
import { DND } from "./blocks/CaseStudy/DND/DND";
import { HCP } from "./blocks/CaseStudy/HCP/HCP";
import { Bowtie } from "./blocks/CaseStudy/Bowtie/Bowtie";
import { MCQGroup } from "./blocks/CaseStudy/MCQGroup/MCQGroup";
import { MCQNoGroup } from "./blocks/CaseStudy/MCQNoGroup/MCQNoGroup";

export type AnswerOptionsType = {
  questionType: "regularQuestion" | "caseStudy";
  questionnaireType?:
    | CaseStudyQuestionSelectionOptions
    | RegularQuestionSelectionOptions;
  questionIndex: number;
};

export const AnswerOptions: React.FC<AnswerOptionsType> = ({
  questionType,
  questionnaireType,
  questionIndex,
}) => {
  if (questionType === "regularQuestion") {
    switch (questionnaireType) {
      case "MCQ":
        return <MCQ questionIndex={questionIndex} />;
      case "SATA":
        return <SATA questionIndex={questionIndex} />;
    }
  } else if (questionType === "caseStudy") {
    switch (questionnaireType) {
      case "DDCloze":
        return <DDClozeAndTable questionIndex={questionIndex} />;
      case "DDTable":
        return <DDClozeAndTable questionIndex={questionIndex} />;
      case "MRSN":
      case "SATA":
        return <SATA questionIndex={questionIndex} />;
      case "DNDrop":
        return <DND questionIndex={questionIndex} />;
      case "Highlight":
        return <HCP questionIndex={questionIndex} />;
      case "Bowtie":
        return <Bowtie questionIndex={questionIndex} />;
      case "MatrixWithGrp":
        return <MCQGroup questionIndex={questionIndex} />;
      case "MatrixNoGrp":
        return <MCQNoGroup questionIndex={questionIndex} />;
    }
  }
  return null;
};
