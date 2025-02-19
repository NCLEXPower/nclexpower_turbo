import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "../../../../../../../../../../../../../components";
import { useRouter } from "../../../../../../../../../../../../../core";
import { ContainedRegularQuestionType } from "../../../types";
import { Box, styled, Typography } from "@mui/material";

interface Props {
  nextStep(values: Partial<ContainedRegularQuestionType>): void;
  previousStep(): void;
  values: Partial<ContainedRegularQuestionType>;
  next: () => void;
  reset: () => void;
  resetStep: () => void;
}

export const SuccessPage: React.FC<Props> = (props) => {
  const { values, nextStep, next, reset, resetStep } = props;
  const type_identifier =
    values.main_type == "Regular" ? "regular" : "case-study";
  const NextLocation =
    values.main_type == "Regular"
      ? "/regular-question-list"
      : "/case-study-list";
  const router = useRouter();

  const handleCreateNew = () => {
    nextStep({});
    resetStep();
    reset();
  };

  const handleGoToList = (value?: string) => {
    router.push({ pathname: value || "/hub" });
  };

  return (
    <Box
      height="450px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="1rem"
      data-testid={`${type_identifier}-question`}
    >
      <CheckCircleIcon sx={{ fontSize: 100, color: "" }} />
      <Typography
        variant="inherit"
        paddingY="32px"
        fontWeight="semibold"
        fontSize="30px"
      >
        {values.main_type} Questions Successfully Added
      </Typography>
      <Box display="flex" gap="16px">
        <Button
          type="Secondary"
          data-testid="create-new"
          onClick={() => handleGoToList(NextLocation)}
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "300px",
            textTransform: "none",
          }}
        >
          <p>Go to {values.main_type} Question List</p>
        </Button>
        <Button
          data-testid="create-new-button"
          onClick={handleCreateNew}
          sx={{
            height: "45px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "300px",
            textTransform: "none",
          }}
        >
          <p>Create New</p>
        </Button>
      </Box>
    </Box>
  );
};

export const SuccessView = () => {
  return <Box></Box>;
};

export const ErrorView = () => {
  return;
};
