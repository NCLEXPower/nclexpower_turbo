import React from "react";
import { render, screen } from "../common";
import "@testing-library/jest-dom";
import { DialogContextModal } from "../../components/Dialog/DialogContextModal";
import {
  useDialogContext,
  useExecuteToast,
  usePageLoaderContext,
} from "../../contexts";
import {
  CategoryDialogFormBlock,
  ProductDialogBlock,
  AutomationDBComparisonFormBlock,
  ApprovalDialogBlock,
} from "../../components";
import { InclusionEditForm } from "../../components/Dialog/DialogFormBlocks/inclusion/InclusionEditForm";
import { ExcelRowRegularQuestion } from "../../core";
import { useAtom } from "jotai";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));
jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../contexts/DialogContext", () => ({
  useDialogContext: jest.fn(),
}));
jest.mock("../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn(),
}));
jest.mock("../../contexts/ToastContext", () => ({
  useExecuteToast: jest.fn(),
}));
jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtom: jest.fn(),
}));
jest.mock("../../components", () => ({
  CategoryDialogFormBlock: jest.fn(),
  ProductDialogBlock: jest.fn(),
  AutomationDBComparisonFormBlock: jest.fn(() => (
    <div data-testid="automation-db-comparison" />
  )),
  ApprovalDialogBlock: jest.fn(),
}));

jest.mock(
  "../../components/Dialog/DialogFormBlocks/inclusion/InclusionEditForm",
  () => ({
    InclusionEditForm: jest.fn(() => <div data-testid="inclusion-edit-form" />),
  })
);

describe("DialogContextModal", () => {
  const mockCloseDialog = jest.fn();
  const mockApprovalData = {
    approval: [{ contentId: "test-id", contentAuthorId: "author-id" }],
    implementationSchedule: new Date("2024-11-04T22:45:08+08:00"),
  };
  const mockSetApprovalAtom = jest.fn();
  const mockSetContentLoader = jest.fn();
  const mockExecuteToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDialogContext as jest.Mock).mockReturnValue({
      closeDialog: mockCloseDialog,
      openDialog: jest.fn(),
    });
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });
    (useExecuteToast as jest.Mock).mockReturnValue({
      executeToast: mockExecuteToast,
    });
    (useAtom as jest.Mock).mockReturnValue([
      mockApprovalData,
      mockSetApprovalAtom,
    ]);
  });

  it("renders CategoryDialogFormBlock when dialogFormType is 'category_form'", () => {
    render(<DialogContextModal dialogFormType="category_form" />);
    expect(screen.getByTestId("category-form")).toBeInTheDocument();
  });

  it("renders ProductDialogBlock when dialogFormType is 'select_pricing'", () => {
    render(<DialogContextModal dialogFormType="select_pricing" />);
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });

  it("renders AutomationDBComparisonFormBlock when dialogFormType is 'automation-db-comparison'", () => {
    const mockCsvData: ExcelRowRegularQuestion[] = [
      {
        QID: 1,
        qLNum: 101,
        question: "What is the capital of France?",
        choice_1: "Paris",
        choice_2: "London",
        choice_3: "Berlin",
        choice_4: "Madrid",
        choice_5: "",
        choice_6: "",
        correct: "Paris",
        rationale: "Paris is the capital city of France.",
        cogLNum: 2,
        CNCateg: 3,
        integPLNum: 4,
        contentLNum: 5,
      },
    ];

    render(
      <DialogContextModal
        dialogFormType="automation-db-comparison"
        csvData={mockCsvData}
      />
    );

    expect(screen.getByTestId("automation-db-comparison")).toBeInTheDocument();
  });

  it("renders InclusionEditForm when dialogFormType is 'inclusion-edit-form'", () => {
    render(<DialogContextModal dialogFormType="inclusion-edit-form" />);
    expect(screen.getByTestId("inclusion-edit-form")).toBeInTheDocument();
  });

  it("renders null when dialogFormType does not match any case", () => {
    const { container } = render(
      <DialogContextModal dialogFormType="unknown" />
    );
    expect(container.firstChild).toBeNull();
  });
});
