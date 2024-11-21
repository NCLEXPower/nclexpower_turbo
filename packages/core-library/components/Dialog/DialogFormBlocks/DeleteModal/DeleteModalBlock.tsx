/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect } from "react";
import { DeleteConfirmationForm } from "./DeleteModalForm";
import { useDialogContext, useExecuteToast } from "../../../../contexts";
import { useAtom } from "jotai";
import { DeleteConfirmationAtom } from "./validation";

interface Props {}

export const DeleteConfirmationBlock: React.FC<Props> = () => {
  const [deleteAtom, setDeleteAtom] = useAtom(DeleteConfirmationAtom);
  const { closeDialog } = useDialogContext();
  const { showToast } = useExecuteToast();

  if (!deleteAtom) {
    return null;
  }

  const handleDelete = () => {
    showToast("Successfully Deleted", "success");
    closeDialog();
  };
  return (
    <DeleteConfirmationForm handleDelete={handleDelete} data={deleteAtom} />
  );
};
