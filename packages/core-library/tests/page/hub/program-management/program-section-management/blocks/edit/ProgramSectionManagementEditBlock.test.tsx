/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../../../common";
import { ProgramSectionManagementEditBlock } from "../../../../../../../system/app/internal/blocks";
import { useRouter } from "../../../../../../../core";
import { useAtom } from "jotai";
import {
  SectionTitleAtom,
  SectionTypeAtom,
  SectionDataIdAtom,
} from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/validation";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    back: jest.fn(),
    title: "Program Section Management",
  }),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn(),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/components/ProgramSectionHeader",
  () => ({
    ProgramSectionHeader: ({
      sectionTitle,
      handleCreateSection,
    }: {
      sectionTitle: string;
      handleCreateSection: (sectionTitle: string) => void;
    }) => (
      <div>
        <h1>{sectionTitle}</h1>
        <button onClick={() => handleCreateSection(sectionTitle)}>
          Create Section
        </button>
      </div>
    ),
  })
);

const programSectionListMock = [
  { sectionData: { title: "Test Section", sectionDataId: "12345" } },
];

(useAtom as jest.Mock).mockImplementationOnce(() => [
  programSectionListMock[0].sectionData,
  jest.fn(),
]);

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit/ProgramSectionTable",
  () => ({
    ProgramSectionTable: ({
      onEdit,
      onDelete,
      tableData,
    }: {
      onEdit: (sectionDataId: string) => void;
      onDelete: (sectionDataId: string) => void;
      tableData: Array<{ title: string; sectionDataId: string }>;
    }) => (
      <div>
        {tableData.map((row, index) => (
          <div key={index}>
            <span>{row.title}</span>
            <button onClick={() => onEdit(row.sectionDataId)}>Edit</button>
            <button onClick={() => onDelete(row.sectionDataId)}>Delete</button>
          </div>
        ))}
      </div>
    ),
  })
);

describe("ProgramSectionManagementEditBlock", () => {
  let mockPush: jest.Mock;
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });

    (useAtom as jest.Mock).mockImplementation((atom: any) => {
      switch (atom) {
        case SectionTitleAtom:
          return ["Title", jest.fn()];
        case SectionTypeAtom:
          return ["document", jest.fn()];
        case SectionDataIdAtom:
          return [null, jest.fn()];
        default:
          return [null, jest.fn()];
      }
    });
  });

  it("renders the component", () => {
    render(<ProgramSectionManagementEditBlock />);
    expect(screen.getByText("Program Section Management")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("calls router.back() when Back button is clicked", () => {
    render(<ProgramSectionManagementEditBlock />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("calls handleCreateSection and navigates to create section", () => {
    render(<ProgramSectionManagementEditBlock />);
    fireEvent.click(screen.getByText("Create Section"));
    expect(mockPush).toHaveBeenCalledWith(
      "/hub/program/program-section-management/create"
    );
  });
});
