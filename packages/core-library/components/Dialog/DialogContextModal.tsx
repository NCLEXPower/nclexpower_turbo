/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import {
  CategoryDialogFormBlock,
  ProductDialogBlock,
  AutomationDBComparisonFormBlock,
  ApprovalDialogBlock,
  DeleteConfirmationBlock,
} from "./DialogFormBlocks";
import { ExcelRowRegularQuestion } from "../../core";
import { InclusionEditForm } from "./DialogFormBlocks/inclusion/InclusionEditForm";

interface Props {
  dialogFormType: string;
  csvData?: ExcelRowRegularQuestion[];
}

export const DialogContextModal: React.FC<Props> = ({
  dialogFormType,
  csvData,
}) => {
  switch (dialogFormType) {
    case "category_form":
      return <CategoryDialogFormBlock />;
    case "select_pricing":
      return <ProductDialogBlock />;
    case "automation-db-comparison":
      return <AutomationDBComparisonFormBlock csvData={csvData ?? []} />;
    case "approval":
      return <ApprovalDialogBlock />;
    case "inclusion-edit-form":
      return <InclusionEditForm />;
    case "delete-modal":
      return <DeleteConfirmationBlock />;
    default:
      return null;
  }
};
