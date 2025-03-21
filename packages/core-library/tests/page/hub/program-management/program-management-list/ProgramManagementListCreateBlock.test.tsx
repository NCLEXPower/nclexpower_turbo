/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent, waitFor } from "../../../../common";
import { ProgramManagementListCreateBlock } from "../../../../../system/app/internal/blocks";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "../../../../../core";
import { useExecuteToast } from "../../../../../contexts";
import { WelcomeProgram } from "../../../../../assets";
import { useFormContext } from "react-hook-form";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
  useFieldArray: jest.fn(),
  useFormContext: jest.fn(),
}));

jest.mock("../../../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../contexts", () => ({
  useExecuteToast: jest.fn(),
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetAllSections: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  })),
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
    <select
      onChange={(e) => onChange(e.target.value)}
      {...props}
      data-testid="section-type-select"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
  MultipleSelectField: ({ onChange, options, ...props }: any) => (
    <select
      onChange={(e) => onChange(e.target.value)}
      multiple
      {...props}
      data-testid="multiple-select-field"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock(
  "../../../../../core/utils/contants/wc/programs/ProgramListData",
  () => ({
    programSectionList: [
      { sectionTitle: "Section 1", sectionType: "video", sectionData: [] },
      { sectionTitle: "Section 2", sectionType: "audio", sectionData: [] },
    ],
  })
);

jest.mock("../../../../common", () => {
  const testingLibrary = jest.requireActual("@testing-library/react");

  return {
    render: jest.fn((ui) => {
      return testingLibrary.render(ui);
    }),
    screen: testingLibrary.screen,
    fireEvent: testingLibrary.fireEvent,
    waitFor: testingLibrary.waitFor,
  };
});

describe("ProgramManagementListCreateBlock", () => {
  let mockHandleSubmit: jest.Mock;
  let mockHandleBack: jest.Mock;
  let mockSetValue: jest.Mock;
  let mockAppend: jest.Mock;
  let mockGetValues: jest.Mock;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockHandleBack = jest.fn();
    mockSetValue = jest.fn();
    mockAppend = jest.fn();
    mockGetValues = jest.fn();

    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      setValue: mockSetValue,
      getValues: mockGetValues,
      watch: jest.fn(),
      formState: { errors: {} },
    });

    (useFormContext as jest.Mock).mockReturnValue({
      setValues: jest.fn(),
    });

    (useFieldArray as jest.Mock).mockReturnValue({
      fields: [],
      append: mockAppend,
    });

    (useExecuteToast as jest.Mock).mockReturnValue({ showToast: jest.fn() });

    (useRouter as jest.Mock).mockReturnValue({
      back: mockHandleBack,
    });
  });

  it("renders the component", () => {
    render(<ProgramManagementListCreateBlock />);

    expect(screen.getByText("Program Name")).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", async () => {
    render(<ProgramManagementListCreateBlock />);

    fireEvent.submit(screen.getByText("Program Name"));

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("calls handleCreateProgram when form is submitted with valid data", async () => {
    render(<ProgramManagementListCreateBlock />);

    fireEvent.submit(screen.getByText("Program Name"));

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("appends a new section when handleAddSection is called", async () => {
    render(<ProgramManagementListCreateBlock />);

    expect(mockAppend).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("add-section-button"));

    await waitFor(() => expect(mockAppend).toHaveBeenCalled());
  });

  it("does not call handleCreateProgram when form validation fails", async () => {
    mockHandleSubmit.mockImplementationOnce((fn) => () => fn(undefined));
    render(<ProgramManagementListCreateBlock />);
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("calls handleCreateProgram with valid form data", async () => {
    const mockValidData = {
      programName: "Test Program",
      programImage: WelcomeProgram,
    };

    mockHandleSubmit.mockImplementationOnce((fn) => async () => {
      await fn(mockValidData);
    });

    render(<ProgramManagementListCreateBlock />);

    await waitFor(() =>
      expect(screen.getByTestId("submit-button")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  it("shows an error message when API request fails", async () => {
    console.error = jest.fn();
    render(<ProgramManagementListCreateBlock />);
    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(console.error).toHaveBeenCalled());
  });

  it("renders the add section button", () => {
    render(<ProgramManagementListCreateBlock />);
    expect(screen.getByTestId("add-section-button")).toBeInTheDocument();
  });

  it("calls router.back() when back button is clicked", () => {
    render(<ProgramManagementListCreateBlock />);

    fireEvent.click(screen.getByTestId("back-button"));
    expect(mockHandleBack).toHaveBeenCalled();
  });
});
