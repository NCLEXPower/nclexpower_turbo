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
  const { watch, setValue } = useFormContext<ContainedCaseStudyQuestionType>();
  const answers = watch(
    `questionnaires.${questionIndex}.answers`
  ) as HCPNAnswerOptionType[];

  const handleGetHighlighted = (content: HighlightedTextsObj[]) => {
    setValue(
      `questionnaires.${questionIndex}.answers`,
      content.map((value) => ({
        answer: value.text,
        answerKey: false,
        attrName: value.attr,
      }))
    );
  };

  return (
    <Card>
      <Box mt={3}>
        <Typography color="#525252" fontSize="16px" fontWeight={600}>
          Background Info :
        </Typography>
        <Box
          width={1}
          mt={2}
          borderRadius={"5px"}
          boxShadow={2}
          p={4}
          overflow={"hidden"}
        >
          <ControlledHighlighterEditor
            placeholder="Add content"
            getJson={(obj) =>
              handleGetHighlighted(obj as HighlightedTextsObj[])
            }
            name={`questionnaires.${questionIndex}.hcpContent`}
          />
        </Box>
      </Box>

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
