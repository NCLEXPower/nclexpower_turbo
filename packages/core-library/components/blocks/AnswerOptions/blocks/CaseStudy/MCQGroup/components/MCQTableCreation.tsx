import { useFormContext } from "react-hook-form";
import { TablePropType } from "../../../../../../../system/app/internal/types";
import { Box } from "@mui/material";
import { TextField } from "../../../../../../forms/TextField";
import { RowComponent } from "./RowComponent";

export const MCQTableCreation: React.FC<TablePropType> = ({
  column,
  row,
  questionIndex,
}) => {
  const AddedCol = column && column + 1;
  const { control } = useFormContext();

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        {Array(AddedCol)
          .fill(null)
          .map((_, index) => (
            <Box
              key={`column-${index}`}
              sx={{
                flexGrow: 1,
                border: 0.5,
                borderWidth: 0.5,
                minWidth: 150,
                maxWidth: 150,
              }}
            >
              <TextField
                name={`questionnaires.${questionIndex}.columns.${index}.label`}
                control={control}
                sx={{
                  width: "100%",
                  "& fieldset": { border: "none" },
                }}
                placeholder="Enter Text"
              />
            </Box>
          ))}
      </Box>
      {Array(row)
        .fill(null)
        .map((_, index) => {
          return (
            <RowComponent
              column={column}
              questionIndex={questionIndex}
              rowIndex={index}
            />
          );
        })}
    </Box>
  );
};
