import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ProgramManagementListEditBlock } from "../../../../../system/app/internal/blocks";
import { useAtom } from "jotai";
import { StaticImageData } from "next/image";
import { useRouter } from "../../../../../core";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { ProgramManagementListEditField } from "../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/blocks/edit/ProgramManagementListEditField";
import { useExecuteToast } from "../../../../../contexts";

jest.mock("../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetAllProgramsByType: jest.fn(() => ({
      data: [
        {
          id: "1",
          title: "Welcome to the Program",
          programStatus: "available",
          programImage: {} as StaticImageData,
          sections: [],
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
    businessQueryGetAllSections: jest.fn(() => ({
      data: [
        {
          sectionId: "101",
          sectionType: "video",
          sectionTitle: "Introduction Video",
          sectionData: [
            {
              sectionDataId: "201",
              title: "Getting Started",
              link: "https://example.com",
              contentArea: "Overview",
              catSimulator: "Simulator A",
              contentAreaCoverage: ["Topic 1", "Topic 2"],
              guided: "Yes",
              unguided: "No",
              practice: "Optional",
              authorName: "John Doe",
              authorImage: "https://example.com/john-doe.jpg",
              videoPlaceholder: "https://example.com/video-placeholder.jpg",
              description: "An introduction to the program",
              cards: [
                {
                  cardId: "301",
                  cardTopic: "Module 1",
                  cardFaces: "Front & Back",
                },
                {
                  cardId: "302",
                  cardTopic: "Module 2",
                  cardFaces: "Single Side",
                },
              ],
            },
          ],
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
  })),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
  useFieldArray: jest.fn(),
}));

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
  FileUploadField: ({ onUpload, ...props }: any) => (
    <input type="file" onChange={(e) => onUpload(e.target.files)} {...props} />
  ),
  GenericSelectField: ({ onChange, options, ...props }: any) => (
    <select onChange={(e) => onChange(e.target.value)} {...props} data-testid="section-type-select">
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
  MultipleSelectField: ({ onChange, options, ...props }: any) => (
    <select onChange={(e) => onChange(e.target.value)} multiple {...props} data-testid="multiple-select-field">
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

const mockBack = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  back: mockBack,
});

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

const defaultProps = {
  onSave: mockOnSave,
  handleBack: mockHandleBack,
  fileName: "",
  programImage: [],
  control: mockUseForm().control,
  fields: [
    {
      id: "1",
      sectionTitle: "Section 1",
      sectionType: "video",
      sectionValue: "Value 1",
    },
  ],
  sectionList: [
    { label: "Video", value: "video" },
    { label: "Document", value: "document" },
  ],
  handleSectionChange: mockHandleSectionChange,
  handleAddSection: mockHandleAddSection,
  filteredSectionValuesList: () => [{ label: "Topic 1", value: "topic1" }],
  handleMultipleSelectChange: mockHandleMultipleSelectChange,
  selectedSections: { 0: "video" },
  setValue: mockSetValue,
  showAddSection: true,
  sections: [],
  editingSectionId: null,
  editingSectionData: null,
  handleEditProgramSection: mockHandleEditProgramSection,
  handleDeleteProgramSection: mockHandleDeleteProgramSection,
  handleRemoveSection: mockHandleRemoveSection,
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'http://dummyurl.com');
});

beforeEach(() => {
  Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
    value: jest.fn(),
  });
})

