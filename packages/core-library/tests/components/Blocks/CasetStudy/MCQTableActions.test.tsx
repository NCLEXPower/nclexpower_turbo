import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { MCQTableActions } from "../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQGroup/components/MCQTableActions";
import { render, renderHook, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFieldArray: jest.fn(),
  useFormContext: jest.fn(),
}));

describe("MCQTableActions", () => {
  const mockColumnField = [
    { label: "Client Findings" },
    { label: "Pneumonia" },
    { label: "Urinary Tract Infection" },
    { label: "Influenza" },
  ];
  const mockRowField = [
    {
      rowTitle: "fever",
      rowId: 0,
      choices: [
        { value: true, choiceId: 0 },
        { value: false, choiceId: 1 },
        { value: false, choiceId: 2 },
      ],
    },
    {
      rowTitle: "confusion",
      rowId: 2,
      choices: [
        { value: false, choiceId: 0 },
        { value: true, choiceId: 1 },
        { value: false, choiceId: 2 },
      ],
    },
    {
      rowTitle: "body soreness",
      rowId: 3,
      choices: [
        { value: false, choiceId: 0 },
        { value: false, choiceId: 1 },
        { value: true, choiceId: 2 },
      ],
    },
    {
      rowTitle: "cough and sputum",
      rowId: 4,
      choices: [
        { value: true, choiceId: 0 },
        { value: true, choiceId: 1 },
        { value: false, choiceId: 2 },
      ],
    },
    {
      rowTitle: "shortness of breath",
      rowId: 5,
      choices: [
        { value: false, choiceId: 0 },
        { value: true, choiceId: 1 },
        { value: true, choiceId: 2 },
      ],
    },
  ];

  const mockFn = jest.fn();
  const mockQuestionIndex = 1;

  const mockSetValue = jest.fn();
  const mockRowAppend = jest.fn();
  const mockColumnAppend = jest.fn();
  const mockRowRemove = jest.fn();
  const mockColumnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
    });

    (useFieldArray as jest.Mock).mockReturnValue(({ name }: any) => {
      if (name.includes("columns")) {
        return {
          append: mockColumnAppend,
          remove: mockColumnRemove,
        };
      } else if (name.includes("rows")) {
        return {
          append: mockRowAppend,
          remove: mockRowRemove,
        };
      }
      return {};
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockButtonFunctions = [
    {
      action: "add",
      count: mockColumnField.length,
      setCount: mockFn,
      limit: 2,
      label: "Add Column",
      type: "column",
    },
    {
      action: "add",
      count: mockRowField.length,
      setCount: mockFn,
      limit: 1,
      label: "Add Row",
      type: "row",
    },
    {
      action: "remove",
      count: mockRowField.length,
      setCount: mockFn,
      limit: 1,
      label: "Delete Row",
      type: "row",
    },
    {
      action: "remove",
      count: mockColumnField.length,
      setCount: mockFn,
      limit: 3,
      label: "Delete Column",
      type: "column",
    },
  ];

  it("should render MCQTableActions multiple buttons", () => {
    const { result } = renderHook(() => useForm());
    const form = result.current;
    render(
      <FormProvider {...form}>
        <MCQTableActions
          ColumnField={mockColumnField}
          RowField={mockRowField}
          questionIndex={1}
        />
      </FormProvider>
    );

    const buttons = screen.getAllByTestId("table-action-id");
    expect(buttons).toHaveLength(mockButtonFunctions.length);

    mockButtonFunctions.forEach((button, index) => {
      expect(buttons[index]).toBeInTheDocument();
    });
  });

  it("renders buttons correctly", () => {
    render(
      <MCQTableActions
        RowField={mockRowField}
        ColumnField={mockColumnField}
        questionIndex={mockQuestionIndex}
      />
    );

    expect(screen.getByText("Add Column")).toBeInTheDocument();
    expect(screen.getByText("Add Row")).toBeInTheDocument();
    expect(screen.getByText("Delete Row")).toBeInTheDocument();
    expect(screen.getByText("Delete Column")).toBeInTheDocument();
  });

  it("disables 'Delete Row' button when RowField count is less than or equal to the limit", () => {
    render(
      <MCQTableActions
        RowField={[]}
        ColumnField={mockColumnField}
        questionIndex={mockQuestionIndex}
      />
    );

    const deleteRowButton = screen.getByText("Delete Row");
    expect(deleteRowButton).toBeDisabled();
  });

  it("disables 'Delete Column' button when ColumnField count is less than or equal to the limit", () => {
    render(
      <MCQTableActions
        RowField={mockRowField}
        ColumnField={[]}
        questionIndex={mockQuestionIndex}
      />
    );

    const deleteColumnButton = screen.getByText("Delete Column");
    expect(deleteColumnButton).toBeDisabled();
  });
});
