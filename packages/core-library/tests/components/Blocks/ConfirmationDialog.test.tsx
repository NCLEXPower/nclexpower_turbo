import { fireEvent, screen, render } from "../../common";
import { ConfirmationModal } from "../../../components";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const DEFAULT_PROPS = {
  dialogContent: "Are you sure?",
  customButton: "Continue",
  confirmButtonText: "Submit",
  isLoading: false,
  handleSubmit: jest.fn(),
  onClickFn: jest.fn(),
};

describe("ConfirmationModal Component", () => {
  let mockHandleSubmit: jest.Mock;
  let mockOnClickFn: jest.Mock;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockOnClickFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("opens the modal and displays content when the trigger button is clicked", () => {
    render(
      <ConfirmationModal
        {...DEFAULT_PROPS}
        handleSubmit={mockHandleSubmit}
        onClickFn={mockOnClickFn}
      />
    );

    const triggerButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(triggerButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();

    const content = screen.getByText("Are you sure?");
    expect(content).toBeInTheDocument();
  });

  it("calls handleSubmit when the confirm button is clicked", () => {
    render(
      <ConfirmationModal
        {...DEFAULT_PROPS}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    const confirmButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(confirmButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("closes the modal when isLoading is false after submitting", () => {
    render(
      <ConfirmationModal
        {...DEFAULT_PROPS}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    const confirmButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(confirmButton);

    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeVisible();
  });

  it("does not close the modal when isLoading is true after submitting", () => {
    render(
      <ConfirmationModal
        {...DEFAULT_PROPS}
        handleSubmit={mockHandleSubmit}
        isLoading={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    const confirmButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(confirmButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();
  });

  it("calls handleClose when the cancel button is clicked", () => {
    render(
      <ConfirmationModal {...DEFAULT_PROPS} handleSubmit={mockHandleSubmit} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeVisible();
  });

  it("renders custom confirmButtonText", () => {
    render(
      <ConfirmationModal {...DEFAULT_PROPS} confirmButtonText="Confirm" />
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    const confirmButton = screen.getByRole("button", { name: /Confirm/i });
    expect(confirmButton).toBeInTheDocument();
  });

  it("it renders the toggle button", () => {
    render(
      <ConfirmationModal {...DEFAULT_PROPS} customButton="ToggleButton" />
    );

    const confirmButton = screen.getByTestId("toggle-button");
    expect(confirmButton).toBeInTheDocument();
  });
});
