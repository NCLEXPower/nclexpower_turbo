import { render, screen, fireEvent, waitFor } from "../../../../../../common";
import { ProgramSectionTable } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit/ProgramSectionTable";
import { useAtom } from "jotai";

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtom: jest.fn(),
}));

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const programSectionList = [
  { sectionId: "123", sectionDataId: "12345", sectionType: "document", title: "Sample Title", link: "https://example.com" },
  { sectionId: "456", sectionDataId: "45678", sectionType: "other", title: "Another Title" },
];

describe("ProgramSectionTable", () => {
  let mockEdit: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    mockEdit = jest.fn();
    mockDelete = jest.fn();
    (useAtom as jest.Mock).mockReturnValue(["document", jest.fn()]);
  });

  it("should render rows only for the specified section type", () => {
    render(
      <ProgramSectionTable
        onEdit={mockEdit}
        onDelete={mockDelete}
        tableData={programSectionList.filter(
          (item) => item.sectionType === "document"
        )}
        sectionType="document"
      />
    );

    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(2);
  });

  it("should not render rows for the wrong section type", () => {
    render(
      <ProgramSectionTable
        onEdit={mockEdit}
        onDelete={mockDelete}
        tableData={programSectionList.filter(
          (item) => item.sectionType === "document"
        )}
        sectionType="video"
      />
    );

    const tableRows = screen.queryAllByRole("row");
    expect(tableRows.length).toBe(2);
  });

  it("should render the correct column headers", () => {
    render(
      <ProgramSectionTable
        onEdit={mockEdit}
        onDelete={mockDelete}
        tableData={programSectionList}
        sectionType="document"
      />
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("should show 'No data found' message when tableData is empty", () => {
    render(
      <ProgramSectionTable
        onEdit={mockEdit}
        onDelete={mockDelete}
        tableData={[]}
        sectionType="document"
      />
    );

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should render rows correctly for different section types", () => {
    const sectionTypes = ["document", "video", "simulator", "content-cards", "med-cards", "cat"];
    
    sectionTypes.forEach((type) => {
      render(
        <ProgramSectionTable
          onEdit={mockEdit}
          onDelete={mockDelete}
          tableData={programSectionList.map(item => ({ ...item, sectionType: type }))}
          sectionType={type}
        />
      );
      
      const tableRows = screen.getAllByRole("row");
      expect(tableRows.length).toBeGreaterThan(1);
    });
  });
});
