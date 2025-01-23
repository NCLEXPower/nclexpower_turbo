import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextField } from "../../../../../../forms/TextField";

interface ColumnComponent {
  questionIndex: number;
  columnIndex: number;
}

export const ColumnComponent = ({
  columnIndex,
  questionIndex,
}: ColumnComponent) => {
  const { control } = useFormContext();
  return (
    <Box
      key={columnIndex}
      sx={{
        flexGrow: 1,
        border: 0.5,
        borderWidth: 0.5,
        minWidth: 150,
        maxWidth: 150,
      }}
    >
      <TextField
        name={`questionnaires.${questionIndex}.columns.${columnIndex}.label`}
        placeholder="Enter Column Name"
        control={control}
        sx={{
          width: "100%",
          "& fieldset": { border: "none" },
        }}
      />
    </Box>
  );
};
