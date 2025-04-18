/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../common";
import { ProgramManagementListEditField } from "../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/blocks/edit/ProgramManagementListEditField";
import { Control } from "react-hook-form";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../components", () => ({
  Button: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  EvaIcon: ({ name }: any) => <span>{name}</span>,
  IconButton: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  TextField: ({ name }: any) => <input name={name} />,
  FileUploadField: ({ onUpload }: any) => (
    <input type="file" onChange={(e) => onUpload(e.target.files)} />
  ),
  GenericSelectField: ({ onChange, options }: any) => (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

const mockOnSave = jest.fn();
const mockHandleBack = jest.fn();
const mockHandleAddSection = jest.fn();
const mockHandleSectionChange = jest.fn();
const mockHandleMultipleSelectChange = jest.fn();
const mockSetValue = jest.fn();
const mockHandleEditProgramSection = jest.fn();
const mockHandleDeleteProgramSection = jest.fn();
const mockHandleRemoveSection = jest.fn();

const mockUseForm = jest.fn().mockReturnValue({
  control: {} as Control,
  setValue: mockSetValue,
  handleSubmit: jest.fn(),
});

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn().mockReturnValue({
    control: {},
    setValue: mockSetValue,
    handleSubmit: jest.fn(),
  }),
}));

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'http://dummyurl.com');
});


describe("ProgramManagementListEditField", () => {
  const defaultProps = {
    removingSectionId: "2",
    isLoading: true,
    onSave: mockOnSave,
    handleBack: mockHandleBack,
    fileName: "",
    programImage: [],
    control: mockUseForm().control,
    sectionList: [],
    handleSectionChange: mockHandleSectionChange,
    handleAddSection: mockHandleAddSection,
    filteredSectionValuesList: () => [],
    handleMultipleSelectChange: mockHandleMultipleSelectChange,
    selectedSections: {},
    setValue: mockSetValue,
    showAddSection: true,
    sections: [],
    editingSectionId: null,
    editingSectionData: null,
    handleEditProgramSection: mockHandleEditProgramSection,
    handleDeleteProgramSection: mockHandleDeleteProgramSection,
    handleRemoveSection: mockHandleRemoveSection,
    fields: [
      {
        id: "1",
        sectionTitle: "Section 1",
        sectionType: "text",
        sectionValue: "Value 1",
      },
    ],
  };

  beforeEach(() => {
    mockOnSave.mockClear();
    mockHandleBack.mockClear();
    mockHandleAddSection.mockClear();
  });

  it("should render program edit form with correct title", () => {
    render(<ProgramManagementListEditField {...defaultProps} />);
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  it("should call handleBack when the back button is clicked", () => {
    render(<ProgramManagementListEditField {...defaultProps} />);

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockHandleBack).toHaveBeenCalled();
  });

  it("should show the Add Section button when showAddSection is true", () => {
    render(<ProgramManagementListEditField {...defaultProps} />);
    const addSectionButton = screen.getByTestId("add-section-button");
    expect(addSectionButton).toBeInTheDocument();
  });

  it("should call handleAddSection when Add Section button is clicked", () => {
    render(<ProgramManagementListEditField {...defaultProps} />);
    const addSectionButton = screen.getByTestId("add-section-button");
    fireEvent.click(addSectionButton);
    expect(mockHandleAddSection).toHaveBeenCalled();
  });

  it("should call onSave when the submit button is clicked", () => {
    render(<ProgramManagementListEditField {...defaultProps} />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("should not render edit button when editingSectionData is absent", async () => {
    render(
      <ProgramManagementListEditField
        {...defaultProps}
        editingSectionData={null}
      />
    );

    const editButton = screen.queryByTestId("edit-section-button");
    expect(editButton).toBeNull();
  });

  it("should call handleDeleteProgramSection when delete button is clicked", () => {
    render(
      <ProgramManagementListEditField
        {...defaultProps}
        sections={[{ sectionId: "1", sectionType: "text", sectionTitle: "Section 1", sectionData: [], sectionStatus: "available"}]}
      />
    );

    const deleteButton = screen.getByTestId("delete-section-button");
    fireEvent.click(deleteButton);
    expect(mockHandleDeleteProgramSection).toHaveBeenCalledWith("1");
  });

  it("should call handleRemoveSection when remove button is clicked", () => {
    render(
      <ProgramManagementListEditField
        {...defaultProps}
      />
    );

    const removeButton = screen.getByTestId("remove-section-button");
    fireEvent.click(removeButton);
    expect(mockHandleRemoveSection).toHaveBeenCalledWith(0);
  });

  it("should display the correct program type title based on atomProgramType", () => {
    render(
      <ProgramManagementListEditField
        {...defaultProps}
        sections={[{ sectionId: "1", sectionType: "text", sectionTitle: "Section 1", sectionData: [], sectionStatus: "available" }]}
      />
    );

    const title = screen.getByText(/Standard \(23-Day\) Program/i);
    expect(title).toBeInTheDocument();
  });
});
