import React from "react";
import { Container, Box, Button } from "@mui/material";
import { useRegularQuestionWizardSteps } from "./steps/useSteps";
import { Alert } from "../../../../../../components";
import { useModal } from "../../../../../../hooks";
import { useDialogContext } from "../../../../../../contexts";
import { DeleteConfirmationAtom } from "../../../../../../components/Dialog/DialogFormBlocks/DeleteModal/validation";
import { useAtom } from "jotai";

export const QuestionManagementPageBlock = () => {
  const saveConfirmationModal = useModal<unknown>();
  const { render } = useRegularQuestionWizardSteps(
    () => {},
    saveConfirmationModal
  );

  const { openDialog } = useDialogContext();
  const [deleteAtom, setDeleteAtom] = useAtom(DeleteConfirmationAtom);

  const sampleData = {
    id: "sample id",
    text: "test text to delete",
    inputText: "",
  };

  const handleDelete = () => {
    openDialog("delete-modal", "");
    setDeleteAtom(sampleData);
  };
  return (
    <Box data-testid="question-management">
      {/* For improvements, all containers should be placed on one codebase. */}
      <Button variant="contained" onClick={handleDelete}>
        delete
      </Button>
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
