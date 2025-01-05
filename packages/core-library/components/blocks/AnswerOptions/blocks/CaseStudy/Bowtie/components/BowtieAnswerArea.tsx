import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ContainedCaseStudyQuestionType } from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { TextField } from "../../../../../../forms/TextField";

interface BowtieAnswerAreaProps {
  questionIndex: number;
}

export const BowtieAnswerArea = ({ questionIndex }: BowtieAnswerAreaProps) => {
  const { control, watch } = useFormContext<ContainedCaseStudyQuestionType>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          control={control}
          name={`questionnaires.${questionIndex}.leftLabelName`}
          placeholder="Left Label"
        />
        <TextField
          control={control}
          name={`questionnaires.${questionIndex}.centerLabelName`}
          placeholder="Center Label"
        />
        <TextField
          control={control}
          name={`questionnaires.${questionIndex}.rightLabelName`}
          placeholder="Right Label"
        />
      </Box>
    </Box>
  );
};
