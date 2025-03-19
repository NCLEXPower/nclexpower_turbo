/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import ContentApproverForm from "./ContentApproverForm";
import { ContentReviewerForm } from "./ContentReviewerForm";
import { Button, Card } from "../../../../../../../../../../components";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useMemo, useState } from "react";
import { useExecuteToast } from "../../../../../../../../../../contexts";
import { crbSchema, crbType } from "./validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePageLoaderContext } from "../../../../../../../../../../contexts/PageLoaderContext";
import { useTheme } from "@emotion/react";
import { Pagination } from "@mui/material";
import { ContentDateAtom } from "../../../../../../../../../../components/Dialog/DialogFormBlocks/contentApproval/validation";
import { useAtom } from "jotai";

type Props = {
  nextStep(values: {}): void;
  previousStep(): void;
};

export default function ContentReviewerBlock({
  nextStep,
  previousStep,
}: Props) {
  const [approvalAtom, setApprovalAtom] = useAtom(ContentDateAtom);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(1);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { contentLoader, setContentLoader } = usePageLoaderContext();

  const { showToast } = useExecuteToast();

  const handlePreviousStep = () => {
    previousStep();
  };

  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
    defaultValues: crbSchema.getDefault(),
  });

  const selectedPageToIndex = useMemo(
    () => Math.max(0, selectedPageIndex - 1),
    [selectedPageIndex]
  );

  const handlePaginate = (event: React.ChangeEvent<unknown>, page: number) => {
    setSelectedPageIndex(page);
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState,
  } = form;

  async function onSubmit(values: crbType) {
    if (values.option === 0) {
      try {
        setShowModal(true);
        setContentLoader(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsApproved(true);
        showToast(
          "Thank you for your review! Your feedback has been successfully submitted..",
          "success"
        );
      } catch (err) {
        console.error("Something went wrong", err);
        showToast(
          "An error occurred while submitting the review. Please try again.",
          "error"
        );
        setIsError(true);
      } finally {
        setContentLoader(false);
        reset();
      }
    }
  }

  return (
    <Card sx={{ padding: 6, height: "auto" }}>
      <Button
        onClick={handlePreviousStep}
        sx={{
          marginBottom: 4,
          px: 4,
          py: 2,
          borderRadius: "10px",
          color: "#F3F3F3",
        }}
      >
        <FirstPageIcon /> Go Back
      </Button>
      {approvalAtom?.data && approvalAtom.data[selectedPageToIndex] && (
        <ContentReviewerForm
          control={control}
          handleSubmit={handleSubmit}
          setValue={setValue}
          watch={watch}
          clearErrors={clearErrors}
          contentLoader={contentLoader}
          isApproved={isApproved}
          onSubmit={onSubmit}
          showModal={showModal}
          isError={isError}
          data={approvalAtom.data[selectedPageToIndex]}
        />
      )}
      <ContentApproverForm />
      <div className="mt-10 w-full flex justify-center">
        <Pagination
          count={approvalAtom?.data?.length || 0}
          onChange={handlePaginate}
          page={selectedPageToIndex + 1}
          variant="outlined"
          shape="circular"
          showFirstButton
          showLastButton
        />
      </div>
    </Card>
  );
}
