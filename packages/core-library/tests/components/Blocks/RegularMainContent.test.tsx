import { render, screen } from "@testing-library/react";
import { RegularMainContent } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/RegularMainContent";
import { MainContentCollection } from "../../../api/types";

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
  const mockMainContent: MainContentCollection[] = [
    {
      id: "0c3f073a-a3e1-4639-badb-c6532d46c559",
      question: "<p>What are the colors in the French flag?</p>",
      clientNeeds: "Geography Knowledge",
      cognitiveLevel: "Basic",
      contentArea: "World Geography",
      mainContentAnswerCollections: [
        { id: "test1", answer: "Blue", answerKey: true },
        { id: "test2", answer: "White", answerKey: true },
        { id: "test3", answer: "Red", answerKey: true },
        { id: "test4", answer: "Green", answerKey: false },
        { id: "test5", answer: "Yellow", answerKey: false },
      ],
    },
  ];

  test("renders main content correctly", () => {
    render(<RegularMainContent mainContent={mockMainContent} />);

    expect(
      screen.getByText("What are the colors in the French flag?", {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Cognitive Level: Basic")).toBeInTheDocument();
    expect(
      screen.getByText("Content Area: World Geography")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Client Needs: Geography Knowledge")
    ).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
    expect(screen.getByText("Yellow")).toBeInTheDocument();
  });
});
