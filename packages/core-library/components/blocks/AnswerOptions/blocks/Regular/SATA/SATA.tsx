import React, { useEffect, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  ContainedCaseStudyQuestionType,
  ContainedRegularQuestionType,
} from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { StyledBox } from "../content/StyledBox";
import {
  ControlledTextField,
  Card,
  Button,
  ControlledCheckbox,
} from "../../../../../";
import CloseIcon from "@mui/icons-material/Close";

type SATAPropsType = {
  questionIndex: number;
  deletionLimit?: number;
};

export const SATA: React.FC<SATAPropsType> = ({ questionIndex }) => {
  const { append: appendAnswer, remove: removeAnswer } = useFieldArray<
    ContainedRegularQuestionType | ContainedCaseStudyQuestionType
  >({
    name: `questionnaires.${questionIndex}.answers`,
  });
  const { getValues, setValue, watch } = useFormContext<
    ContainedRegularQuestionType | ContainedCaseStudyQuestionType
  >();
  const answerFields = getValues(`questionnaires.${questionIndex}.answers`);
  const questionType = getValues(
    `questionnaires.${questionIndex}.questionType`
  );
  const maxPoint = getValues(`questionnaires.${questionIndex}.maxPoints`);
  const isMrsn = useMemo(() => questionType === "MRSN", [questionType]);
  const DELETION_LIMIT = isMrsn ? 0 : 5;
  const MAX_LENGTH = 20;

  const handleAppendFields = () => {
    appendAnswer({ answer: "", answerKey: false });
  };

  const handleRemoveFields = (index: number) => {
    removeAnswer(index);
  };

  useEffect(() => {
    if (isMrsn) {
      setValue(`questionnaires.${questionIndex}.maxAnswer`, maxPoint);
    }
  }, [maxPoint]);

  if (!answerFields) return null;

  return (
    <Card sx={{ width: 1 }} data-testid="sata-answer">
      <StyledBox>
        {answerFields.map((_, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            width={1}
            flex={1}
            alignItems="center"
          >
            <Box
              display="flex"
              sx={{
                width: "20%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ControlledCheckbox
                name={`questionnaires.${questionIndex}.answers.${index}.answerKey`}
                sx={{ margin: 0 }}
              />
              <Typography variant="body2" pr={1}>
                {index + 1}.
              </Typography>
            </Box>

            <Box flex={1}>
              <ControlledTextField
                name={`questionnaires.${questionIndex}.answers.${index}.answer`}
                multiline
                sx={{ border: "none", outline: 0, width: "100%" }}
                placeholder="Enter answer"
              />
            </Box>
            {index >= DELETION_LIMIT && (
              <IconButton
                data-testid={`answer-option-remove-${index}`}
                onClick={() => handleRemoveFields(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </StyledBox>
      <Button
        data-testid="answer-option-append"
        sx={{
          height: "45px",
          borderRadius: "10px",
          marginTop: "10px",
          width: "100%",
          textTransform: "none",
        }}
        disabled={answerFields.length >= MAX_LENGTH}
        onClick={handleAppendFields}
        className="w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold hover:bg-[#2a98a0] transition-colors duration-150 hover:text-white disabled:saturate-0"
      >
        <span>
          <AddIcon />
        </span>
        <Typography variant="body2">Add Answer Option</Typography>
      </Button>
    </Card>
  );
};
