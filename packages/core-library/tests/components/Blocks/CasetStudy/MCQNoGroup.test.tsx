import { render, screen, fireEvent } from "../../../common";
import { MCQNoGroup } from "../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQNoGroup/MCQNoGroup";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const setValueMock = jest.fn();

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(() => ({
    watch: jest.fn(),
    control: jest.fn(),
    setValue: setValueMock,
    getValues: jest.fn(),
  })),
  useFieldArray: jest.fn(() => ({
    append: jest.fn(),
    remove: jest.fn(),
  })),
}));

describe("MCQ No Group", () => {
  it("should render MCQ No Group", () => {
    render(<MCQNoGroup questionIndex={1} />);
  });

  it("should render properly all the buttons for creating MCQ No Group", () => {
    render(<MCQNoGroup questionIndex={1} />);
    expect(screen.getByTestId("append-row-table")).toBeInTheDocument();
    expect(screen.getByTestId("append-column-headers")).toBeInTheDocument();
    expect(screen.getByTestId("remove-row")).toBeInTheDocument();
    expect(screen.getByTestId("remove-column-headers")).toBeInTheDocument();
  });

  it("should properly append row table", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const appendRowTableButton = screen.getByTestId("append-row-table");
    appendRowTableButton.click();
    expect(appendRowTableButton).toBeInTheDocument();
  });

  it("should properly append column headers", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const appendColumnHeadersButton = screen.getByTestId("append-column-headers");
    appendColumnHeadersButton.click();
    expect(appendColumnHeadersButton).toBeInTheDocument();
  });

  it("should update the choices when column headers are removed", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-headers");
    removeColumnHeadersButton.click();
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.columns",
      [
        { label: "" },
        { label: "" },
        { label: "" },
      ]
    );
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.rows",
      [
        {
          rowTitle: "",
          rowId: 0,
          choices: [
            { value: false, choiceId: 0 },
            { value: false, choiceId: 1 },
          ],
        }
      ]
    );
  });

  it("should disable remove row table button upon render", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeRowTableButton = screen.getByTestId("remove-row");
    expect(removeRowTableButton).toBeDisabled();
  });

  it("should disable remove column headers button upon render", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-headers");
    expect(removeColumnHeadersButton).toBeDisabled();
  });

  it("should initialize columns and rows if they are empty", () => {
    render(<MCQNoGroup questionIndex={1} />);
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.columns", [{ "label": "" }, { "label": "" }, { "label": "" }]
    );
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.rows",
      [
        {
          rowTitle: "",
          rowId: 0,
          choices: [
            { value: false, choiceId: 0 },
            { value: false, choiceId: 1 },
          ],
        }
      ]
    );
  });

  it("should call handleRemoveColumnHeaders when remove column headers button is clicked", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-headers");
    removeColumnHeadersButton.click();
    expect(setValueMock).toHaveBeenCalled();
  });

  it("should call handleRemoveRow when remove row button is clicked", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeRowTableButton = screen.getByTestId("remove-row");
    removeRowTableButton.click();
    expect(setValueMock).toHaveBeenCalled();
  });

  it("should call handleRemoveColumnHeaders with the correct index", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-headers");
    fireEvent.click(removeColumnHeadersButton);
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.columns",
      [
        { label: "" },
        { label: "" },
        { label: "" },
      ]
    );
  });
});