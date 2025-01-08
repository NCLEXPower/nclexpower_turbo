import { Box, Typography } from "@mui/material";
import { BowtieFieldGroups } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { useFormContext } from "react-hook-form";
import { ControlledCheckbox } from "../../../../../Checkbox/Checkbox";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { TextField } from "../../../../../forms/TextField";
import useSyncSectionWithLabel from "../../../../../../hooks/useSyncContainer";

type BowtiePropsType = {
  questionIndex: number;
};

export const Bowtie = ({ questionIndex }: BowtiePropsType) => {
  const { control, watch } = useFormContext<ContainedCaseStudyQuestionType>();

  const LeftLabel =
    watch(`questionnaires.${questionIndex}.leftLabelName`) ?? "";
  const CenterLabel =
    watch(`questionnaires.${questionIndex}.centerLabelName`) ?? "";
  const RightLabel =
    watch(`questionnaires.${questionIndex}.rightLabelName`) ?? "";

  useSyncSectionWithLabel({
    sectionName: "leftSection",
    labelName: "leftLabelName",
    questionIndex,
  });

  useSyncSectionWithLabel({
    sectionName: "centerSection",
    labelName: "centerLabelName",
    questionIndex,
  });

  useSyncSectionWithLabel({
    sectionName: "rightSection",
    labelName: "rightLabelName",
    questionIndex,
  });

  return (
    <Box sx={{ display: "flex", gap: 5, padding: 5 }}>
      {BowtieFieldGroups &&
        BowtieFieldGroups.map((group, groupIndex) => (
          <Box
            key={groupIndex}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {groupIndex === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ maxWidth: "100px", wordBreak: "break-word" }}>
                  {LeftLabel || "Left Label"}
                </Typography>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        control={control}
                        name={`questionnaires.${questionIndex}.leftSection.${index}.value`}
                      />
                      <ControlledCheckbox
                        control={control}
                        name={`questionnaires.${questionIndex}.leftSection.${index}.isAnswer`}
                      />
                    </Box>
                  ))}
              </Box>
            )}
            {groupIndex === 1 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ maxWidth: "100px", wordBreak: "break-word" }}>
                  {CenterLabel || "Center Label"}
                </Typography>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        control={control}
                        name={`questionnaires.${questionIndex}.centerSection.${index}.value`}
                      />
                      <ControlledCheckbox
                        control={control}
                        name={`questionnaires.${questionIndex}.centerSection.${index}.isAnswer`}
                      />
                    </Box>
                  ))}
              </Box>
            )}
            {groupIndex === 2 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ maxWidth: "100px", wordBreak: "break-word" }}>
                  {RightLabel || "Right Label"}
                </Typography>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        control={control}
                        name={`questionnaires.${questionIndex}.rightSection.${index}.value`}
                      />
                      <ControlledCheckbox
                        control={control}
                        name={`questionnaires.${questionIndex}.rightSection.${index}.isAnswer`}
                      />
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};
