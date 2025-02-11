import React, { useCallback } from "react";
import { DndAnswerType } from "../../../../../../../../../../../../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/type";
import { Typography } from "@mui/material";
import { ParsedHtml } from "../../../../../../../../../../../../../../../../components";
import { DNDAnswerOptionType } from "../../../../../../types";
import { QuestionnaireItem } from "../../../../../../../../../../../../../types";

type Props = {
  questionData: QuestionnaireItem;
};

export const DNDQuestion: React.FC<Props> = ({ questionData }) => {
  const { itemStem, dndAnswer } = questionData;

  const renderContent = useCallback(
    (itemStem: string, dndAnswers: DndAnswerType[]) => {
      if (!itemStem) {
        return <Typography>No content available</Typography>;
      }
      const parts = itemStem.split(/\[\[(.*?)\]\]/);

      return parts.map((part, index) => {
        const answerOptions = questionData.answers as DNDAnswerOptionType[];
        const answer = dndAnswers.find((ans) => ans.fieldKey === part);
        const answerLabel = answerOptions.find(
          (ans) => ans.value === answer?.answerId
        )?.answer;

        if (answer) {
          return (
            <Typography key={index} component="span">
              <span
                style={{
                  fontWeight: "bold",
                  padding: "4px 8px",
                  backgroundColor: "#f9f7ed",
                  borderRadius: "4px",
                  display: "inline-block",
                  minWidth: "100px",
                }}
              >
                {answerLabel}
              </span>
            </Typography>
          );
        }

        return (
          <Typography key={index} component="span">
            <ParsedHtml html={part} />
          </Typography>
        );
      });
    },
    []
  );

  return (
    <div data-testid="dnd-answer-block">
      {renderContent(itemStem, dndAnswer ?? [])}
    </div>
  );
};
