import { render, screen } from "@testing-library/react";
import { MainContent } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/RegularMainContent";
import { ParsedHtml } from "../../../components";

jest.mock("../../../hooks", () => ({
  useSanitizedInputs: jest.fn(() => ({ purifyInputs: jest.fn() })),
}));

jest.mock("../../../components", () => ({
  ParsedHtml: jest.fn(({ html }) => <div>{html}</div>),
}));

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

describe("MainContent Component", () => {
  const mockMainContent = [
    {
      id: "1",
      main_type: "Type A",
      type: "Category X",
      question: "<p>Sample Question?</p>",
      cognitiveLevel: "Medium",
      contentArea: "Science",
      clientNeeds: "Knowledge Acquisition",
      mainContentAnswerCollections: [
        {
          answers: [
            { answer: "Answer 1", answerKey: true },
            { answer: "Answer 2", answerKey: false },
          ],
        },
      ],
    },
  ];

  test("renders main content correctly", () => {
    render(<MainContent mainContent={mockMainContent} />);

    expect(
      screen.getByText("Sample Question?", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("Cognitive Level: Medium")).toBeInTheDocument();
    expect(screen.getByText("Content Area: Science")).toBeInTheDocument();
    expect(
      screen.getByText("Client Needs: Knowledge Acquisition")
    ).toBeInTheDocument();
    expect(screen.getByText("Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Answer 2")).toBeInTheDocument();
  });
});
