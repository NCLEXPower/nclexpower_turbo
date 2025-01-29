import { render, screen } from "../../../common";
import { Items } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/items";
import { QuestionnaireItem } from "../../../../system/app/internal/types";
import "@testing-library/jest-dom";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/DDCItem",
  () => ({
    DDCItem: jest.fn(() => <div>DDC Question Mock</div>),
  })
);

jest.mock("../../../../components", () => ({
  ParsedHtml: jest.fn(({ html }) => <div>{html}</div>),
}));

jest.mock("../../../../hooks", () => ({
  useStyle: jest.fn(() => ({
    wordWrap: { wordWrap: "break-word" },
  })),
}));

jest.mock(
  "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/BowtieSummary",
  () => ({
    BowtieSummary: jest.fn(() => <div>Bowtie Summary Mock</div>),
  })
);

describe("Items Component", () => {
  const mockContent: QuestionnaireItem[] = [
    {
      questionType: "DDC",
      itemStem: "What is the capital of France?",
      answers: [
        {
          answerKey: true,
          answer: "Paris",
          optionName: "",
          options: [],
        },
      ],
      transitionHeader: "Transition Header for DDC Question",
      maxPoints: 0,
      seqNum: 0,
      itemNum: 0,
      maxAnswer: undefined,
      leftLabelName: undefined,
      centerLabelName: undefined,
      rightLabelName: undefined,
      rightSection: undefined,
      centerSection: undefined,
      leftSection: undefined,
      hcpContent: undefined,
      dndAnswer: undefined
    },
    {
      questionType: "SATA",
      itemStem: "Sample SATA Question?",
      answers: [
        {
          answerKey: true,
          answer: "SATA Answer",
          optionName: "",
          options: [],
        },
        {
          answerKey: false,
          answer: "SATA Not Answer",
          optionName: "",
          options: [],
        },
      ],
      transitionHeader: "Transition Header for SATA Question",
      maxPoints: 0,
      seqNum: 0,
      itemNum: 0,
      maxAnswer: undefined,
      leftLabelName: undefined,
      centerLabelName: undefined,
      rightLabelName: undefined,
      rightSection: undefined,
      centerSection: undefined,
      leftSection: undefined,
      hcpContent: undefined,
      dndAnswer: undefined
    },
    {
      questionType: "BOWTIE",
      itemStem: "What is the correct answer?",
      answers: [
        {
          answerKey: true,
          answer: "Correct",
          optionName: "",
          options: [],
        },
      ],
      transitionHeader: "Transition Header for BOWTIE Question",
      maxPoints: 0,
      seqNum: 0,
      itemNum: 0,
      maxAnswer: undefined,
      leftLabelName: undefined,
      centerLabelName: undefined,
      rightLabelName: undefined,
      rightSection: undefined,
      centerSection: undefined,
      leftSection: undefined,
      hcpContent: undefined,
      dndAnswer: undefined
    },
    {
      questionType: "DND",
      itemStem: "A sample DND Question [[item1]] and [[item2]]",
      answers: [],
      transitionHeader: "Transition Header for SATA Question",
      maxPoints: 0,
      seqNum: 0,
      itemNum: 0,
      dndAnswer: [],
      centerLabelName: undefined,
      rightLabelName: undefined,
      rightSection: undefined,
      centerSection: undefined,
      leftSection: undefined,
      hcpContent: undefined,
      maxAnswer: undefined,
      leftLabelName: undefined
    },
    {
      questionType: "HCP",
      itemStem: "A sample DND Question [[item1]] and [[item2]]",
      answers: [
        {
          answer: "answet-key-tes",
          answerKey: false,
          attrName: 'test-attr',
        }
      ],
      transitionHeader: "Transition Header for SATA Question",
      maxPoints: 0,
      seqNum: 0,
      itemNum: 0,
      dndAnswer: [],
      centerLabelName: undefined,
      rightLabelName: undefined,
      rightSection: undefined,
      centerSection: undefined,
      leftSection: undefined,
      hcpContent: 'Sample HCP Content',
      maxAnswer: undefined,
      leftLabelName: undefined
    }
  ];

  it("renders items correctly when content is provided", () => {
    render(<Items content={mockContent} />);

    expect(screen.getByText("DDC Question Mock")).toBeInTheDocument();
    expect(screen.getByText("Sample SATA Question?")).toBeInTheDocument();
    expect(screen.getByText("Select All That Apply")).toBeInTheDocument();
    expect(screen.getByText("Bowtie Summary Mock")).toBeInTheDocument();
  });

  it('renders "No data available" when content is empty', () => {
    render(<Items content={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
