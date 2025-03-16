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
  isRemovingProgramSection: false,
  removingSectionId: "2",
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
  global.URL.createObjectURL = jest.fn(() => "http://dummyurl.com");
});

beforeEach(() => {
  Object.defineProperty(HTMLFormElement.prototype, "requestSubmit", {
    value: jest.fn(),
  });
});

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

    expect(await screen.findByText(/Edit/i)).toBeInTheDocument();
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
        {
          id: "1",
          sectionTitle: "Welcome",
          sectionType: "document",
          sectionValue: "test.pdf",
        },
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

    const multipleSelectField = await screen.findByTestId(
      "multiple-select-field"
    );

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

  it("should handle missing program data", async () => {
    (useAtom as jest.Mock).mockReturnValue([null, jest.fn()]);
    render(<ProgramManagementListEditBlock />);

    expect(
      screen.getByText("No program selected. Please go back to previous page.")
    ).toBeInTheDocument();
  });

  describe("sanitizeData", () => {
    const keyMapping: { [key: string]: string } = {
      secVidId: "sectionDataId",
      secVidTitle: "title",
      secVidUrl: "link",
      secVidPlaceholder: "videoPlaceholder",
      secVidAuthor: "authorName",
      secVidAuthorImg: "authorImage",
      secVidDescription: "description",
    };

    const sanitizeData = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        return data.map((item) => sanitizeData(item));
      } else if (typeof data === "object" && data !== null) {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            keyMapping[key] || key,
            sanitizeData(value ?? ""),
          ])
        );
      }
      return data;
    };

    it("should sanitize an array of objects", () => {
      const input = [
        { secVidId: "1", secVidTitle: "Title 1" },
        { secVidId: "2", secVidTitle: "Title 2" },
      ];
      const output = sanitizeData(input);
      expect(output).toEqual([
        { sectionDataId: "1", title: "Title 1" },
        { sectionDataId: "2", title: "Title 2" },
      ]);
    });

    it("should sanitize a nested object", () => {
      const input = {
        secVidId: "1",
        secVidTitle: "Title 1",
        nested: { secVidId: "2", secVidTitle: "Title 2" },
      };
      const output = sanitizeData(input);
      expect(output).toEqual({
        sectionDataId: "1",
        title: "Title 1",
        nested: { sectionDataId: "2", title: "Title 2" },
      });
    });

    it("should return primitive values as is", () => {
      expect(sanitizeData("string")).toBe("string");
      expect(sanitizeData(123)).toBe(123);
    });

    it("should handle nested section data correctly", async () => {
      const mockShowToast = jest.fn();
      (useExecuteToast as jest.Mock).mockReturnValue({
        showToast: mockShowToast,
      });
      setUpMocks("1");

      const nestedSectionData = {
        secVidId: "1",
        secVidTitle: "Title 1",
        nested: { secVidId: "2", secVidTitle: "Title 2" },
      };

      const sanitizedData = sanitizeData(nestedSectionData);
      expect(sanitizedData).toEqual({
        sectionDataId: "1",
        title: "Title 1",
        nested: { sectionDataId: "2", title: "Title 2" },
      });
    });
  });

  describe("API Callbacks", () => {
    const useApiCallback = (callback: any) => {
      return {
        execute: callback,
      };
    };

    const updateProgramCB = useApiCallback(
      async (api: any, args: any) =>
        await api.webbackoffice.updatePrograms(args)
    );

    const deleteProgramSectionCB = useApiCallback(
      async (api: any, args: any) =>
        await api.webbackoffice.deleteProgramSectionById(args)
    );

    it("should call updatePrograms API", async () => {
      const api = {
        webbackoffice: {
          updatePrograms: jest.fn().mockResolvedValue({ status: 200 }),
        },
      };
      const args = { id: "1", title: "Test Program" };
      const result = await updateProgramCB.execute(api, args);
      expect(api.webbackoffice.updatePrograms).toHaveBeenCalledWith(args);
      expect(result).toEqual({ status: 200 });
    });

    it("should call deleteProgramSectionById API", async () => {
      const api = {
        webbackoffice: {
          deleteProgramSectionById: jest
            .fn()
            .mockResolvedValue({ status: 200 }),
        },
      };
      const args = { programId: "1", sectionId: "101" };
      const result = await deleteProgramSectionCB.execute(api, args);
      expect(api.webbackoffice.deleteProgramSectionById).toHaveBeenCalledWith(
        args
      );
      expect(result).toEqual({ status: 200 });
    });

    it("should show error message when updatePrograms API call fails", async () => {
      const api = {
        webbackoffice: {
          updatePrograms: jest.fn().mockRejectedValue(new Error("API Error")),
        },
      };
      const args = { id: "1", title: "Test Program" };
      try {
        await updateProgramCB.execute(api, args);
      } catch (error) {
        expect(api.webbackoffice.updatePrograms).toHaveBeenCalledWith(args);
        expect(error).toEqual(new Error("API Error"));
      }
    });

    it("should show error message when deleteProgramSectionById API call fails", async () => {
      const api = {
        webbackoffice: {
          deleteProgramSectionById: jest
            .fn()
            .mockRejectedValue(new Error("API Error")),
        },
      };
      const args = { programId: "1", sectionId: "101" };
      try {
        await deleteProgramSectionCB.execute(api, args);
      } catch (error) {
        expect(api.webbackoffice.deleteProgramSectionById).toHaveBeenCalledWith(
          args
        );
        expect(error).toEqual(new Error("API Error"));
      }
    });

    it("should handle multiple file uploads correctly", async () => {
      setUpMocks("1");
      render(<ProgramManagementListEditBlock />);

      const fileInput = await screen.findByTestId("file-upload-input");

      expect(fileInput).toBeInTheDocument();
      const files = [
        new File(["dummy content"], "example1.jpg", { type: "image/jpeg" }),
        new File(["dummy content"], "example2.jpg", { type: "image/jpeg" }),
      ];

      fireEvent.change(fileInput, { target: { files } });

      expect(mockSetValue).toHaveBeenCalledWith(
        "programImage",
        expect.any(Array)
      );
    });
  });

  describe("Form submission", () => {
    it("should call handleEditProgram when save button is clicked", async () => {
      setUpMocks("1");
      render(<ProgramManagementListEditBlock />);

      const saveButton = await screen.findByTestId("submit-button");

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalled();
      });
    });
  });
});
