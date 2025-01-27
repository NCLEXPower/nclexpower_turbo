import { render } from "@testing-library/react";
import { RefundModal } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/RefundModal";
import { screen, userEvent } from "../../../../common";
import { useRefundModalSteps } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/steps/useSteps";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock(
  "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/steps/useSteps",
  () => ({
    useRefundModalSteps: jest.fn(),
  })
);

describe("RefundModal component", () => {
  it("renders the modal content when open", () => {
    (useRefundModalSteps as jest.Mock).mockReturnValue({
      render: <div>Mocked Render</div>,
    });

    render(<RefundModal open={true} onClose={jest.fn()} />);

    // Verify modal content is in the document
    expect(screen.getByText("Refund Request")).toBeInTheDocument();
    expect(screen.getByText("Mocked Render")).toBeInTheDocument();
  });

  it("does not render the modal content when closed", () => {
    (useRefundModalSteps as jest.Mock).mockReturnValue({
      render: <div>Mocked Render</div>,
    });

    render(<RefundModal open={false} onClose={jest.fn()} />);

    expect(screen.queryByText("Refund Request")).not.toBeInTheDocument();
    expect(screen.queryByText("Mocked Render")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onCloseMock = jest.fn();
    (useRefundModalSteps as jest.Mock).mockReturnValue({
      render: <div>Mocked Render</div>,
    });

    render(<RefundModal open={true} onClose={onCloseMock} />);

    const closeButton = screen.getByTestId("close-btn");
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
