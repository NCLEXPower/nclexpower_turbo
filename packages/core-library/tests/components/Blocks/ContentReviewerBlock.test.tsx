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
      />
    );

    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  });

  it("should calls previousStep when 'Go Back' button is clicked", () => {
    render(
      <ContentReviewerBlock
        nextStep={mockNextStep}
        previousStep={mockPreviousStep}
      />
    );

    fireEvent.click(screen.getByText(/Go Back/i));
    expect(mockPreviousStep).toHaveBeenCalledTimes(1);
  });
});
