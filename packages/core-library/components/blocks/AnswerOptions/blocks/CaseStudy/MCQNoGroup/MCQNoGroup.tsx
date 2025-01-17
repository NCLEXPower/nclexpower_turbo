import React from "react";
import { Card } from "../../../../../Card/Card";
import { MCQNoGroupAnswer } from "./components/MCQNoGroupAnswer";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { useFieldArray, useFormContext } from "react-hook-form";

type MCQNoGroupType = {
  questionIndex: number;
};

export const MCQNoGroup: React.FC<MCQNoGroupType> = ({
  questionIndex
}) => {

  const { getValues, watch, control, setValue } = useFormContext<
    ContainedCaseStudyQuestionType
  >();
  const { append: appendRow, remove: removeRow } = useFieldArray<
    ContainedCaseStudyQuestionType
  >({
    control,
    name: `questionnaires.${questionIndex}.tableData.rows`,
  });
  const { append: appendColumn, remove: removeColumnHeaders } = useFieldArray<
    ContainedCaseStudyQuestionType
  >({
    control,
    name: `questionnaires.${questionIndex}.tableData.columns`,
  });

  const tableRowFields = getValues(`questionnaires.${questionIndex}.tableData.rows`) || [];
  const columnHeaderFields = getValues(`questionnaires.${questionIndex}.tableData.columns`) || [];
  const maxPoint = getValues(`questionnaires.${questionIndex}.maxPoints`);
  const watchAnswerOptions = watch(`questionnaires.${questionIndex}.tableData.columns`);
  const disableAppendRow = tableRowFields.length >= maxPoint;
  const disableRemoveRow = tableRowFields.length <= 2;
  const disableRemoveColumnHeaders = columnHeaderFields.length <= 3;

  const handleAppendColumnHeaders = () => {
    appendColumn({
      columnId: `col${columnHeaderFields.length + 1}`,
      label: "",
    });
    tableRowFields.forEach((_, rowIndex) => {
      setValue(
        `questionnaires.${questionIndex}.tableData.rows.${rowIndex}.choices`,
        Object.fromEntries(columnHeaderFields.slice(1).map(col => [col.columnId, false]))
      );
    });
  };

  const handleAppendRowTable = () => {
    appendRow({
      rowId: `row${tableRowFields.length + 1}`,
      rowTitle: "",
      choices: Object.fromEntries(columnHeaderFields.slice(1).map(col => [col.columnId, false]))
    });
  };

  const handleRemoveRow = (index: number) => {
    removeRow(index);
  };

  const handleRemoveColumnHeaders = (index: number) => {
    removeColumnHeaders(index);
  }

  return (
    <Card>
      <MCQNoGroupAnswer
        questionIndex={questionIndex}
        handleAppendRowTable={handleAppendRowTable}
        disableAppendRow={disableAppendRow}
        handleAppendColumnHeaders={handleAppendColumnHeaders}
        handleRemoveRow={handleRemoveRow}
        handleRemoveColumnHeaders={handleRemoveColumnHeaders}
        columnHeaderFields={columnHeaderFields}
        watchAnswerOptions={watchAnswerOptions}
        tableRowFields={tableRowFields}
        disableRemoveColumnHeaders={disableRemoveColumnHeaders}
        disableRemoveRow={disableRemoveRow}
        control={control}
        setValue={setValue}
      />
    </Card>
  );
};
