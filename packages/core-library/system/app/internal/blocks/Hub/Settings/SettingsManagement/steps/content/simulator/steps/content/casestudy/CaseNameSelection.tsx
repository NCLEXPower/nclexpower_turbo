import React, { useEffect, useMemo } from "react";
import { ContainedCaseStudyQuestionType } from "../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { containedCaseStudyQuestionSchema } from "../../../validation";
import { Box, Typography } from "@mui/material";
import {
  Button,
  Card,
  GenericSelectField,
  NumberField,
  SelectSearch,
  SingleOption,
} from "../../../../../../../../../../../../../components";
import { useAtom } from "jotai";
import { CreateCaseStudyAtom } from "../../../useAtomic";
import { caseStudyType } from "../../../../../../constants/constants";
import { CasenameSelectionLoader } from "../loader";
import { usePageLoaderContext } from "../../../../../../../../../../../../../contexts/PageLoaderContext";
import { useApi } from "../../../../../../../../../../../../../hooks";
import { createInitialQuestionnairesValues } from "./CaseStudySummary/utils/CreateInitialValues";

interface Props {
  nextStep(values: Partial<ContainedCaseStudyQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedCaseStudyQuestionType>;
  next: () => void;
}

export const CaseNameSelection: React.FC<Props> = ({ nextStep, next }) => {
  const [, setCaseName] = useAtom(CreateCaseStudyAtom);
  const { control, handleSubmit, watch } =
    useForm<ContainedCaseStudyQuestionType>({
      resolver: yupResolver(containedCaseStudyQuestionSchema),
      mode: "all",
      criteriaMode: "all",
    });
  const { result: caseNames } = useApi((api) =>
    api.webbackoffice.getAllCaseNames()
  );

  const { result } = useApi((api) => api.webbackoffice.getFormId());
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const caseType = watch("caseType");

  useEffect(() => {
    setContentLoader(true);
    setTimeout(() => {
      setContentLoader(false);
    }, 3000);
  }, []);

  const caseNameOptions: SingleOption[] = useMemo(() => {
    return caseNames?.data?.length
      ? caseNames.data.map((name) => ({
          label: name.caseName,
          value: name.caseName,
          code: name.caseName,
          name: "",
        }))
      : [];
  }, [caseNames?.data]);

  const initValues = useMemo(() => {
    const formId = result?.data ?? "";
    return {
      ...createInitialQuestionnairesValues(caseType === "STANDALONE" ? 1 : 6),
      formId,
    };
  }, [result, caseType]);

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
          <Typography variant="button" sx={{ mb: 2, fontWeight: 600 }}>
            Case Study Creation
          </Typography>
          <Box textAlign="start">
            <Typography>Case Type</Typography>
            <GenericSelectField
              options={caseStudyType}
              control={control}
              name="caseType"
            />
          </Box>
          <Box>
            <Box mt={3} display="flex" gap={2} alignItems="end">
              <Box flex={1}>
                <NumberField
                  name="caseNum"
                  label="Case No."
                  control={control}
                  showErrorBelowLabel={true}
                />
              </Box>
              <Box textAlign="start" flex={3}>
                <Typography>Casename</Typography>
                <SelectSearch
                  sx={{ pt: 2 }}
                  control={control}
                  name="caseName"
                  options={caseNameOptions}
                />
              </Box>
            </Box>
          </Box>
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
      ...initValues,
    };
    setCaseName(submissionValues);
    nextStep(submissionValues);
    next();
  }
};
