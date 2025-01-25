import { render } from "@testing-library/react";
import { RefundModal } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/RefundModal";
import { screen, userEvent, waitFor } from "../../../../common";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

describe("Refund Modal", () => {
  it("Renders the modal with Refund Policy be default", () => {
    render(<RefundModal open={true} onClose={jest.fn()} />);

    expect(screen.getByTestId("policy-block")).toBeInTheDocument();
  });

  it("Toggles from policy to payment", async () => {
    render(<RefundModal open={true} onClose={jest.fn()} />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    userEvent.click(continueButton);

    waitFor(() => {
      expect(screen.getByTestId("payment-block")).toBeInTheDocument();
    });
  });

  it("Closes the modal upon clicking X button", async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();

    render(<RefundModal open={true} onClose={onCloseMock} />);

    const closeBtn = screen.getByTestId("close-btn");
    await user.click(closeBtn);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
