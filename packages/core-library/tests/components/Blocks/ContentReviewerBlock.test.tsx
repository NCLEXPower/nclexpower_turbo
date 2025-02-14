import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "../../common";
import ContentReviewerBlock from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/ContentReviewerBlock";
import { usePageLoaderContext } from "../../../contexts/PageLoaderContext";
import { useExecuteToast } from "../../../contexts";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  useExecuteToast: jest.fn(),
}));

describe("ContentReviewerBlock", () => {
  const mockPreviousStep = jest.fn();
  const mockNextStep = jest.fn();
  const mockSetContentLoader = jest.fn();
  const mockShowToast = jest.fn();
  const approvalDataMock = {
    data: [
      {
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afab",
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
      },
    ],
    implementationSchedule: new Date(),
  };

  beforeEach(() => {
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  it("should renders ContentReviewerBlock correctly", () => {
    render(
      <ContentReviewerBlock
        nextStep={mockNextStep}
        previousStep={mockPreviousStep}
        values={{}}
      />
    );

    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  });

  it("should calls previousStep when 'Go Back' button is clicked", () => {
    render(
      <ContentReviewerBlock
        nextStep={mockNextStep}
        previousStep={mockPreviousStep}
        values={{}}
      />
    );

    fireEvent.click(screen.getByText(/Go Back/i));
    expect(mockPreviousStep).toHaveBeenCalledTimes(1);
  });
});
