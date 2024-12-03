import React from "react";
import { render, screen, fireEvent, waitFor } from "../../common";
import {
  ApprovalListViewBlock,
  ApprovalProps,
} from "../../../system/app/internal/blocks/Hub/content/approval/steps/content/regular/ApprovalListViewBlock";
import {
  useBusinessQueryContext,
  usePageLoaderContext,
  useDialogContext,
  useExecuteToast,
} from "../../../contexts";
import { useAtom } from "jotai";

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

jest.mock("@mui/x-date-pickers", () => ({
  LocalizationProvider: jest.fn(),
}));

jest.mock("@tanstack/react-table", () => ({
  useReactTable: jest.fn(),
  flexRender: jest.fn((value: any) => value),
  getCoreRowModel: jest.fn(),
  getExpandedRowModel: jest.fn(),
  getFilteredRowModel: jest.fn(),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  useAccountId: jest.fn(() => ["f707251d-825c-4b78-66d6-08dcfcc5bf3e"]),
}));

jest.mock("../../../components/ReactTable/ReactTable", () => ({
  ReactTable: jest.fn(),
}));

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
      contentLoader: true,
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

  const renderComponent = (props: Partial<ApprovalProps> = {}) =>
    render(<ApprovalListViewBlock nextStep={mockNextStep} {...props} />);

  it("renders without crashing", () => {
    renderComponent();
    waitFor(
      () => {
        expect(screen.getByTestId("approvalist")).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  // it("toggles multiple selection state", () => {
  //   renderComponent();

  //   const checkbox = screen.getByLabelText("Multiple Selection");
  //   expect(checkbox).not.toBeChecked();

  //   fireEvent.click(checkbox);
  //   expect(checkbox).toBeChecked();
  // });
});
