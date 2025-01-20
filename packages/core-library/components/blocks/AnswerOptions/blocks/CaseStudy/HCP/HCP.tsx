import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  ContainedCaseStudyQuestionType,
  HCPNAnswerOptionType,
} from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { ControlledCheckbox } from "../../../../../Checkbox/Checkbox";
import { Box, Typography } from "@mui/material";
import { Card } from "../../../../../Card/Card";
import { ControlledHighlighterEditor } from "../../../../../HcpEditor/HcpEditor";
import { HighlightedTextsObj } from "../../../../../CustomExtension/highlighter-inputs/type";

type Props = {
  questionIndex: number;
};

export const HCP: React.FC<Props> = ({ questionIndex }) => {
  const { watch } = useFormContext<ContainedCaseStudyQuestionType>();
  const answers = watch(
    `questionnaires.${questionIndex}.answers`
  ) as HCPNAnswerOptionType[];

  return (
    <Card data-testid="hcp-casestudy-block">
      {Array.isArray(answers) &&
        answers.map((answer, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
              my: 2,
              boxShadow: 2,
            }}
            key={index}
          >
            <ControlledCheckbox
              name={`questionnaires.${questionIndex}.answers.${index}.answerKey`}
              sx={{ margin: 0 }}
            />
            <Typography
              maxWidth={1}
              sx={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              {answer.answer}
            </Typography>
          </Box>
        ))}
    </Card>
  );
};
