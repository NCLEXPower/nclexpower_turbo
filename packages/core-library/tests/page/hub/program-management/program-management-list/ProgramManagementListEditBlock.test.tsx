import { fireEvent, render, screen, waitFor } from "../../../../common";
import { ProgramManagementListEditBlock } from "../../../../../system/app/internal/blocks";
import { useAtom } from "jotai";
import { StaticImageData } from "next/image";
import { useRouter } from "../../../../../core";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { ProgramManagementListEditField } from "../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/blocks/edit/ProgramManagementListEditField";
import axios from 'axios';

jest.mock(
  "../../../../../core/utils/contants/wc/programs/ProgramListData",
  () => ({
    standardProgramManagementList: [
      {
        id: "1",
        title: "Welcome to the Program",
        programStatus: "available",
        programImage: {} as StaticImageData,
        sections: [],
      },
    ],
  })
);

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

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'http://dummyurl.com');
});

describe("ProgramManagementListEditBlock", () => {
  let mockHandleSubmit: jest.Mock;
  let mockSetValue: jest.Mock;
  let mockAppend: jest.Mock;
  let mockHandleAddSection: jest.Mock;
  let mockHandleEditProgramSection: jest.Mock;

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
    formState: { errors: {} },
  });

  (useFieldArray as jest.Mock).mockReturnValue({
    fields: [],
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

  it("renders the 'No program selected' message when no valid program is found", () => {
    setUpMocks("999");
    render(<ProgramManagementListEditBlock />);
    expect(
      screen.getByText("No program selected. Please go back to previous page.")
    ).toBeInTheDocument();
  });

  it("should show Add section when showAddSection is true", async () => {
    setUpMocks("1");

    render(<ProgramManagementListEditField {...defaultProps} />);

    const addSectionButton = await screen.findByTestId("add-section-button");
    expect(addSectionButton).toBeInTheDocument();
  });
});
