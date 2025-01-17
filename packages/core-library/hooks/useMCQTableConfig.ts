import { useEffect } from "react";
import { MCQRowType } from "../system/app/internal/types";

type MCQTableConfigType = {
  row: number;
  column: number;
  setValue: (field: string, value: any) => void;
  getValues: (field?: string) => any;
  questionnaires: {
    rows: MCQRowType[];
  }[];
};

export const useMCQTableConfig = ({
  row,
  column,
  setValue,
  getValues,
  questionnaires,
}: MCQTableConfigType) => {
  useEffect(() => {
    const newRows = Array(row)
      .fill(null)
      .map((_, rowIndex) => {
        const existingRow = questionnaires[0]?.rows[rowIndex];
        return (
          existingRow || {
            choices: Array(column)
              .fill(null)
              .map((_, colIndex) => ({
                choiceId: colIndex,
                value: false,
              })),
          }
        );
      });

    setValue("questionnaires.0.rows", newRows);
  }, [row, column, setValue, questionnaires]);

  useEffect(() => {
    const existingColumns = getValues("questionnaires.0.columns") || [];
    const currentRows = getValues("questionnaires.0.rows") || [];

    const newColumns = existingColumns
      .slice(0, column - -1)
      .concat(
        Array(Math.max(0, column - existingColumns.length)).fill({ label: "" })
      );
    setValue("questionnaires.0.columns", newColumns);

    const updatedRows = currentRows.map((rowData: MCQRowType) => {
      const updatedChoices = rowData?.choices.slice(0, column).concat(
        Array(Math.max(0, column - rowData?.choices.length)).fill({
          choiceId: rowData?.choices.length || 0,
          value: false,
        })
      );
      return { ...rowData, choices: updatedChoices };
    });

    setValue("questionnaires.0.rows", updatedRows);
  }, [column, setValue, getValues]);
};
