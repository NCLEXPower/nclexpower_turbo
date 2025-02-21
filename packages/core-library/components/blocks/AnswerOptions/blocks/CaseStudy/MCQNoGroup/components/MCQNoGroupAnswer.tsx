import React from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { Control } from "react-hook-form";
import {
  ControlledTextField,
  TextField,
  EvaIcon,
  Button,
} from "../../../../../../";
import { ContainedCaseStudyQuestionType } from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { StyledBox } from "../../../Regular/content/StyledBox";

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
    }>
  }>;
  setValue: any;
  disableRemoveRow?: boolean;
  disableRemoveColumnHeaders?: boolean;
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
  disableRemoveColumnHeaders
}) => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginY: 2,
          gap: 1
        }}
      >
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} width="100%">
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
            <Typography variant="body2">
              Add Column
            </Typography>
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
              }
            }}
            onClick={() => handleRemoveColumnHeaders(columnHeaderFields.length - 1)}
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
              }
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
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {columnHeaderFields.length > 0 && columnHeaderFields.map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
            }}>
            <TextField
              name={`questionnaires.${questionIndex}.columns.${index}.label`}
              control={control}
              label={index === 0 ? `Table Header` : `Column Header: ${index + 1}`}
              sx={{
                borderRadius: "5px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                border: "1px solid #0F2A71",
              }}
              inputProps={{
                style: { padding: 15, borderRadius: "3px" },
              }}
            />
          </Box>
        ))}
      </Box>
      {tableRowFields.length && tableRowFields.map((_, idx) => (
        <StyledBox key={idx}>
          <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={4}>
            <Box gridColumn="span 4">
              <ControlledTextField
                name={`questionnaires.${questionIndex}.rows.${idx}.rowTitle`}
                label={`Table Row: ${idx + 1}`}
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #0F2A71",
                  width: "100%"
                }}
                inputProps={{
                  style: { padding: 15, borderRadius: "3px" },
                }}
              />
            </Box>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <RadioGroup
              name={`questionnaires.${questionIndex}.rows.${idx}.choices`}
              value={tableRowFields[idx].choices.find(choice => choice.value)?.choiceId?.toString() ?? ""}
              onChange={(e) => {
                const selectedChoiceId = parseInt(e.target.value, 10);
                setValue(
                  `questionnaires.${questionIndex}.rows.${idx}.choices`,
                  columnHeaderFields.slice(1).map((_, index) => ({
                    choiceId: index,
                    value: index === selectedChoiceId,
                  }))
                );
              }}
            >
              {columnHeaderFields.slice(1).map((col, colIndex) => (
                <FormControlLabel
                  key={colIndex}
                  value={colIndex.toString()}
                  control={
                    <Radio
                      sx={{
                        color: "red",
                        '&.Mui-checked': {
                          color: "green",
                        },
                      }}
                    />
                  }
                  label={col.label}
                />
              ))}
            </RadioGroup>
          </Box>
        </StyledBox>
      ))}
    </Box>
  );
};
