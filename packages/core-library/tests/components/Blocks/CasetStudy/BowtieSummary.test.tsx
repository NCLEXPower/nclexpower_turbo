import { render, screen } from "../../../common";
import { BowtieSummary } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/BowtieSummary";
import { useOrganizeSections } from "../../../../hooks";
import {
  QuestionnaireItem,
  BowtieItemType,
} from "../../../../system/app/internal/types";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../hooks", () => ({
  useOrganizeSections: jest.fn(),
}));

describe("BowtieSummary Component", () => {
  it("should render BowtieSummary", () => {
    const mockData: Partial<QuestionnaireItem> = {
      leftSection: [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
      ],
      centerSection: [
        { isAnswer: true, value: "C", container: "2" },
        { isAnswer: false, value: "D", container: "2" },
      ],
      rightSection: [
        { isAnswer: true, value: "E", container: "3" },
        { isAnswer: false, value: "F", container: "3" },
      ],
      leftLabelName: "Left Label",
      centerLabelName: "Center Label",
      rightLabelName: "Right Label",
    };

    (useOrganizeSections as jest.Mock).mockReturnValue([
      {
        correct: [{ isAnswer: true, value: "A", container: "1" }],
        incorrect: [{ isAnswer: false, value: "B", container: "1" }],
      },
      {
        correct: [{ isAnswer: true, value: "C", container: "2" }],
        incorrect: [{ isAnswer: false, value: "D", container: "2" }],
      },
      {
        correct: [{ isAnswer: true, value: "E", container: "3" }],
        incorrect: [{ isAnswer: false, value: "F", container: "3" }],
      },
    ]);

    render(<BowtieSummary data={mockData} />);

    expect(screen.getByTestId("bowtie-summary-id")).toBeInTheDocument();
  });

  it("should display nothing if no data is passed", () => {
    render(<BowtieSummary data={{}} />);

    // Ensure no items are rendered
    expect(screen.queryByText("Left Label")).not.toBeInTheDocument();
    expect(screen.queryByText("Center Label")).not.toBeInTheDocument();
    expect(screen.queryByText("Right Label")).not.toBeInTheDocument();
  });
});
