import React from "react";
import {
  CaseStudyQuestionSelectionOptions,
  RegularQuestionSelectionOptions,
} from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/types";
import { MCQ } from "./blocks/Regular/MCQ/MCQ";
import { SATA } from "./blocks/Regular/SATA/SATA";
import { DDC } from "./blocks/CaseStudy/DDC/DDC";
import { MRSN } from "./blocks/CaseStudy/MRSN/MRSN";
import { DND } from "./blocks/CaseStudy/DND/DND";
import { Bowtie } from "./blocks/CaseStudy/Bowtie/Bowtie";

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
      case "DDC":
        return <DDC questionIndex={questionIndex} />;
      case "SATA":
        return <SATA questionIndex={questionIndex} />;
      case "MRSN":
        return <MRSN questionIndex={questionIndex} />;
      case "DND":
        return <DND questionIndex={questionIndex} />;
      case "BOWTIE":
        return <Bowtie questionIndex={questionIndex} />;
    }
  }
  return null;
};
