import { TablePropType } from "../../../../../../../system/app/internal/types";
import { Box } from "@mui/material";
import { RowComponent } from "./MCQRowComponent";
import { ColumnComponent } from "./MCQColumnComponent";

export const MCQTableCreation: React.FC<TablePropType> = ({
  ColumnField,
  RowField,
  questionIndex,
}) => {
  if (
    !ColumnField ||
    ColumnField.length <= 0 ||
    !RowField ||
    RowField.length <= 0
  ) {
    return "No data available";
  }

  return (
    <Box data-testid="mcq-table-id">
      <Box sx={{ display: "flex" }}>
        {ColumnField?.length > 0 &&
          ColumnField.map((_, index) => (
            <ColumnComponent
              columnIndex={index}
              questionIndex={questionIndex}
            />
          ))}
      </Box>

      {RowField?.length > 0 &&
        RowField.map((_, index) => (
          <RowComponent
            ColumnField={ColumnField}
            RowField={RowField}
            questionIndex={questionIndex}
            rowIndex={index}
          />
        ))}
    </Box>
  );
};
