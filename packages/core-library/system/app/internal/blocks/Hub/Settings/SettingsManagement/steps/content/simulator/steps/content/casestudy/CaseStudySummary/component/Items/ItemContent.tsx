import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { QuestionnaireItem } from "../../../../../../../../../../../../../types";
import { Tabs } from "../../../../../../../../../../../../../../../../components";
import { ContainedCaseStudyQuestionType } from "../../../../../../types";
import { Items } from "./items";
import { CaseStudyQuestionSelectionOptions } from "../../../../../../../../../types";

interface ItemProps {
  values: Partial<ContainedCaseStudyQuestionType>;
  selectedQuestion?: (itemNum: number) => void;
}

export const ItemContent: React.FC<ItemProps> = ({
  values,
  selectedQuestion,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const generateTabs = (data: QuestionnaireItem[]) => {
    return data.map((item, index) => {
      const title = `Item ${item.itemNum}`;

      return {
        title,
        id: index + 1,
        content: <Items content={[item]} />,
      };
    });
  };

  useEffect(() => {
    selectedQuestion && selectedQuestion(selectedIndex);
  }, [selectedIndex]);

  const VALID_QUESTION_TYPES = [
    "DDCloze",
    "DNDrop",
    "SATA",
    "MRSN",
    "Highlight",
    "MatrixNoGrp",
    "MatrixWithGrp",
    "DDTable",
    "Bowtie",
  ];

  const validQuestionnaires =
    values.questionnaires?.filter((item): item is QuestionnaireItem =>
      VALID_QUESTION_TYPES.includes(item.questionType ?? "")
    ) || [];

  return validQuestionnaires.length > 0 ? (
    <Box>
      <Tabs
        tabsItem={generateTabs(validQuestionnaires)}
        selectedTabIndex={(selected) => setSelectedIndex(selected)}
      />
    </Box>
  ) : (
    <Typography>No valid questionnaire data available</Typography>
  );
};
