import { render, screen } from "../../../common";
import {
  DDCItem,
  DDCQuestionProps,
} from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/DDCItem";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../../components/Textfield/SelectField/PlainSelectField",
  () => ({
    PlainSelectField: ({ options, defaultValue }: any) => (
      <select data-testid="select-field" defaultValue={defaultValue}>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ),
  })
);

jest.mock("../../../../components", () => ({
  ParsedHtml: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe("DDCItem Component", () => {
  const mockData: DDCQuestionProps["ddcData"] = {
    itemStem: "This is a question with a [[dropdown]].",
    answers: [
      {
        optionName: "dropdown",
        options: [
          { answer: "Option 1", answerKey: false },
          { answer: "Option 2", answerKey: true },
        ],
      },
    ],
  };

  it("renders dropdowns and text content correctly", () => {
    render(<DDCItem ddcData={mockData} />);

    expect(screen.getByText("This is a question with a")).toBeInTheDocument();

    const dropdown = screen.getByTestId("select-field");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue("Option 2");
  });

  it("renders correctly with multiple dropdowns", () => {
    const multiDropdownData: DDCQuestionProps["ddcData"] = {
      itemStem: "Choose [[dropdown1]] and [[dropdown2]].",
      answers: [
        {
          optionName: "dropdown1",
          options: [
            { answer: "Option A", answerKey: true },
            { answer: "Option B", answerKey: false },
          ],
        },
        {
          optionName: "dropdown2",
          options: [
            { answer: "Option X", answerKey: false },
            { answer: "Option Y", answerKey: true },
          ],
        },
      ],
    };

    render(<DDCItem ddcData={multiDropdownData} />);

    // Verify both dropdowns
    const dropdowns = screen.getAllByTestId("select-field");
    expect(dropdowns).toHaveLength(2);
    expect(dropdowns[0]).toHaveValue("Option A");
    expect(dropdowns[1]).toHaveValue("Option Y");
  });

  it("renders correctly with no answers", () => {
    const noAnswersData: DDCQuestionProps["ddcData"] = {
      itemStem: "This is a question with no answers.",
      answers: [],
    };

    render(<DDCItem ddcData={noAnswersData} />);

    // Verify the text content is rendered
    expect(
      screen.getByText("This is a question with no answers.")
    ).toBeInTheDocument();

    // Verify no dropdowns are rendered
    expect(screen.queryByTestId("select-field")).not.toBeInTheDocument();
  });
});
