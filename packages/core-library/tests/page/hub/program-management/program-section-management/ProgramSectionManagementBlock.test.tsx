/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { render, screen, fireEvent } from "../../../../common";
import { ProgramSectionManagementListBlock } from "../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../core";
import { useAtom } from "jotai";
import { programSectionList } from "../../../../../core/utils/contants/wc/programs/ProgramListData";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../../utils/IconUtils", () => ({
  getSectionTypeIcons: jest.fn(() => "/mock-icon.png"),
}));

describe("ProgramSectionManagementListBlock", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useAtom as jest.Mock).mockReturnValue([null, jest.fn()]);
  });

  it("renders the back button", () => {
    render(<ProgramSectionManagementListBlock />);

    const backButton = screen.getByText("Go Back");
    expect(backButton).toBeInTheDocument();
  });

  it("renders the program section management title", () => {
    render(<ProgramSectionManagementListBlock />);

    const title = screen.getByText("Program Section Management");
    expect(title).toBeInTheDocument();
  });

  it("calls handleBack when the 'Go Back' button is clicked", () => {
    render(<ProgramSectionManagementListBlock />);

    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);

    expect(mockRouterPush).toHaveBeenCalledWith(expect.any(Function));
  });

  it("renders ProgramSectionHeader for each section in programSectionList", () => {
    render(<ProgramSectionManagementListBlock />);

    programSectionList.forEach((section) => {
      const sectionTitle = screen.getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === "h4" &&
          content.includes(section.sectionTitle)
      );
      expect(sectionTitle).toBeInTheDocument();
    });
  });
});
