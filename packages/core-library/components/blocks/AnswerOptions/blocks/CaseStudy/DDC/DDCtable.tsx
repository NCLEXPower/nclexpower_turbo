import {
  Box,
  Paper,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ControlledTextField } from "../../../../../Textfield/TextField";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ControlledRadio } from "../../../../../Radio/Radio";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import CloseIcon from "@mui/icons-material/Close";

export type DDCTablePropsype = {
  optionName: string;
  answerOptionIndex: number;
  questionIndex: number;
};

export const DDCTable: React.FC<DDCTablePropsype> = ({
  optionName,
  answerOptionIndex,
  questionIndex,
}) => {
  const [checked, setChecked] = useState<number>();
  const { getValues, setValue } = useFormContext();
  const { append, remove, fields } =
    useFieldArray<ContainedCaseStudyQuestionType>({
      name: `questionnaires.${questionIndex}.answers.${answerOptionIndex}.options`,
    });

  const handleRadioChange = (val: string) => {
    const selectedAnswer = parseInt(val);
    setChecked(selectedAnswer);
  };

  const handleAppendItem = () => {
    append({ answer: "", answerKey: false });
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (checked === undefined) return;
    const { questionnaires } = getValues();
    const updatedAnswers: { answer: string; answerKey: boolean }[] =
      questionnaires?.[questionIndex]?.answers?.[answerOptionIndex].options;

    if (updatedAnswers) {
      updatedAnswers.map((_, index: number) => {
        const isChecked = index === checked;
        setValue(
          `questionnaires.${questionIndex}.answers.${answerOptionIndex}.options.${index}.answerKey`,
          isChecked
        );
      });
    }
  }, [checked, questionIndex, setValue, getValues, setChecked]);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #ddd",
          bgcolor: "#0C225C",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Typography
            sx={{ fontSize: "12px" }}
            p={2}
            fontWeight={600}
            textAlign="center"
            color="white"
            textTransform="capitalize"
          >
            {optionName}
          </Typography>
        </Box>
        <RadioGroup
          onChange={(e) => {
            handleRadioChange(e.target.value);
          }}
        >
          <Table
            sx={{
              overflow: "hidden",
              borderRadius: "5px",
              border: "1px solid #ddd",
              bgcolor: "white",
            }}
            aria-label="simple table"
          >
            <TableBody>
              {fields &&
                fields.map((answer, index) => (
                  <TableRow
                    key={answer.id}
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #d3d3d3",
                      alignItems: "center",
                      px: 3,
                    }}
                  >
                    <TableCell scope="row" sx={{ padding: 0 }}>
                      <Box>
                        <ControlledRadio
                          value={index}
                          name={`questionnaires.${questionIndex}.answers.${answerOptionIndex}.options.${index}.answerKey`}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: 0,
                        display: "flex",
                      }}
                    >
                      <ControlledTextField
                        fullWidth
                        containerProps={{ width: "100%" }}
                        sx={{
                          height: "30px",
                          outline: 0,
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&::before": {
                            backgroundColor: "black",
                          },
                        }}
                        name={`questionnaires.${questionIndex}.answers.${answerOptionIndex}.options.${index}.answer`}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton onClick={() => handleRemoveItem(index)}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow sx={{ padding: 0 }}>
                <TableCell
                  colSpan={2}
                  sx={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <IconButton
                    disabled={fields.length >= 8}
                    onClick={handleAppendItem}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RadioGroup>
      </TableContainer>
    </Box>
  );
};
