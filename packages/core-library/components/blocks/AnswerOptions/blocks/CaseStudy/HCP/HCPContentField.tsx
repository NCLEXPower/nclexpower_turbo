import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { HighlightedTextsObj } from "../../../../../CustomExtension/highlighter-inputs/type";
import { Box, Typography } from "@mui/material";
import { ControlledHighlighterEditor } from "../../../../../HcpEditor/HcpEditor";

type Props = {
  questionIndex: number;
};

export const HCPContentField: React.FC<Props> = ({ questionIndex }) => {
  const { setValue } = useFormContext<ContainedCaseStudyQuestionType>();

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
    <Box mt={3} data-testid="hcp-custom-field">
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
          getJson={(obj) => handleGetHighlighted(obj as HighlightedTextsObj[])}
          name={`questionnaires.${questionIndex}.hcpContent`}
        />
      </Box>
    </Box>
  );
};
