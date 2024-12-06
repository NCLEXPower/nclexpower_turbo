import React from "react";
import { screen, fireEvent } from "../../common";
import { render } from "@testing-library/react";
import { useAtom } from "jotai";
import {
  usePageLoaderContext,
  useBusinessQueryContext,
  useExecuteToast,
  useDialogContext,
} from "../../../contexts";
import { ApprovalListViewBlock } from "../../../system/app/internal/blocks/Hub/content/approval/steps/content/regular/ApprovalListViewBlock";
import { mockData } from "../../../system/app/internal/blocks/Hub/content/approval/steps/content/regular/mockData";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  usePageLoaderContext: jest.fn(),
  useBusinessQueryContext: jest.fn(),
  useExecuteToast: jest.fn(),
  useDialogContext: jest.fn(),
}));
const mockActiveStepAtom = jest.fn();
jest.mock("jotai", () => ({
  atom: jest.fn(() => mockActiveStepAtom),
  useAtom: jest.fn(),
}));

describe("ApprovalListViewBlock", () => {
  const mockSetContentLoader = jest.fn();
  const mockShowToast = jest.fn();
  const mockOpenDialog = jest.fn();
  const mockNextStep = jest.fn();
  const mockSetApprovalAtom = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks(), jest.useFakeTimers();
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });

    (useAtom as jest.Mock).mockReturnValue([undefined, mockSetApprovalAtom]);
    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });

    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetContents: jest.fn().mockReturnValue({
        data: mockData,
        isLoading: false,
      }),
    });

    (useDialogContext as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render ApprovalListViewBlock", () => {
    render(<ApprovalListViewBlock nextStep={mockNextStep} />);

    expect(screen.getByTestId("approval-list-view"));
  });

  it("should call setContentLoader with false after 3 seconds", () => {
    render(<ApprovalListViewBlock nextStep={mockNextStep} />);
    jest.advanceTimersByTime(3000);

    expect(mockSetContentLoader).toHaveBeenCalledWith(false);
    expect(mockSetContentLoader).toHaveBeenCalledTimes(1);
  });

  it("handles multiple selection toggle", () => {
    render(<ApprovalListViewBlock nextStep={mockNextStep} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("renders the approval list view when data is available", () => {
    render(<ApprovalListViewBlock nextStep={mockNextStep} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("ContentID")).toBeInTheDocument();
  });
});
