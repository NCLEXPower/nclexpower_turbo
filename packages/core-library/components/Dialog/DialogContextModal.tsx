import React from "react";
import {
  CategoryDialogFormBlock,
  ProductDialogBlock,
  AutomationDBComparisonFormBlock,
  DeleteConfirmationBlock,
  delConType,
} from "./DialogFormBlocks";
import { ExcelRowRegularQuestion } from "../../core";
import { InclusionEditForm } from "./DialogFormBlocks/inclusion/InclusionEditForm";

interface Props {
  dialogFormType: string;
  csvData?: ExcelRowRegularQuestion[];
  data?: delConType;
}

export const DialogContextModal: React.FC<Props> = ({
  dialogFormType,
  csvData,
  data,
}) => {
  switch (dialogFormType) {
    case "category_form":
      return <CategoryDialogFormBlock />;
    case "select_pricing":
      return <ProductDialogBlock />;
    case "automation-db-comparison":
      return <AutomationDBComparisonFormBlock csvData={csvData ?? []} />;
    case "inclusion-edit-form":
      return <InclusionEditForm />;
    default:
      return null;
  }
};
