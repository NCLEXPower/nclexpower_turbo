import { render, screen } from "../../../common";
import {
  DDTItem,
  DDTQuestionProps,
} from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/DDTItem";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("DDTItem Component", () => {
  const mockData: DDTQuestionProps["ddcData"] = {
    itemStem: `
      <p>This is a paragraph.</p>
      <table>
        <tr>
          <td>[[dropdown1]]</td>
          <td>[[dropdown2]]</td>
        </tr>
      </table>
    `,
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
          { answer: "Option C", answerKey: false },
          { answer: "Option D", answerKey: true },
        ],
      },
    ],
  };

  it("renders non-table content correctly", () => {
    render(<DDTItem ddcData={mockData} />);
    expect(screen.getByText("This is a paragraph.")).toBeInTheDocument();
  });

  it("renders table content with dropdowns correctly", () => {
    render(<DDTItem ddcData={mockData} />);

    const dropdowns = screen.getAllByRole("combobox");
    expect(dropdowns).toHaveLength(2);

    expect(
      screen.getByRole("option", { name: "Option A" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option D" })
    ).toBeInTheDocument();
  });

  it("renders 'No Content Available' for unmatched dropdowns", () => {
    const dataWithNoMatch = {
      ...mockData,
      answers: [],
    };

    render(<DDTItem ddcData={dataWithNoMatch} />);
    expect(screen.getAllByText("No Content Available")).toHaveLength(2);
  });
});
