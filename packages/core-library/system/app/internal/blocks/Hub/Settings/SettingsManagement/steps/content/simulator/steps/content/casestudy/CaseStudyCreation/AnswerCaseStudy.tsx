/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Box, Typography } from "@mui/material";
import {
  AnswerOptions,
  Card,
  ControlledRichTextEditor,
  ControlledTextField,
} from "../../../../../../../../../../../../../../components";
import { GenericSelectField } from "../../../../../../../../../../../../../../components";
import {
  initAnswerValues,
  maxPoints,
  questionTypes as questionTypeOptions,
  tabsSequence,
} from "../../../../../../../constants/constants";
import { useFormContext, useWatch } from "react-hook-form";
import {
  CaseStudyType,
  ContainedCaseStudyQuestionType,
} from "../../../../types";
import { BowtieAnswerArea } from "../../../../../../../../../../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/Bowtie/components/BowtieAnswerArea";
import { CaseStudyQuestionSelectionOptions } from "../../../../../../../types";
import { memo, useEffect, useRef, useState } from "react";
import { Instruction } from "./components/Instruction";
import { CustomFields } from "./components/CustomFields";
import { useTableInsertion } from "../../hooks/useTableInsertion";
import { boolean } from "yup";

interface Props {
  index: number;
}

export const AnswerCaseStudy = memo(({ index }: Props) => {
  const { getValues, setValue, resetField, watch } =
    useFormContext<ContainedCaseStudyQuestionType>();
  const { questionnaires } = useWatch<ContainedCaseStudyQuestionType>();

  if (!questionnaires) return;

  const questionType = watch(`questionnaires.${index}.questionType`);
  const { handleTableInsertion } = useTableInsertion({ questionType, index });
  const currentSequence = watch(`questionnaires.${index}.seqNum`);
  const caseType: CaseStudyType = watch("caseType");
  const isStandAlone = watch("caseType") === "STANDALONE";

  useEffect(() => {
    setValue(`questionnaires.${index}`, getValues(`questionnaires.${index}`));
    setValue(`questionnaires.${index}.itemNum`, index + 1);
    setValue(`questionnaires.${index}.questionType`, questionType);
  }, [index, getValues, questionType]);

  const handleUpdateSeqNumber = (value: string) => {
    const parsedvalue = parseInt(value);
    setValue(`questionnaires.${index}.seqNum`, parsedvalue);

    if (questionnaires) {
      const [question] = questionnaires.filter((q) => q.seqNum === parsedvalue);
      if (question?.transitionHeader) {
        setValue(
          `questionnaires.${index}.transitionHeader`,
          question.transitionHeader
        );
        return;
      }
    }
    setValue(`questionnaires.${index}.transitionHeader`, "");
  };

  const handleReset = (value: CaseStudyQuestionSelectionOptions) => {
    resetField(`questionnaires.${index}`);
    setValue(`questionnaires.${index}.questionType`, value);
  };

  useEffect(() => {
    if (
      questionType === "SATA" ||
      (questionType === "MRSN" && !questionnaires[index].answers?.length)
    ) {
      setValue(`questionnaires.${index}.answers`, [
        ...Array(5).fill(initAnswerValues),
      ]);
    }
  }, [questionType]);

  return (
    <Box
      sx={{
        position: "relative",
        maxHeight: "800px",
        overflowY: "auto",
        p: 3,
      }}
    >
      <Instruction questionType={questionType} />
      <Box
        data-testid="answer-case-study"
        sx={{ display: "flex", width: "100%", mt: 3 }}
      >
        <Box sx={{ width: 1 }}>
          <Box display="flex" alignItems="start" justifyContent="space-between">
            <GenericSelectField
              name={`questionnaires.${index}.questionType`}
              label="Question Type:"
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              onChange={(value) => handleReset(value)}
              options={questionTypeOptions[caseType] ?? []}
              width="60%"
            />
            <GenericSelectField
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              name={`questionnaires.${index}.seqNum`}
              label="Sequence No. :"
              onChange={handleUpdateSeqNumber}
              options={tabsSequence ?? []}
              disabled={isStandAlone}
              width="35%"
            />
          </Box>
          <Box mt={3}>
            <GenericSelectField
              name={`questionnaires.${index}.maxPoints`}
              label="Max Point:"
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              sx={{ borderRadius: "10px" }}
              options={maxPoints ?? []}
              width="60%"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }} mt={3}>
        {currentSequence > 1 && (
          <Box mt={3}>
            <ControlledTextField
              label="Transition Header : "
              labelProps={{ sx: { fontSize: "16px", fontWeight: 600 } }}
              fullWidth
              name={`questionnaires.${index}.transitionHeader`}
            />
          </Box>
        )}
      </Box>
      <Box width={1} sx={{ textAlign: "start", mt: 3 }}>
        <Box width={1}>
          <Typography color="#525252" fontSize="16px" fontWeight={600}>
            Item Stem :
          </Typography>
          <Box
            width={1}
            borderRadius={"5px"}
            boxShadow={2}
            p={4}
            overflow={"hidden"}
          >
            <ControlledRichTextEditor
              editorFor="casestudy"
              questionType={questionType}
              placeholder="Add question..."
              name={`questionnaires.${index}.itemStem`}
              onInsertTable={() => handleTableInsertion(index)}
            />
          </Box>
        </Box>

        {questionType && (
          <>
            <CustomFields questionIndex={index} questionType={questionType} />
            <Box sx={{ textAlign: "start", mt: 3 }}>
              <Typography color="#525252" fontSize="16px" fontWeight={600}>
                Answer Options :
              </Typography>
              <Box
                boxShadow={2}
                sx={{
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <AnswerOptions
                  questionIndex={index}
                  questionType="caseStudy"
                  questionnaireType={questionType}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
});
