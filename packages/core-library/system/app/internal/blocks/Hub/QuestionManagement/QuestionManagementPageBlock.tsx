import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { useRegularQuestionWizardSteps } from "./steps/useSteps";
import { RegularQuestionsSteps, RegularQuestionStepProps } from "./steps/types";
import { RegularQuestionFormType } from "./types";
import { Alert } from "../../../../../../components";
import { useModal } from "../../../../../../hooks";

export const QuestionManagementPageBlock = () => {
  const saveConfirmationModal = useModal<unknown>();
  const { render } = useRegularQuestionWizardSteps(
    () => {},
    saveConfirmationModal
  );

  return (
    <Box>
      {/* For improvements, all containers should be placed on one codebase. */}
      <Container>
        <Alert
          severity="info"
          title="Question Management"
          description="You can manage regular and case study questions here."
        />
        {render}
      </Container>
    </Box>
  );
};
