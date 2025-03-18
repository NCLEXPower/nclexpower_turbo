/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../common";
import { ProgramManagementListCreateField } from "../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/blocks/create/ProgramManagementListCreateField";
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
  GenericSelectField: ({ onChange, options, label, name }: any) => (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
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

describe("ProgramManagementListCreateField", () => {
  const defaultProps = {
    onSave: mockOnSave,
    handleBack: mockHandleBack,
    fileName: "",
    programImage: [],
    control: mockUseForm().control,
    fields: [],
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
  };

  beforeEach(() => {
    mockOnSave.mockClear();
    mockHandleBack.mockClear();
    mockHandleAddSection.mockClear();
  });

  const originalCreateObjectURL = URL.createObjectURL;

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
  });

  afterAll(() => {
    global.URL.createObjectURL = originalCreateObjectURL;
  });

  it("should render program edit form with correct title", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
  });

  it("should call handleBack when the back button is clicked", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockHandleBack).toHaveBeenCalled();
  });

  it("should show the Add Section button when showAddSection is true", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);
    const addSectionButton = screen.getByTestId("add-section-button");
    expect(addSectionButton).toBeInTheDocument();
  });

  it("should call handleAddSection when Add Section button is clicked", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);
    const addSectionButton = screen.getByTestId("add-section-button");
    fireEvent.click(addSectionButton);
    expect(mockHandleAddSection).toHaveBeenCalled();
  });

  it("should call onSave when the submit button is clicked", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("should display program thumbnail", () => {
    const propsWithImage = {
      ...defaultProps,
      fileName: "test-image.png",
      programImage: [new File([], "test-image.png")],
    };

    render(<ProgramManagementListCreateField {...propsWithImage} />);
    const image = screen.getByAltText("program thumbnail");
    expect(image).toBeInTheDocument();
  });

  it("should display 'No sections available' message if fields are empty", () => {
    render(<ProgramManagementListCreateField {...defaultProps} />);
    expect(
      screen.getByText(/No sections available. Please add a section./i)
    ).toBeInTheDocument();
  });

  it("should call handleSectionChange when a section type is selected", () => {
    const propsWithFields = {
      ...defaultProps,
      fields: [{ id: "1", sectionTitle: "", sectionType: "", sectionValue: "" }],
      sectionList: [{ label: "Type1", value: "type1" }],
    };

    render(<ProgramManagementListCreateField {...propsWithFields} />);

    const select = screen.getByLabelText("Select Section Type");
    fireEvent.change(select, { target: { value: "type1" } });
    expect(mockHandleSectionChange).toHaveBeenCalledWith(0, "type1");
  });

});