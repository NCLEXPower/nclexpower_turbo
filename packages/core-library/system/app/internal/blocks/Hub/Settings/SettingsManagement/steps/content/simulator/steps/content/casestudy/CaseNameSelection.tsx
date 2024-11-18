import React from "react";
import { ContainedCaseStudyQuestionType } from "../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { containedCaseStudyQuestionSchema } from "../../../validation";
import { Box, Typography } from "@mui/material";
import {
  Button,
  Card,
  MultipleSelectField,
  SelectOption,
} from "../../../../../../../../../../../../../components";
import { useAtom } from "jotai";
import { CreateCaseStudyAtom } from "../../../useAtomic";
import { initCaseStudyQuestionnaires } from '../../../../../../constants/constants';

interface Props {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
}

export const CaseNameSelection: React.FC<Props> = ({
  nextStep,
  values,
  next,
}) => {
  const [, setCaseName] = useAtom(CreateCaseStudyAtom);
  const { control, handleSubmit } = useForm<ContainedCaseStudyQuestionType>({
    resolver: yupResolver(containedCaseStudyQuestionSchema),
    mode: "all",
    criteriaMode: "all",
  });

  //mock case name
  const caseNameOptions: SelectOption[] = [
    {
      label: "Diabetes",
      value: "Diabetes",
    },
    {
      label: "Appendicitis",
      value: "Appendicitis",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Card sx={{ p: 5, textAlign: "center", maxWidth: 600, width: "100%" }}>
          <Typography variant="button" sx={{ mb: 2 }}>
            Case Name Selections
          </Typography>

          <Typography variant="caption" sx={{ mb: 4, textAlign: "left" }}>
            Please identify the primary case name, followed by any optional
            secondary conditions. For example, if a patient has Condition A and
            another illness, select "Condition A" as the primary case and
            optionally include the other illness as the secondary case.
          </Typography>

          <MultipleSelectField
            control={control}
            name="caseName"
            label="Case Name"
            options={caseNameOptions}
            multiple
            sx={{ mt: 3, width: "100%" }}
          />
        </Card>
      </Box>
      <Button
        onClick={handleSubmit(handleContinue)}
        sx={{ float: "right", mt: 3, mb: 3 }}
      >
        Continue
      </Button>
    </Box>
  );

  async function handleContinue(values: ContainedCaseStudyQuestionType) {
    const submissionValues = ({ ...values, ...initCaseStudyQuestionnaires })
    setCaseName(submissionValues);
    nextStep(submissionValues);
    next();
  }
};
