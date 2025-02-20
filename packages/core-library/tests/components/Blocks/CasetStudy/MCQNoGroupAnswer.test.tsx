import { render, screen, fireEvent, waitFor } from "../../../common";
import { Control } from "react-hook-form";
import { MCQNoGroupAnswer } from "../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQNoGroup/components/MCQNoGroupAnswer";
import { ContainedCaseStudyQuestionType } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

jest.mock("../../../../components", () => ({
  ControlledTextField: jest.fn(() => <input />),
  TextField: jest.fn(() => <input />),
  EvaIcon: jest.fn(() => <div />),
  Button: jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
  ControlledCheckbox: jest.fn(({ onChange, name, control, defaultValue, ...props }) => (
    <input
      type="checkbox"
      onChange={(e) => {
        onChange && onChange({
          target: {
            checked: e.target.checked,
            name: name
          }
        });
      }}
      name={name}
      {...props}
    />
  )),
}));

jest.mock("../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQGroup/components/MCQColumnComponent", () => ({
  ColumnComponent: jest.fn(() => <div />),
}));

jest.mock("react-hook-form", () => ({
  Control: jest.fn(() => <div />),
}));

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const setValueMock = jest.fn();

const defaultProps = {
  questionIndex: 1,
  handleAppendRowTable: jest.fn(),
  disableAppendRow: false,
  handleAppendColumnHeaders: jest.fn(),
  handleRemoveRow: jest.fn(),
  handleRemoveColumnHeaders: jest.fn(),
  columnHeaderFields: [{ label: "Column Header" }, { label: "Header 1" }, { label: "Header 2" }, { label: "Header 3" }],
  control: {} as Control<ContainedCaseStudyQuestionType>,
  tableRowFields: [
    {
      rowId: 0,
      rowTitle: "Row 1",
      choices: [{ choiceId: 0, value: false }, { choiceId: 1, value: true }],
    },
  ],
  setValue: setValueMock,
  disableRemoveRow: false,
  disableRemoveColumnHeaders: false,
};

describe("MCQNoGroupAnswer", () => {
  it("should render MCQNoGroupAnswer", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
  });

  it("should render all buttons", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    expect(screen.getByTestId("append-column-headers")).toBeInTheDocument();
    expect(screen.getByTestId("append-row-table")).toBeInTheDocument();
    expect(screen.getByTestId("remove-column-header-4")).toBeInTheDocument();
    expect(screen.getByTestId("remove-row-1")).toBeInTheDocument();
  });

  it("should call handleAppendColumnHeaders when Add Column button is clicked", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    fireEvent.click(screen.getByTestId("append-column-headers"));
    expect(defaultProps.handleAppendColumnHeaders).toHaveBeenCalled();
  });

  it("should call handleAppendRowTable when Add Row button is clicked", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    fireEvent.click(screen.getByTestId("append-row-table"));
    expect(defaultProps.handleAppendRowTable).toHaveBeenCalled();
  });

  it("should call handleRemoveColumnHeaders when Remove Column button is clicked", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    fireEvent.click(screen.getByTestId("remove-column-header-4"));
    expect(defaultProps.handleRemoveColumnHeaders).toHaveBeenCalledWith(3);
  });

  it("should call handleRemoveRow when Remove Row button is clicked", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    fireEvent.click(screen.getByTestId("remove-row-1"));
    expect(defaultProps.handleRemoveRow).toHaveBeenCalledWith(0);
  });

  it("should render column headers in the choices", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    expect(screen.queryByText('Column Header')).not.toBeInTheDocument();
  });

  it("should call handleRemoveColumnHeaders with the correct index", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    fireEvent.click(screen.getByTestId("remove-column-header-4"));
    expect(defaultProps.handleRemoveColumnHeaders).toHaveBeenCalledWith(3);
  });

  it("should render ControlledCheckbox components for each table row", () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("should handle onChange on selected value to be true", async () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    const checkboxes = await screen.findAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);

    await waitFor(() => {
      expect(setValueMock).toHaveBeenCalledWith(
        "questionnaires.1.rows.0.choices.0.value",
        true
      );
    });
  });

  it("should call setValue with correct values when another checkbox is clicked", async () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    const checkboxes = await screen.findAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    await waitFor(() => {
      expect(setValueMock).toHaveBeenCalledWith("questionnaires.1.rows.0.choices.0.value", false);
      expect(setValueMock).toHaveBeenCalledWith("questionnaires.1.rows.0.choices.1.value", true);
    });
  });

  it("should call setValue with correct values when checkbox is clicked", async () => {
    render(<MCQNoGroupAnswer {...defaultProps} />);
    const checkboxes = await screen.findAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);

    await waitFor(() => {
      expect(setValueMock).toHaveBeenCalledWith("questionnaires.1.rows.0.choices.0.value", true);
      expect(setValueMock).toHaveBeenCalledWith("questionnaires.1.rows.0.choices.1.value", false);
    });
  });
});