import { useFormContext } from "react-hook-form";
import { TablePropType } from "../../../../../../../system/app/internal/types";
import { ControlledCheckbox } from "../../../../../../Checkbox/Checkbox";
import { Box } from "@mui/material";
import { TextField } from "../../../../../../forms/TextField";

export const RowComponent: React.FC<TablePropType> = ({
  ColumnField,
  questionIndex,
  rowIndex,
}) => {
  const { control } = useFormContext();
  const ColumnFieldContainer = ColumnField.length > 0 && ColumnField.length - 1;

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
      {Array(ColumnFieldContainer)
        .fill(false)
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
