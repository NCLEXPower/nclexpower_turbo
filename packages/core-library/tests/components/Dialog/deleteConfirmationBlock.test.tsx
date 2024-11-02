import React from "react";
import { screen, fireEvent, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { delConType, DeleteConfirmationBlock } from "../../../components";
import { useDialogContext } from "../../../contexts";

jest.mock("../../../contexts", () => ({
  useDialogContext: jest.fn(),
}));

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("DeleteConfirmationDialog", () => {
  const mockCloseDialog = jest.fn();
  const data: delConType = { id: 1, text: "Test Item" };

  beforeEach(() => {
    (useDialogContext as jest.Mock).mockReturnValue({
      closeDialog: mockCloseDialog,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders DeleteConfirmationForm with correct textContent", () => {
    render(<DeleteConfirmationBlock data={data} />);
    expect(screen.getByTestId("text-content")).toHaveTextContent(
      "This will permanently delete the Test Item"
    );
    expect(screen.getByTestId("render-text")).toHaveTextContent(
      "Type Test Item to delete"
    );
  });

  it("enables Confirm button when input matches textContent and calls handleDelete on click", async () => {
    render(<DeleteConfirmationBlock data={data} />);
    const confirmButton = screen.getByRole("button", { name: /Confirm/i });
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Wrong Item" } });
    expect(confirmButton).toBeDisabled();

    fireEvent.change(input, { target: { value: "Test Item" } });
    await waitFor(() => expect(confirmButton).toBeEnabled());

    fireEvent.click(confirmButton);
    expect(mockCloseDialog).toHaveBeenCalled();
  });
});
