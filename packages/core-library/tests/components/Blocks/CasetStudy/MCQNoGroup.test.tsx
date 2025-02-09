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
    expect(screen.getByTestId("remove-row-0")).toBeInTheDocument();
    expect(screen.getByTestId("remove-column-header-0")).toBeInTheDocument();
  });

  it("should disable remove row table button upon render", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeRowTableButton = screen.getByTestId("remove-row-0");
    expect(removeRowTableButton).toBeDisabled();
  });

  it("should disable remove column headers button upon render", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-header-0");
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

  it("should call handleRemoveColumnHeaders with the correct index", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-header-0");
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

  it("should call handleAppendRowTable and add a new row", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const appendRowTableButton = screen.getByTestId("append-row-table");
    fireEvent.click(appendRowTableButton);
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.rows",
      expect.arrayContaining([
        expect.objectContaining({
          rowTitle: "",
          rowId: expect.any(Number),
          choices: expect.any(Array),
        }),
      ])
    );
  });

  it("should call handleRemoveRow with the correct index", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeRowTableButton = screen.getByTestId("remove-row-0");
    fireEvent.click(removeRowTableButton);
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

  it("should initialize columns and rows if tableRowFields or columnHeaderFields are empty", () => {
    render(<MCQNoGroup questionIndex={1} />);
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.columns",
      Array(3).fill({ label: "" })
    );
    expect(setValueMock).toHaveBeenCalledWith(
      "questionnaires.1.rows",
      Array(1).fill({
        rowTitle: "",
        rowId: 0,
        choices: [
          { value: false, choiceId: 0 },
          { value: false, choiceId: 1 },
        ],
      })
    );
  });
});