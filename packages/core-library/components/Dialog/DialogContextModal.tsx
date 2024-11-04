import React from "react";
import {
  CategoryDialogFormBlock,
  ProductDialogBlock,
  AutomationDBComparisonFormBlock,
  ApprovalDialogBlock,
} from "./DialogFormBlocks";
import { ExcelRowRegularQuestion } from "../../core";

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
    default:
    case "approval":
      return <ApprovalDialogBlock />;
      return null;
  }
};
