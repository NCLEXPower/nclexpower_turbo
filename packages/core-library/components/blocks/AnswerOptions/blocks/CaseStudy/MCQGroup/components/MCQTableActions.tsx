import React from "react";
import {
  MCQColumnType,
  MCQRowType,
} from "../../../../../../../system/app/internal/types";
import {
  initMCQColumn,
  initMCQRow,
} from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../../../../../Button/Button";

interface MCQTableConfigProps {
  RowField: MCQRowType[];
  ColumnField: MCQColumnType[];
  questionIndex: number;
}

export const MCQTableActions: React.FC<MCQTableConfigProps> = ({
  RowField,
  ColumnField,
  questionIndex,
}) => {
  const { setValue, control } = useFormContext();

  const { append: ColumnAppend, remove: ColumnRemove } = useFieldArray({
    control,
    name: `questionnaires.${questionIndex}.columns`,
  });

  const { append: RowAppend, remove: RowRemove } = useFieldArray({
    control,
    name: `questionnaires.${questionIndex}.rows`,
  });

  const handleRowAppendFields = () => {
    const nextRowId = RowField.length;
    const currentChoicesCount = ColumnField.length;
    const newChoices = Array.from(
      { length: currentChoicesCount - 1 },
      (_, index) => ({
        value: false,
        choiceId: index,
      })
    );

    const newRow = {
      ...initMCQRow,
      rowId: nextRowId,
      choices: newChoices,
    };

    RowAppend(newRow);
  };

  const handleColumnRemoveFields = (columnIndex: number | undefined) => {
    ColumnRemove(columnIndex);

    if (RowField.length > 0) {
      RowField.map((row: MCQRowType, index: number) => {
        const updatedChoices = Array.isArray(row.choices)
          ? row.choices.slice(0, row.choices.length - 1)
          : [];

        setValue(`questionnaires.${questionIndex}.rows.${index}`, {
          ...row,
          choices: updatedChoices,
        });
      });
    }
  };

  const handleColumnAppendFields = () => {
    ColumnAppend(initMCQColumn);

    if (RowField.length > 0) {
      RowField.map((row: MCQRowType, index: number) => {
        const updatedChoices = Array.isArray(row.choices)
          ? [
              ...row.choices,
              {
                value: false,
                choiceId: row.choices.length,
              },
            ]
          : [
              {
                value: false,
                choiceId: 0,
              },
            ];

        setValue(`questionnaires.${questionIndex}.rows.${index}`, {
          ...row,
          choices: updatedChoices,
        });
      });
    }
  };

  const ButtonFunctions = [
    {
      action: "add",
      count: ColumnField.length,
      setCount: () => handleColumnAppendFields(),
      limit: 2,
      label: "Add Column",
      type: "column",
    },
    {
      action: "add",
      count: RowField.length,
      setCount: () => handleRowAppendFields(),
      limit: 1,
      label: "Add Row",
      type: "row",
    },
    {
      action: "remove",
      count: RowField.length,
      setCount: () => RowRemove(RowField.length - 1),
      limit: 1,
      label: "Delete Row",
      type: "row",
    },
    {
      action: "remove",
      count: ColumnField.length,
      setCount: () => handleColumnRemoveFields(ColumnField.length - 1),
      limit: 3,
      label: "Delete Column",
      type: "column",
    },
  ];

  return ButtonFunctions.map((button) => (
    <Button
      data-testid="table-action-id"
      key={button.label}
      onClick={button.setCount}
      disabled={button.action === "remove" && button.count <= button.limit}
    >
      {button.label}
    </Button>
  ));
};
