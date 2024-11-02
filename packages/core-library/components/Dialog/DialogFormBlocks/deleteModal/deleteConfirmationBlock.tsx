/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect } from "react";
import { DeleteConfirmationForm } from "./deleteConfirmationForm";
import { useDialogContext } from "../../../../contexts";
import { Deletetype } from "../../../../types/types";
import { useAtom } from "jotai";
import { DeleteConfirmationAtom } from "./validation";

interface Props {}

export const DeleteConfirmationBlock: React.FC<Props> = () => {
  const [deleteAtom, setDeleteAtom] = useAtom(DeleteConfirmationAtom);
  const { closeDialog } = useDialogContext();
  const handleDelete = () => {
    closeDialog();
  };
  return (
    <DeleteConfirmationForm
      handleDelete={handleDelete}
      textContent={deleteAtom?.text ?? ""}
    />
  );
};