describe("ProgramManagementListEditBlock", () => {
  let mockHandleSubmit: jest.Mock;
  let mockSetValue: jest.Mock;
  let mockAppend: jest.Mock;
  let mockHandleAddSection: jest.Mock;
  let mockHandleEditProgramSection: jest.Mock;
  let mockOnSave: jest.Mock;

  mockOnSave = jest.fn();
  mockHandleAddSection = jest.fn();
  mockHandleSubmit = jest.fn();
  mockSetValue = jest.fn();
  mockAppend = jest.fn();
  mockHandleEditProgramSection = jest.fn();

  (useForm as jest.Mock).mockReturnValue({
    control: {},
    handleSubmit: mockHandleSubmit,
    handleAddSection: mockHandleAddSection,
    handleEditProgramSection: mockHandleEditProgramSection,
    setValue: mockSetValue,
    getValues: jest.fn(),
    watch: jest.fn(),
    reset: jest.fn(),
    formState: { errors: {} },
  });

  (useExecuteToast as jest.Mock).mockReturnValue({ showToast: jest.fn() });

  (useFieldArray as jest.Mock).mockReturnValue({
    fields: [
      {
        id: "1",
        sectionTitle: "Section 1",
        sectionType: "video",
        sectionValue: "Value 1",
      },
    ],
    append: mockAppend,
  });

  const setUpMocks = (programId: string = "1") => {
    (useAtom as jest.Mock).mockReturnValue([programId, jest.fn()]);
  };

  beforeEach(() => {
    setUpMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render the 'No program selected' message when a valid program is found", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    expect(
      screen.queryByText(
        "No program selected. Please go back to previous page."
      )
    ).not.toBeInTheDocument();

    expect(await screen.findByText("Edit Program")).toBeInTheDocument();
  });

  it("should render the form with program thumbnail and details", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditBlock />);

    expect(await screen.getByText("Program Thumbnail")).toBeInTheDocument();
    expect(await screen.getByText("Program Details")).toBeInTheDocument();
    expect(await screen.getByText("Program Name")).toBeInTheDocument();
  });

  it("should call handleBack when back button is clicked", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditBlock />);

    const backButton = await screen.findByTestId("back-button");

    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("renders the 'No program selected' message when no valid program is found", () => {
    setUpMocks("999");
    render(<ProgramManagementListEditBlock />);
    expect(
      screen.getByText("No program selected. Please go back to previous page.")
    ).toBeInTheDocument();
  });

  it("should call onSave when the Update button is clicked", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditBlock />);

    const submitButton = await screen.findByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("should call onUpload when a file is selected", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const fileInput = await screen.findByTestId("file-upload-input");

    expect(fileInput).toBeInTheDocument();
    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetValue).toHaveBeenCalledWith(
      "programImage",
      expect.any(Array)
    );
  });

  it("should show Add section when showAddSection is true", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditField {...defaultProps} />);

    const addSectionButton = await screen.findByTestId("add-section-button");
    expect(addSectionButton).toBeInTheDocument();
  });

  it("should render input fields correctly", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    expect(await screen.getByText("Program Name")).toBeInTheDocument();
  });

  it("should add a new section when Add Section button is clicked", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const addButton = await screen.findByTestId("add-section-button");

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    await waitFor(() => expect(mockAppend).toHaveBeenCalled());
  });

  it("should remove a new section when delete section button is clicked", async () => {
    setUpMocks("1");

    (useFieldArray as jest.Mock).mockReturnValue({
      fields: [
        { id: "1", sectionTitle: "Welcome", sectionType: "document", sectionValue: "test.pdf" },
      ],
      append: mockAppend,
      remove: mockHandleRemoveSection,
    });

    render(<ProgramManagementListEditBlock />);

    const addButton = await screen.findByTestId("add-section-button");

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const removeButton = await screen.findByTestId("remove-section-button");
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(mockHandleRemoveSection).toHaveBeenCalledWith(0);
  });

  it("should call handleRemoveSection when remove button is clicked", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const addButton = await screen.findByTestId("add-section-button");

    fireEvent.click(addButton);

    await waitFor(() => {
      const removeButton = screen.getByTestId("remove-section-button");
      expect(removeButton).toBeInTheDocument();
      fireEvent.click(removeButton);
    });

    expect(mockHandleRemoveSection).toHaveBeenCalledWith(0);
  });

  it("should display section type select field", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const sectionTypeSelect = await screen.findByTestId("section-type-select");

    expect(sectionTypeSelect).toBeInTheDocument();
  });

  it("should display multiple select field when section type is video", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const sectionTypeSelect = await screen.findByTestId("section-type-select");

    fireEvent.change(sectionTypeSelect, { target: { value: "video" } });

    const multipleSelectField = await screen.findByTestId("multiple-select-field");

    expect(multipleSelectField).toBeInTheDocument();
  });

  it("should handle section change correctly", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const sectionTypeSelect = await screen.findByTestId("section-type-select");

    fireEvent.change(sectionTypeSelect, { target: { value: "document" } });

    expect(mockSetValue).toHaveBeenCalledWith("sections.0.sectionValue", "");
  });

  it("should call handleEditProgram when form is submitted", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    const submitButton = await screen.findByTestId("submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("should initialize the form with correct default values", async () => {
    setUpMocks("1");
    render(<ProgramManagementListEditBlock />);

    await waitFor(() => {
      const programNameInput = screen.getByLabelText("Program Name");
      expect(programNameInput).toHaveValue("Welcome to the Program");
    });
  });
});