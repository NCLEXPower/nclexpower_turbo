import { screen, fireEvent, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { DeleteConfirmationBlock } from "../../../components";
import { useDialogContext, useExecuteToast } from "../../../contexts";
import { Deletetype } from "../../../types/types";
import { useAtom } from "jotai";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  useDialogContext: jest.fn(),
  useExecuteToast: jest.fn(),
}));

jest.mock("jotai", () => {
  const actual = jest.requireActual("jotai");
  return {
    ...actual,
    useAtom: jest.fn(),
  };
});

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

describe("DeleteConfirmationDialog", () => {
  const mockCloseDialog = jest.fn();
  const mockSetDeleteAtom = jest.fn();
  const mockShowToast = jest.fn();
  const data: Deletetype = { id: 1, text: "Test Item" };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDialogContext as jest.Mock).mockReturnValue({
      closeDialog: mockCloseDialog,
      openDialog: jest.fn(),
    });
    (useAtom as jest.Mock).mockReturnValue([data, mockSetDeleteAtom]);
    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  it("returns null when deleteAtom is not set", () => {
    (useAtom as jest.Mock).mockReturnValue([null, jest.fn()]);

    const { container } = render(<DeleteConfirmationBlock />);

    expect(container.firstChild).toBeNull();
  });

  it("renders DeleteConfirmationForm with correct textContent", () => {
    render(<DeleteConfirmationBlock />);
    expect(screen.getByTestId("text-content")).toHaveTextContent(
      "This will permanently delete the Test Item"
    );
    expect(screen.getByTestId("render-text")).toHaveTextContent(
      "Type text below to delete"
    );
    expect(screen.getByTestId("render-test-text")).toHaveTextContent(
      "Test Item"
    );
  });

  it("enables Confirm button when input matches textContent and calls handleDelete on click", async () => {
    render(<DeleteConfirmationBlock />);
    const confirmButton = screen.getByRole("button", { name: /Confirm/i });
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Wrong Item" } });
    expect(confirmButton).toBeDisabled();

    fireEvent.change(input, { target: { value: "Test Item" } });
    await waitFor(() => expect(confirmButton).toBeEnabled());

    fireEvent.click(confirmButton);
    expect(mockShowToast).toHaveBeenCalledWith(
      "Successfully Deleted",
      "success"
    );
    expect(mockCloseDialog).toHaveBeenCalled();
  });
});
