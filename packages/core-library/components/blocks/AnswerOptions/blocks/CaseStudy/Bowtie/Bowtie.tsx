import { Box, Typography } from "@mui/material";
import {
  BowtieFieldGroups,
  groupLabels,
  labelMapping,
} from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { useFormContext } from "react-hook-form";
import { ControlledCheckbox } from "../../../../../Checkbox/Checkbox";
import { TextField } from "../../../../../forms/TextField";
import { useSynchronizeSectionWithLabel } from "../../../../../../hooks";

type BowtiePropsType = {
  questionIndex: number;
};

export const Bowtie: React.FC<BowtiePropsType> = ({ questionIndex }) => {
  const { control, watch } = useFormContext();
  const LeftLabel =
    watch(`questionnaires.${questionIndex}.leftLabelName`) ?? "";
  const CenterLabel =
    watch(`questionnaires.${questionIndex}.centerLabelName`) ?? "";
  const RightLabel =
    watch(`questionnaires.${questionIndex}.rightLabelName`) ?? "";

  labelMapping.forEach(({ sectionName, labelName }) => {
    useSynchronizeSectionWithLabel({
      sectionName,
      labelName,
      questionIndex,
    });
  });

  return (
    <Box
      data-testid="bowtie-section"
      sx={{ display: "flex", gap: 5, padding: 5 }}
    >
      {BowtieFieldGroups &&
        BowtieFieldGroups.map((_, groupIndex) => {
          const labelSelection = groupLabels({
            LeftLabel,
            CenterLabel,
            RightLabel,
          });
          const { label, section, count } = labelSelection[groupIndex] || {};
          const validatedCount = typeof count === "number" ? count : 0;
          return (
            <Box
              key={groupIndex}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {label && section && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{ maxWidth: "100px", wordBreak: "break-word" }}
                  >
                    {label}
                  </Typography>
                  {Array(validatedCount)
                    .fill(null)
                    .map((_, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <TextField
                          control={control}
                          name={`questionnaires.${questionIndex}.${section}.${index}.value`}
                        />
                        <ControlledCheckbox
                          control={control}
                          name={`questionnaires.${questionIndex}.${section}.${index}.isAnswer`}
                        />
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
          );
        })}
    </Box>
  );
};
