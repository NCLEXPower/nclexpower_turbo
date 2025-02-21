import React from "react";
import { Card } from "../../../../../Card/Card";
import { MCQNoGroupAnswer } from "./components/MCQNoGroupAnswer";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { initMCQColumn, initMCQRow } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";

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
    name: `questionnaires.${questionIndex}.rows`,
  });
  const { append: appendColumn, remove: removeColumnHeaders } = useFieldArray<
    ContainedCaseStudyQuestionType
  >({
    control,
    name: `questionnaires.${questionIndex}.columns`,
  });

  const tableRowFields = getValues(`questionnaires.${questionIndex}.rows`) || [];
  const columnHeaderFields = getValues(`questionnaires.${questionIndex}.columns`) || [];
  const maxPoint = getValues(`questionnaires.${questionIndex}.maxPoints`);
  const disableAppendRow = tableRowFields.length >= maxPoint;
  const disableRemoveRow = tableRowFields.length <= 2;
  const disableRemoveColumnHeaders = columnHeaderFields.length <= 3;

  const handleAppendColumnHeaders = () => {
    appendColumn({
      label: "",
    });

    const newChoicesLength = columnHeaderFields.length + 1;
    tableRowFields.forEach((_, rowIndex) => {
      setValue(
        `questionnaires.${questionIndex}.rows.${rowIndex}.choices`,
        Array.from({ length: newChoicesLength - 1 }, (_, index) => ({
          value: false,
          choiceId: index,
        }))
      );
    });
  };

  const handleAppendRowTable = () => {
    appendRow({
      rowId: tableRowFields.length,
      rowTitle: "",
      choices: columnHeaderFields.slice(1).map((_, colIndex) => ({
        value: false,
        choiceId: colIndex,
      })),
    });
  };

  const handleRemoveRow = (index: number) => {
    removeRow(index);
  };

  if (!columnHeaderFields || columnHeaderFields.length == 0 ||
    !tableRowFields || tableRowFields.length == 0
  ) {
    setValue(
      `questionnaires.${questionIndex}.columns`,
      Array(3).fill(initMCQColumn)
    );
    setValue(`questionnaires.${questionIndex}.rows`, Array(1).fill(initMCQRow));
  }

  const handleRemoveColumnHeaders = (index: number) => {
    removeColumnHeaders(index);

    const removeChoices = columnHeaderFields.length - 1;
    tableRowFields.forEach((_, rowIndex) => {
      setValue(
        `questionnaires.${questionIndex}.rows.${rowIndex}.choices`,
        Array.from({ length: removeChoices - 1 }, (_, index) => ({
          value: false,
          choiceId: index,
        }))
      );
    });
  }

  return (
    <Card data-testid="mcq-no-group">
      <MCQNoGroupAnswer
        questionIndex={questionIndex}
        handleAppendRowTable={handleAppendRowTable}
        disableAppendRow={disableAppendRow}
        handleAppendColumnHeaders={handleAppendColumnHeaders}
        handleRemoveRow={handleRemoveRow}
        handleRemoveColumnHeaders={handleRemoveColumnHeaders}
        columnHeaderFields={columnHeaderFields}
        tableRowFields={tableRowFields}
        disableRemoveColumnHeaders={disableRemoveColumnHeaders}
        disableRemoveRow={disableRemoveRow}
        control={control}
        setValue={setValue}
      />
    </Card>
  );
};
