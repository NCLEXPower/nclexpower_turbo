import { render, screen } from "../../../common";
import { MCQNoGroup } from "../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQNoGroup/MCQNoGroup";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(() => ({
    watch: jest.fn(),
    control: jest.fn(),
    setValue: jest.fn(),
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

  it("should properly remove row table", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeRowTableButton = screen.getByTestId("remove-row");
    removeRowTableButton.click();
    expect(removeRowTableButton).toBeInTheDocument();
  });

  it("should properly remove column headers", () => {
    render(<MCQNoGroup questionIndex={1} />);
    const removeColumnHeadersButton = screen.getByTestId("remove-column-headers");
    removeColumnHeadersButton.click();
    expect(removeColumnHeadersButton).toBeInTheDocument();
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
});