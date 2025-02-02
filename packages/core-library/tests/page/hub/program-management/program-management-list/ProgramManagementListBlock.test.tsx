/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, fireEvent, screen } from "@testing-library/react";
import { ProgramManagementListBlock } from "../../../../../system/app/internal/blocks";
import { useRouter } from "next/router";
import { useExecuteToast } from "../../../../../contexts";
import { useAtom } from "jotai";
import {
  standardProgramManagementList,
  fastrackProgramManagementList,
} from "../../../../../core/utils/contants/wc/programs/ProgramListData";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

const mockStandardProgramList = standardProgramManagementList;
const mockFastTrackProgramList = fastrackProgramManagementList;

describe("ProgramManagementListBlock", () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useExecuteToast as jest.Mock).mockReturnValue({ showToast: jest.fn() });
    (useAtom as jest.Mock).mockReturnValue([null, jest.fn()]);
  });

  it("renders ProgramManagementListBlock component", () => {
    render(<ProgramManagementListBlock />);

    expect(screen.getByText("Program Management List")).toBeInTheDocument();

    expect(screen.getByText("Standard (23-day) Program")).toBeInTheDocument();
    expect(screen.getByText("Fast Track (8-day) Program")).toBeInTheDocument();
  });

  it("toggles between Standard and Fast Track programs", () => {
    render(<ProgramManagementListBlock />);

    const standardButton = screen.getByText("Standard (23-day) Program");
    const fastTrackButton = screen.getByText("Fast Track (8-day) Program");

    expect(
      screen.queryByText(mockStandardProgramList[0]?.title)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockFastTrackProgramList[0]?.title)
    ).not.toBeInTheDocument();

    fireEvent.click(fastTrackButton);

    expect(
      screen.queryByText(mockFastTrackProgramList[0]?.title)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockStandardProgramList[0]?.title)
    ).not.toBeInTheDocument();
  });

  it("handles program removal correctly", () => {
    render(<ProgramManagementListBlock />);

    const removeButtons = screen.queryAllByTestId("trash-outline");

    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);
  });
});
