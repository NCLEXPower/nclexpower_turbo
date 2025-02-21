import { Typography } from "@mui/material";
import React, { memo } from "react";
import { CaseStudyQuestionSelectionOptions } from "../../../../../../../../types";
import { EvaIcon } from "../../../../../../../../../../../../../../../components";
import { Box } from "@mui/material";

type InstructionProps = {
  questionType?: CaseStudyQuestionSelectionOptions;
};

export const Instruction = memo(({ questionType }: InstructionProps) => {
  if (!questionType) return <></>;
  const getInstruction = () => {
    switch (questionType) {
      case "DNDrop":
      case "DDCloze":
        return "Write your text with [[placeholder]] for answer fields, e.g., The capital of[[country]] is [[city]].";
      case "DDTable":
        return "Write your text with [[placeholder]] placed inside table cells, e.g., The capital of country [[city]].";
      default:
        return "Complete all blank fields and proceed to another question";
    }
  };
  return (
    <Box display="flex" mt={2}>
      <Box mr={1}>
        <EvaIcon
          name="alert-circle-outline"
          fill="#6c757d"
          height={17}
          width={17}
        />
      </Box>
      <Typography color="#6c757d" variant="caption">
        {getInstruction()}
      </Typography>
    </Box>
  );
});
