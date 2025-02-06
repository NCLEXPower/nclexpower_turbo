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
  IconButton,
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
  tableRowFields?: Array<{
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
        <Box display="flex" alignItems="center" gap={2} width="100%">
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
            disabled={disableAppendRow}
          >
            <Typography variant="body2">Add Row Fields</Typography>
            <EvaIcon
              name="plus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" width="100%">
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
          >
            <Typography variant="body2">
              Add Column Header
            </Typography>
            <EvaIcon
              name="plus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {columnHeaderFields.map((_, index) => (
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
            <Button
              onClick={() => handleRemoveColumnHeaders(index)}
              disabled={disableRemoveColumnHeaders}
              sx={{
                marginTop: 6,
                backgroundColor: disableRemoveColumnHeaders ? "" : "transparent",
                "&:hover": {
                  backgroundColor: disableRemoveColumnHeaders ? "" : "#f5f5f5",
                }
              }}
            >
              <EvaIcon
                name="minus-square-outline"
                fill="#c1121f"
                width={30}
                height={30}
                ariaHidden
              />
            </Button>
          </Box>
        ))}
      </Box>
      {tableRowFields?.map((_, idx) => (
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
            <Box gridColumn="span 1" sx={{ marginTop: 8 }}>
              <Button
                onClick={() => handleRemoveRow(idx)}
                disabled={disableRemoveRow}
                sx={{
                  backgroundColor: disableRemoveRow ? "" : "transparent",
                  "&:hover": {
                    backgroundColor: disableRemoveRow ? "" : "#f5f5f5",
                  }
                }}
              >
                <EvaIcon
                  name="minus-square-outline"
                  style={{
                    border: disableRemoveRow ? "#030303" : "#c1121f",
                  }}
                  width={30}
                  height={30}
                  ariaHidden
                />
              </Button>
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
