import React from "react";
import { screen, fireEvent } from "../../common";
import { render } from "@testing-library/react";
import { QuestionManagementPageBlock } from "../../../system/app/internal/blocks";
import { useDialogContext } from "../../../contexts";
import { useAtom } from "jotai";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
  useScroll: jest.fn(() => ({
    scrollTop: jest.fn(),
  })),
}));

jest.mock("../../../contexts", () => ({
  useDialogContext: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const mockActiveStepAtom = jest.fn();
jest.mock("jotai", () => ({
  atom: jest.fn(() => mockActiveStepAtom),
  useAtom: jest.fn(),
}));
describe("QuestionManagementPageBlock", () => {
  const mockOpenDialog = jest.fn();
  const mockActiveStep = 0;

  beforeEach(() => {
    (useDialogContext as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
    });

    (useAtom as jest.Mock).mockReturnValue({
      activeStep: mockActiveStep,
    });
  });

  it("should render QuestionManagementPageBlock", () => {
    render(<QuestionManagementPageBlock />);
    expect(screen.getByTestId("question-management")).toBeInTheDocument();
  });

  //   it("should open dialog modal when delete button is clicked", () => {
  //     render(<QuestionManagementPageBlock />);
  //     const deleteButton = screen.getByRole("button", { name: /delete/i });
  //     fireEvent.click(deleteButton);

  //     const modal = screen.getByRole("dialog");
  //     expect(modal).toBeVisible();
  //   });
});
