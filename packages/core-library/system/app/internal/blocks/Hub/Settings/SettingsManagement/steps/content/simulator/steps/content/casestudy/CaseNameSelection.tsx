import React, { useEffect, useMemo } from "react";
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
import { initCaseStudyQuestionnaires } from "../../../../../../constants/constants";
import { CasenameSelectionLoader } from "../loader";
import { usePageLoaderContext } from "../../../../../../../../../../../../../contexts/PageLoaderContext";
import { useApi } from "../../../../../../../../../../../../../hooks";

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
  const { result: caseNames } = useApi((api) =>
    api.webbackoffice.getAllCaseNames()
  );

  const { result } = useApi((api) => api.webbackoffice.getFormId());
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, []);

  const caseNameOptions: SelectOption[] = useMemo(() => {
    return caseNames?.data?.length
      ? caseNames.data.map((name) => ({
          label: name.caseName,
          value: name.caseName,
        }))
      : [];
  }, [caseNames?.data]);

  if (contentLoader) {
    return <CasenameSelectionLoader />;
  }

  return (
    <Box>
      <Box
        data-testid="casename-block-test"
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
    const submissionValues = {
      ...values,
      ...initCaseStudyQuestionnaires,
      formId: result?.data ?? "",
    };
    setCaseName(submissionValues);
    nextStep(submissionValues);
    next();
  }
};
