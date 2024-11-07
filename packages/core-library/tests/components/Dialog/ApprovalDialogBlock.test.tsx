import { screen, fireEvent, waitFor, render, act } from "../../common";
import { ApprovalDialogBlock } from "../../../components";
import { useDialogContext, useExecuteToast } from "../../../contexts";
import { useAtom } from "jotai";
import { usePageLoaderContext } from "../../../contexts/PageLoaderContext";

// Mock dependencies
jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../../../contexts/DialogContext", () => ({
  useDialogContext: jest.fn(),
}));
jest.mock("../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn(),
}));
jest.mock("../../../contexts/ToastContext", () => ({
  useExecuteToast: jest.fn(),
}));
jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtom: jest.fn(),
}));

describe("ApprovalDialogBlock", () => {
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

  it("renders without crashing and displays default values", () => {
    render(<ApprovalDialogBlock />);
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("calls onSubmit successfully and triggers toast, loader, and closeDialog", () => {
    render(<ApprovalDialogBlock />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(mockExecuteToast).toHaveBeenCalledTimes(1);
      expect(mockExecuteToast).toHaveBeenCalledWith(
        "Successfully submitted..",
        "top-right",
        false,
        { toastId: 0, type: "success" }
      );
      expect(mockSetContentLoader).toHaveBeenCalledWith(true);
      expect(mockCloseDialog).toHaveBeenCalled();
    });

    waitFor(
      () => {
        expect(mockSetContentLoader).toHaveBeenCalledWith(false);
      },
      { timeout: 4000 }
    );
  });
});
