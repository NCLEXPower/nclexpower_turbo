import React from "react";
import { render } from "@testing-library/react";
import { screen, waitFor } from "../../common";
import { RegularApprovalListView } from "../../../system/app/internal/blocks/Hub/content/approval/steps/content/regular/RegularApprovalListView";
import { ApprovalListViewBlock } from "../../../components/blocks/ContentApproval/ApprovalListViewBlock";
import { useBusinessQueryContext } from "../../../contexts";
import { useAccountId } from "../../../contexts/auth/hooks";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../components/blocks/ContentApproval/ApprovalListViewBlock",
  () => ({
    ApprovalListViewBlock: jest.fn(() => <div>ApprovalListViewBlock Mock</div>),
  })
);

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  useAccountId: jest.fn(),
}));

const mockNextStep = jest.fn();

describe("RegularApprovalListView", () => {
  beforeEach(() => {
    (useAccountId as jest.Mock).mockReturnValue([() => "mock-account-id"]);
    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetContents: jest.fn().mockReturnValue({
        data: [
          {
            mainContent: {
              mainType: "Regular",
            },
          },
        ],
        isLoading: false,
        isError: false,
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ApprovalListViewBlock with correct props", async () => {
    render(<RegularApprovalListView nextStep={mockNextStep} />);

    await waitFor(() => {
      expect(
        screen.getByText("ApprovalListViewBlock Mock")
      ).toBeInTheDocument();
    });

    expect(ApprovalListViewBlock).toHaveBeenCalledWith(
      expect.objectContaining({
        nextStep: mockNextStep,
        data: [{ mainContent: { mainType: "Regular" } }],
        isLoading: false,
        isError: false,
      }),
      expect.anything()
    );
  });

  it("handles loading state", async () => {
    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetContents: jest.fn().mockReturnValue({
        data: [],
        isLoading: true,
        isError: false,
      }),
    });

    render(<RegularApprovalListView nextStep={mockNextStep} />);

    await waitFor(() => {
      expect(ApprovalListViewBlock).toHaveBeenCalledWith(
        expect.objectContaining({
          isLoading: true,
        }),
        expect.anything()
      );
    });
  });

  it("handles error state", async () => {
    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetContents: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        isError: true,
      }),
    });

    render(<RegularApprovalListView nextStep={mockNextStep} />);

    await waitFor(() => {
      expect(ApprovalListViewBlock).toHaveBeenCalledWith(
        expect.objectContaining({
          isError: true,
        }),
        expect.anything()
      );
    });
  });
});
