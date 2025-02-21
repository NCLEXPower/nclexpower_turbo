/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen } from "@testing-library/react";
import { ProgramManagementListBlock } from "../../../../../system/app/internal/blocks";
import { useRouter } from "next/router";
import { useExecuteToast } from "../../../../../contexts";
import { useAtom } from "jotai";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetAllPrograms: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  })),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

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

    expect(screen.getByText("Standard (23-Day) Program")).toBeInTheDocument();
    expect(screen.getByText("Fast Track (8-Day) Program")).toBeInTheDocument();
  });
});
