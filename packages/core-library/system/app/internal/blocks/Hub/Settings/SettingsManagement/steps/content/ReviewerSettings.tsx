import React from "react";
import {
  Button,
  Card,
  InformationTitle,
} from "../../../../../../../../../components";
import { Box, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SetDefaultReviewerType } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { setDefaultReviewerSchema } from "../../validation";
import {
  MultipleSelectField,
} from "../../../../../../../../../components";
import { useApi, useApiCallback } from "../../../../../../../../../hooks";
import { DefaultReviewerParams } from "../../../../../../../../../api/types";
import { useBusinessQueryContext } from '../../../../../../../../../contexts';

interface Props {
  nextStep(values: Partial<{}>): void;
  previousStep(): void;
}

const ContentManagementReviewers = ({ nextStep }: Props) => {
  const { businessQuerySelectedApprovers } = useBusinessQueryContext()
  const { data, refetch } = businessQuerySelectedApprovers(["SelectedApproversApi"])

  const form = useForm<SetDefaultReviewerType>({
    resolver: yupResolver(setDefaultReviewerSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      ...setDefaultReviewerSchema.getDefault()
    },
    values: { defaultReviewers: data && data.map((item) => item.accountId) }
  });

  const defaultReviewer = useApi((api) =>
    api.webbackoffice.getDefaultReviewer()
  );

  const createDefaultReviewerCb = useApiCallback(
    async (api, args: DefaultReviewerParams) =>
      await api.webbackoffice.createDefaultReviewer(args)
  );

  const { control, getValues, watch } = form;
  const values = getValues();
  const watchDefaultReviewers = watch("defaultReviewers");

  if (defaultReviewer.loading) return <p>Loading...</p>;

  const reviewers = defaultReviewer.result?.data.map((item) => ({
    label:
      item.tokenizeInformation.firstname +
      " " +
      item.tokenizeInformation.lastname,
    value: item.accountId,
  }));

  async function onSubmit() {
    const payload = {
      defaultApproversDtos: values.defaultReviewers?.map((id) => ({
        accountId: id,
      })),
    } as DefaultReviewerParams;
    await createDefaultReviewerCb.execute({ ...payload });
    refetch()
  }

  return (
    <Stack>
      <Box>
        <FormProvider {...form}>
          <MultipleSelectField
            control={control}
            name="defaultReviewers"
            label="Set default reviewers"
            options={reviewers ?? []}
            multiple
            sx={{ mt: 3, width: "100%" }}
          />
          <Button
            sx={{ float: "right", mt: 3, mb: 3 }}
            variant="contained"
            size="small"
            disabled={
              watchDefaultReviewers?.length === 0 ||
              typeof watchDefaultReviewers === "undefined"
            }
            onClick={onSubmit}
          >
            Save
          </Button>
        </FormProvider>
      </Box>
    </Stack>
  );
};

export const ReviewerSettings: React.FC<Props> = ({
  nextStep,
  previousStep,
}) => {
  return (
    <Box>
      <Card sx={{ mt: 5, p: 5 }}>
        <Button
          onClick={previousStep}
          variant="text"
          size="small"
          sx={{ mb: 5 }}
        >
          Back
        </Button>
        <Card sx={{ p: 5 }}>
          <InformationTitle
            text="Content Management Default Reviewers"
            lineWidth={6}
            lineHeight={35}
            lineColor="#6A5ACD"
            borderRadius={2}
            containerProps={{ mb: 5 }}
            textProps={{ color: "text.primary", fontWeight: "bold" }}
          />
          <ContentManagementReviewers
            nextStep={nextStep}
            previousStep={previousStep}
          />
        </Card>
      </Card>
    </Box>
  );
};
