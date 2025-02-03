import { render, screen } from "@testing-library/react";
import { ProgramSectionTable } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit/ProgramSectionTable";
import { useAtom } from "jotai";

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
  { sectionType: "document", title: "Sample Title", id: 1 },
  { sectionType: "other", title: "Another Title", id: 2 },
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
});
