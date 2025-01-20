import { render, screen } from "../../../common";
import { QuestionnaireItem } from "../../../../system/app/internal/types";
import { MCQNoGroupSummary } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/MCQNoGroupSummary";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockData: Partial<QuestionnaireItem> = {
  columns: [
    { label: "Column 1" },
    { label: "Column 2" },
    { label: "Column 3" },
    { label: "Column 4" }
  ],
  rows: [
    {
      rowId: 1,
      rowTitle: "Row 1",
      choices: [
        {
          choiceId: 1,
          value: false
        },
        {
          choiceId: 2,
          value: true
        }
      ]
    },
    {
      rowId: 2,
      rowTitle: "Row 2",
      choices: [
        {
          choiceId: 1,
          value: true
        },
        {
          choiceId: 2,
          value: false
        }
      ]
    }
  ]
};

describe("MCQ No Group Summary", () => {
  it("should render MCQ No Group Summary", () => {
    render(<MCQNoGroupSummary data={mockData} />);
  });

  it("should display the proper columns", () => {
    render(<MCQNoGroupSummary data={mockData} />);

    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Column 2")).toBeInTheDocument();
    expect(screen.getByText("Column 3")).toBeInTheDocument();
    expect(screen.getByText("Column 4")).toBeInTheDocument();
  });

  it("should display the proper rows", () => {
    render(<MCQNoGroupSummary data={mockData} />);

    expect(screen.getByText("Row 1")).toBeInTheDocument();
    expect(screen.getByText("Row 2")).toBeInTheDocument();
  });

  it("should display a text of no available data when data is not available", () => {
    render(<MCQNoGroupSummary data={{ columns: [], rows: [] }} />);

    expect(screen.queryByText("Column 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Row 1")).not.toBeInTheDocument();

  });
});