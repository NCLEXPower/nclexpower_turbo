import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormGroup,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Control } from "react-hook-form";
import {
  TextField,
  EvaIcon,
  Button,
  ControlledRadio,
} from "../../../../../../";
import { ContainedCaseStudyQuestionType } from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { ColumnComponent } from "../../MCQGroup/components/MCQColumnComponent";

type MCQNoGroupType = {
  questionIndex: number;
  handleAppendRowTable: () => void;
  disableAppendRow: boolean;
  handleAppendColumnHeaders: () => void;
  handleRemoveRow: (index: number) => void;
  handleRemoveColumnHeaders: (index: number) => void;
  columnHeaderFields: Array<{ label: string }>;
  control: Control<ContainedCaseStudyQuestionType>;
  tableRowFields: Array<{
    rowId?: number | undefined;
    rowTitle: string;
    choices: Array<{
      choiceId?: number;
      value: boolean;
    }>;
  }>;
  setValue: any;
  disableRemoveRow?: boolean;
  disableRemoveColumnHeaders?: boolean;
};

type SelectedValue = {
  rowIndex: number;
  colIndex: number;
};

export const MCQNoGroupAnswer: React.FC<MCQNoGroupType> = ({
  questionIndex,
  handleAppendRowTable,
  disableAppendRow,
  handleAppendColumnHeaders,
  handleRemoveRow,
  handleRemoveColumnHeaders,
  columnHeaderFields,
  tableRowFields,
  control,
  setValue,
  disableRemoveRow,
  disableRemoveColumnHeaders,
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const { colIndex, rowIndex } = JSON.parse(e.target.value) as SelectedValue;
    columnHeaderFields.slice(1).forEach((_, index) => {
      setValue(
        `questionnaires.${questionIndex}.rows.${rowIndex}.choices.${index}.value`,
        index === colIndex ? (checked ? true : false) : false
      );
    });
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginY: 2,
          gap: 1,
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
          width="100%"
        >
          <Button
            sx={{
              height: "45px",
              borderRadius: "10px",
              marginTop: "10px",
              width: "100%",
              textTransform: "none",
              gap: 1.5,
            }}
            onClick={handleAppendColumnHeaders}
            data-testid="append-column-headers"
          >
            <Typography variant="body2">Add Column</Typography>
            <EvaIcon
              name="plus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
          <Button
            sx={{
              height: "45px",
              borderRadius: "10px",
              marginTop: "10px",
              width: "100%",
              textTransform: "none",
              gap: 1.5,
            }}
            onClick={handleAppendRowTable}
            data-testid="append-row-table"
            disabled={disableAppendRow}
          >
            <Typography variant="body2">Add Row</Typography>
            <EvaIcon
              name="plus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
          <Button
            sx={{
              height: "45px",
              borderRadius: "10px",
              marginTop: "10px",
              width: "100%",
              textTransform: "none",
              gap: 1.5,
              backgroundColor: "#800f2f",
              "&:hover": {
                backgroundColor: "#800f2f95",
              },
            }}
            onClick={() =>
              handleRemoveColumnHeaders(columnHeaderFields.length - 1)
            }
            disabled={disableRemoveColumnHeaders}
            data-testid={`remove-column-header-${columnHeaderFields.length}`}
          >
            Remove Column
            <EvaIcon
              name="minus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
          <Button
            sx={{
              height: "45px",
              borderRadius: "10px",
              marginTop: "10px",
              width: "100%",
              textTransform: "none",
              gap: 1.5,
              backgroundColor: "#800f2f",
              "&:hover": {
                backgroundColor: "#800f2f95",
              },
            }}
            onClick={() => handleRemoveRow(tableRowFields.length - 1)}
            data-testid={`remove-row-${tableRowFields.length}`}
            disabled={disableRemoveRow}
          >
            Remove Row
            <EvaIcon
              name="minus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
        </Box>
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
        <Box sx={{ display: "flex" }}>
          {columnHeaderFields?.length > 0 &&
            columnHeaderFields.map((_, index) => (
              <ColumnComponent
                key={`column-${index}`}
                columnIndex={index}
                questionIndex={questionIndex}
              />
            ))}
        </Box>

        <RadioGroup onChange={handleRadioChange}>
          {tableRowFields?.length > 0 &&
            tableRowFields.map((_, rowIndex) => (
              <Box key={`row-${rowIndex}`} sx={{ display: "flex" }}>
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
                {columnHeaderFields.slice(1).map((_, colIndex) => (
                  <Box
                    key={colIndex}
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
                    <FormControl>
                      <FormGroup>
                        <ControlledRadio
                          name={`questionnaires.${questionIndex}.rows.${rowIndex}.choices.${colIndex}.value`}
                          value={JSON.stringify({ colIndex, rowIndex })}
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                ))}
              </Box>
            ))}
        </RadioGroup>
      </Box>
    </Box>
  );
};
