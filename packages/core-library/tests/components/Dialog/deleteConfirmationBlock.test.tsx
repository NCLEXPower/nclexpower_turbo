import React from "react";
import { screen, fireEvent, waitFor, render } from "../../common";
import { DeleteConfirmationBlock } from "../../../components";
import { DialogContextProvider, useDialogContext } from "../../../contexts";
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

jest.mock("../../../contexts/DialogContext", () => ({
  useDialogContext: jest.fn(),
}));

jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtom: jest.fn(),
}));

describe("DeleteConfirmationDialog", () => {
  const mockCloseDialog = jest.fn();
  const data: Deletetype = { id: 1, text: "Test Item" };
  const mockSetDeleteAtom = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDialogContext as jest.Mock).mockReturnValue({
      closeDialog: mockCloseDialog,
      openDialog: jest.fn(),
    });
    (useAtom as jest.Mock).mockReturnValue([data, mockSetDeleteAtom]);
  });

  it("renders DeleteConfirmationForm with correct textContent", () => {
    render(<DeleteConfirmationBlock />);
    expect(screen.getByTestId("text-content")).toHaveTextContent(
      "This will permanently delete the Test Item"
    );
    expect(screen.getByTestId("render-text")).toHaveTextContent(
      "Type Test Item to delete"
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
    expect(mockCloseDialog).toHaveBeenCalled();
  });
});
