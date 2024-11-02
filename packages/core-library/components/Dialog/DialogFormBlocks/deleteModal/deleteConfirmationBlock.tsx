/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect } from "react";
import { DeleteConfirmationForm } from "./deleteConfirmationForm";
import { useDialogContext } from "../../../../contexts";

export type delConType = {
  id: number;
  text: string;
};

interface Props {
  data?: delConType;
}

export const DeleteConfirmationBlock: React.FC<Props> = ({ data }) => {
  const { closeDialog } = useDialogContext();
  const handleDelete = () => {
    closeDialog();
  };
  return (
    <DeleteConfirmationForm
      handleDelete={handleDelete}
      textContent={data?.text ?? ""}
    />
  );
};
