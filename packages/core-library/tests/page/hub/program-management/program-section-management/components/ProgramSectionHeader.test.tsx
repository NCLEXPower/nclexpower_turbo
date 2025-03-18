/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../../common";
import { ProgramSectionHeader } from "../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/components/ProgramSectionHeader";

jest.mock("../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../components", () => ({
  EvaIcon: jest.fn(({ name }) => <div>{name}</div>),
  IconButton: jest.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

describe("ProgramSectionHeader", () => {
  const mockHandleCreateSection = jest.fn();
  const mockHandleEditSection = jest.fn();
  const mockHandleDeleteSection = jest.fn();
  const mockSectionImage = "/path/to/image.png";
  const mockSectionTitle = "Test Section";
  const mockSectionType = "document";

  it("renders the section title correctly", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
      />
    );

    expect(screen.getByText(/Test Section Section/i)).toBeInTheDocument();
  });

  it("renders the create button if showAddButton is true", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
        showAddButton={true}
        handleCreateSection={mockHandleCreateSection}
      />
    );

    expect(screen.getByText("plus-outline")).toBeInTheDocument();
  });

  it("calls handleCreateSection when the create button is clicked", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
        showAddButton={true}
        handleCreateSection={mockHandleCreateSection}
      />
    );

    fireEvent.click(screen.getByText("plus-outline"));

    expect(mockHandleCreateSection).toHaveBeenCalledWith(
      mockSectionTitle,
      mockSectionType
    );
  });

  it("renders the edit and delete buttons if showHeaderButtons is true", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
        showHeaderButtons={true}
        handleCreateSection={mockHandleCreateSection}
      />
    );

    expect(screen.getByText("plus-outline")).toBeInTheDocument();
  });

  it("renders the edit button when showAddButton is true and handleEditSection is provided", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
        showAddButton={true}
        handleEditSection={mockHandleEditSection}
      />
    );

    expect(screen.getByText("chevron-right-outline")).toBeInTheDocument();
  });

  it("calls handleEditSection when the edit button is clicked", () => {
    render(
      <ProgramSectionHeader
        sectionImage={mockSectionImage}
        sectionTitle={mockSectionTitle}
        sectionType={mockSectionType}
        showAddButton={true}
        handleEditSection={mockHandleEditSection}
      />
    );

    fireEvent.click(screen.getByText("chevron-right-outline"));

    expect(mockHandleEditSection).toHaveBeenCalledWith(
      mockSectionTitle,
      mockSectionType
    );
  });
});
