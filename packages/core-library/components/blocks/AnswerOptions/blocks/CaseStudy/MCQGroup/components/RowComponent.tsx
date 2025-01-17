import { useFormContext } from "react-hook-form";
import { TablePropType } from "../../../../../../../system/app/internal/types";
import { ControlledCheckbox } from "../../../../../../Checkbox/Checkbox";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { TextField } from "../../../../../../forms/TextField";

export const RowComponent: React.FC<TablePropType> = ({
  column,
  questionIndex,
  rowIndex,
}) => {
  const { control, setValue, getValues } = useFormContext();

  useEffect(() => {
    const existingRowId = getValues(
      `questionnaires.${questionIndex}.rows.${rowIndex}.rowId`
    );
    if (!existingRowId) {
      setValue(
        `questionnaires.${questionIndex}.rows.${rowIndex}.rowId`,
        rowIndex && rowIndex + 1
      );
    }

    Array(column)
      .fill(null)
      .forEach((_, colIndex) => {
        const choicePath = `questionnaires.${questionIndex}.rows.${rowIndex}.choices.${colIndex}`;
        const existingChoiceValue = getValues(`${choicePath}.value`);

        if (existingChoiceValue === undefined) {
          setValue(`${choicePath}.choiceId`, colIndex);
          setValue(`${choicePath}.value`, false);
        }
      });
  }, [control, rowIndex, column, getValues, setValue]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0.5,
          borderWidth: 0.5,
          minWidth: 150,
          maxWidth: 150,
        }}
      >
        <TextField
          control={control}
          name={`questionnaires.${questionIndex}.rows.${rowIndex}.rowTitle`}
          sx={{
            flexGrow: 1,
            display: "flex",
            minWidth: 150,
            maxWidth: 150,
            marginTop: -2,
          }}
          placeholder="Enter Text"
        />
      </Box>
      {Array(column)
        .fill(null)
        .map((_, colIndex) => (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: 0.5,
              borderWidth: 0.5,
              minWidth: 150,
              maxWidth: 150,
            }}
          >
            <ControlledCheckbox
              control={control}
              name={`questionnaires.${questionIndex}.rows.${rowIndex}.choices.${colIndex}.value`}
              defaultValue={0}
            />
          </Box>
        ))}
    </Box>
  );
};
