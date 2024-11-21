import React from "react";
import { Container, Box } from "@mui/material";
import { useRegularQuestionWizardSteps } from "./steps/useSteps";
import { Alert } from "../../../../../../components";
import { useModal } from "../../../../../../hooks";
import { useDialogContext } from "../../../../../../contexts";
import { useAtom } from "jotai";
import { DeleteConfirmationAtom } from "../../../../../../components/Dialog/DialogFormBlocks/DeleteModal/validation";

export const QuestionManagementPageBlock = () => {
  const saveConfirmationModal = useModal<unknown>();
  const { render } = useRegularQuestionWizardSteps(
    () => {},
    saveConfirmationModal
  );

  const { openDialog } = useDialogContext();

  const [deleteAtom, setDeleteAtom] = useAtom(DeleteConfirmationAtom);

  const sample = {
    id: "randomCharacters",
    text: "text item",
    inputText: "",
  };

  const handleDelete = () => {
    setDeleteAtom(sample);
    openDialog("delete-modal", "");
  };

  return (
    <Box>
      <button onClick={handleDelete}>sample delete</button>
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
