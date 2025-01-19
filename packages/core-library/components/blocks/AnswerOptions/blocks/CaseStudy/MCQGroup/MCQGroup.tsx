import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { MCQTableCreation } from "./components/MCQTableCreation";
import {
  initMCQColumn,
  initMCQRow,
} from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { MCQTableActions } from "./components/MCQTableActions";

type BowtiePropsType = {
  questionIndex: number;
};

export const MCQGroup: React.FC<BowtiePropsType> = ({ questionIndex }) => {
  const { watch, setValue, getValues } = useFormContext();
  const ColumnField = getValues(`questionnaires.${questionIndex}.columns`);
  const RowField = getValues(`questionnaires.${questionIndex}.rows`);
  const questionnaires = watch(`questionnaires`);

  if (
    !RowField ||
    RowField?.length == 0 ||
    !ColumnField ||
    ColumnField?.length == 0
  ) {
    setValue(
      `questionnaires.${questionIndex}.columns`,
      Array(3).fill(initMCQColumn)
    );
    setValue(`questionnaires.${questionIndex}.rows`, Array(1).fill(initMCQRow));
  }

  console.log("questionnaires : ", questionnaires);

  return (
    <Box sx={{ padding: 5 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          padding: 5,
          flexWrap: "wrap",
        }}
      >
        <MCQTableActions
          RowField={RowField}
          ColumnField={ColumnField}
          questionIndex={questionIndex}
        />
      </Box>

      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
          maxWidth: "550px",
          overflowY: "hidden",
          height: "fit-content",
        }}
      >
        <MCQTableCreation
          ColumnField={ColumnField}
          RowField={RowField}
          questionIndex={questionIndex}
        />
      </Box>
    </Box>
  );
};
