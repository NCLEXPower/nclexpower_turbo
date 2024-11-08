/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import ContentApproverForm from "./ContentApproverForm";
import { ContentReviewerForm } from "./ContentReviewerForm";
import { Button, Card } from "../../../../../../../../../../components";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useState } from "react";
import { useExecuteToast } from "../../../../../../../../../../contexts";
import { crbSchema, crbType } from "./validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePageLoaderContext } from "../../../../../../../../../../contexts/PageLoaderContext";
import { useTheme } from "@emotion/react";

type Props = {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
};

export default function ContentReviewerBlock({
  nextStep,
  previousStep,
}: Props) {
  const theme = useTheme();
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { contentLoader, setContentLoader } = usePageLoaderContext();

  const toast = useExecuteToast();

  const handlePreviousStep = () => {
    previousStep();
  };

  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
    defaultValues: crbSchema.getDefault(),
  });

  const { control, handleSubmit, setValue, watch, clearErrors, reset } = form;

  async function onSubmit(values: crbType) {
    if (values.option === 0) {
      try {
        setShowModal(true);
        setContentLoader(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsApproved(true);
        toast.executeToast(
          "Thank you for your review! Your feedback has been successfully submitted..",
          "top-right",
          false,
          {
            toastId: 0,
            type: "success",
          }
        );
      } catch (err) {
        toast.executeToast(
          "An error occurred while submitting the review. Please try again.",
          "top-right",
          false,
          {
            toastId: 0,
            type: "error",
          }
        );
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
          backgroundColor: "appColors.purple",
          borderRadius: "10px",
          color: "#F3F3F3",
          "&:hover": {
            backgroundColor: "#212529",
          },
        }}
      >
        <FirstPageIcon /> Go Back
      </Button>

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
      />
      <ContentApproverForm />
    </Card>
  );
}
