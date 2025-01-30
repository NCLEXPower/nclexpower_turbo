import { render } from "@testing-library/react";
import { screen, userEvent } from "../../../../common";
import { RefundPaymentBlock } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/steps/contents/RefundPaymentBlock/RefundPaymentBlock";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock(
  "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/SubmitRefundRequestModal",
  () => ({
    SubmitRefundRequestModal: jest.fn(() => <div data-testid="submit-modal" />),
  })
);

describe("RefundPaymentBlock", () => {
  const mockPreviousStep = jest.fn();
  const mockPrevious = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <RefundPaymentBlock
        previousStep={mockPreviousStep}
        previous={mockPrevious}
      />
    );
  };

  it("renders the RefundPaymentBlock UI correctly", () => {
    renderForm();

    expect(
      screen.getByRole("heading", { name: /refund payment/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /submit request/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/payment method:/i)).toBeInTheDocument();
  });

  it("calls previousStep({}) and previous when Back is clicked", async () => {
    renderForm();

    const backButton = screen.getByRole("button", { name: /back/i });
    await userEvent.click(backButton);

    expect(mockPreviousStep).toHaveBeenCalledWith({});
    expect(mockPrevious).toHaveBeenCalledTimes(1);
  });

  it("toggles the submit modal when clicking Submit Request", async () => {
    renderForm();

    const submitRequestButton = screen.getByRole("button", {
      name: /submit request/i,
    });
    await userEvent.click(submitRequestButton);

    expect(screen.getByTestId("submit-modal")).toBeInTheDocument();
  });
});
