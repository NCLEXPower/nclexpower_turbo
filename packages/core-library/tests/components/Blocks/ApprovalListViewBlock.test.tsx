import React from "react";
import { screen, fireEvent, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { ApprovalListViewBlock } from "../../../system/app/internal/blocks/Hub/content/approval/steps/content/regular/ApprovalListViewBlock";
import {
  useBusinessQueryContext,
  usePageLoaderContext,
  useDialogContext,
  useExecuteToast,
} from "../../../contexts";
import { useAtom } from "jotai";
import { useAccountId } from "../../../contexts/auth/hooks";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useScroll: jest.fn(() => ({
    scrollTop: jest.fn(),
  })),
  useRouter: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
  usePageLoaderContext: jest.fn(),
  useDialogContext: jest.fn(),
  useExecuteToast: jest.fn(),
}));

jest.mock("../../../hooks/useApi", () => ({
  useApiCallback: jest.fn().mockReturnValue({
    loading: false,
    result: {
      data: {},
    },
    error: undefined,
  }),
  useApi: jest.fn().mockReturnValue({
    loading: false,
    result: {
      data: {},
    },
    error: undefined,
  }),
}));

// jest.mock("../../../contexts/auth/hooks", () => ({
//   useAccountId: jest.fn(() => ["test-account-id"]),
// }));

const mockActiveStepAtom = jest.fn();

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(() => mockActiveStepAtom),
}));

jest.mock(
  "../../../system/app/internal/blocks/Hub/QuestionManagement/steps/useSteps",
  () => ({
    useRegularQuestionWizardSteps: jest.fn(() => ({
      render: jest.fn(),
    })),
  })
);

describe("ApprovalListViewBlock Component", () => {
  const mockSetApprovalAtom = jest.fn();
  const mockSetContentLoader = jest.fn();
  const mockOpenDialog = jest.fn();
  const mockShowToast = jest.fn();
  const mockNextStep = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    (useAtom as jest.Mock).mockReturnValue([undefined, mockSetApprovalAtom]);

    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });

    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetContents: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
      }),
    });

    (useDialogContext as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
    });

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  it("renders without crashing", () => {
    render(<ApprovalListViewBlock nextStep={mockNextStep} />);
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
