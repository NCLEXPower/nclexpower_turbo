import { render } from "@testing-library/react";
import { screen, fireEvent } from "../../../../common";
import { RefundPaymentBlock } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/RefundPaymentBlock";
import { SubmitRefundRequestModal } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/SubmitRefundRequestModal";
import {
  refundCardData,
  refundPaymentData,
  refundPaymentItems,
} from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/constants";

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
  const mockBackPage = jest.fn();

  const renderComponent = () => {
    render(<RefundPaymentBlock backPage={mockBackPage} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders RefundPaymentBlock with all sections", () => {
    renderComponent();

    expect(
      screen.getByText(/refund payment/i, { selector: "h3" })
    ).toBeInTheDocument();

    expect(screen.getByText(/payment method:/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${refundCardData.name} ending in ${refundCardData.endingDigits}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Expiry date: ${refundCardData.expiryMonth}/${refundCardData.expiryYear}`
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/refund amount/i)).toBeInTheDocument();

    expect(screen.getByText(/refund reason/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/content not as advertised/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/better alternative found/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/difficulty navigating platform/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/describe the reason for this refund/i)
    ).toBeInTheDocument();
  });

  it("triggers the backPage callback when clicking the back button", () => {
    renderComponent();

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockBackPage).toHaveBeenCalledTimes(1);
  });

  it("opens the SubmitRefundRequestModal when clicking 'Submit Request'", () => {
    renderComponent();

    const submitButton = screen.getByRole("button", {
      name: /submit request/i,
    });
    fireEvent.click(submitButton);

    // Assert modal is opened
    expect(screen.getByTestId("submit-modal")).toBeInTheDocument();
    expect(SubmitRefundRequestModal).toHaveBeenCalledWith(
      { open: true, onClose: expect.any(Function) },
      {}
    );
  });

  it("renders refund payment details correctly", () => {
    renderComponent();

    const labelToValueMap = {
      "Estimated Refund Duration": refundPaymentData.refundDuration,
      Subtotal: `$${refundPaymentData.subtotal.toFixed(2)}`,
      "Time Period": refundPaymentData.timePeriod,
      "Refund Percentage": `${refundPaymentData.refundPercentage.toFixed(2)}%`,
      "Total Refundable": `$${(
        refundPaymentData.subtotal *
        (refundPaymentData.refundPercentage / 100)
      ).toFixed(2)}`,
    };

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(refundPaymentItems.length + 1);

    refundPaymentItems.forEach((item, index) => {
      const label = item.label;
      const value = labelToValueMap[label];

      expect(listItems[index]).toHaveTextContent(label);
      expect(listItems[index]).toHaveTextContent(value);
    });

    const refundAmountLabel = screen.getByText(/refund amount/i);

    const refundAmountLi = refundAmountLabel.closest("li");
    expect(refundAmountLi).toBeInTheDocument();

    expect(refundAmountLi).toHaveTextContent(/refund amount/i);

    const expectedRefundAmount = `$${(
      refundPaymentData.subtotal *
      (refundPaymentData.refundPercentage / 100)
    ).toFixed(2)}`;

    expect(refundAmountLi).toHaveTextContent(expectedRefundAmount);
  });
});
