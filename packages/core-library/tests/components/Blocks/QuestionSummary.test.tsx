import { fireEvent, screen, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { QuestionSummary } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/regular/QuestionSummary";
import { SummaryAccordion } from "../../../components";
import ConfirmationModal from "../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { usePageLoaderContext } from "../../../contexts/PageLoaderContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../contents/theme/theme";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../components/blocks/Accordion/SummaryAccordionContent",
  () => ({
    SummaryAccordionContent: ({
      clientNeeds,
      cognitiveLevel,
      contentArea,
      answers,
      type,
      index,
    }: any) => (
      <div data-testid={`summary-content-${index}`}>
        {clientNeeds}, {cognitiveLevel}, {contentArea},{" "}
        {answers.map((a: any) => a.answer)}
      </div>
    ),
  })
);

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn().mockReturnValue({
    businessQueryCreateRegularQuestion: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
      isLoading: false,
    }),
  }),
}));

jest.mock("../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn().mockReturnValue({
    contentLoader: false,
    setContentLoader: jest.fn(),
  }),
}));

describe("QuestionSummary Component", () => {
  const mockNextStep = jest.fn();
  const mockPreviousStep = jest.fn();
  const mockNext = jest.fn();
  const mockReset = jest.fn();
  const mockPrevious = jest.fn();

  const mockData = [
    {
      answers: [
        {
          answer: "Answer 1",
          answerKey: false,
        },
        {
          answer: "Answer 2",
          answerKey: true,
        },
      ],
      question: "<p>Sample Question 1</p>",
      contentArea: "Content Area 1",
      clientNeeds: "Client Needs 1",
      cognitiveLevel: "Cognitive Level 1",
    },
    {
      answers: [
        {
          answer: "Answer 1",
          answerKey: false,
        },
        {
          answer: "Answer 2",
          answerKey: true,
        },
      ],
      question: "<p>Sample Question 2</p>",
      contentArea: "Content Area 2",
      clientNeeds: "Client Needs 2",
      cognitiveLevel: "Cognitive Level 2",
    },
    {
      answers: [
        {
          answer: "Answer 1",
          answerKey: false,
        },
        {
          answer: "Answer 2",
          answerKey: true,
        },
      ],
      question: "<p>Sample Question 3</p>",
      contentArea: "Content Area 3",
      clientNeeds: "Client Needs 3",
      cognitiveLevel: "Cognitive Level 3",
    },
  ];

  const DEFAULT_PROPS = {
    customButton: <>test</>,
    dialogContent: "test",
  };

  const mockType = "SATA";
  const mockHandleSubmit = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it("should render without crashing", async () => {
    render(
      <QuestionSummary
        next={mockNext}
        nextStep={mockNextStep}
        previous={mockReset}
        previousStep={mockPreviousStep}
      />
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("Question and Answer Summary")
        ).toBeInTheDocument();
        expect(screen.getByTestId("questionType")).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it("should call previousStep and previous when handle backbutton invoke", () => {
    render(
      <QuestionSummary
        next={mockNext}
        nextStep={mockNextStep}
        previous={mockReset}
        previousStep={mockPreviousStep}
      />
    );

    const backButton = screen.getByRole("button", { name: /Previous/i });
    fireEvent.click(backButton);

    expect(mockPreviousStep).toHaveBeenCalled;
    expect(mockPrevious).toHaveBeenCalled;
  });

  it("renders each accordion with the correct question", () => {
    mockData.forEach((item, index) => {
      render(
        <ThemeProvider theme={theme()}>
          <SummaryAccordion item={item} type={mockType} index={index} />
        </ThemeProvider>
      );
      const questionElement = screen.getByText(`Sample Question ${index + 1}`, {
        selector: "p",
      });
      expect(questionElement).toBeInTheDocument();
    });
  });

  it("expands and collapses the accordion", () => {
    render(
      <>
        <ThemeProvider theme={theme()}>
          {mockData.map((item, index) => (
            <SummaryAccordion
              item={item}
              type={mockType}
              index={index}
              key={index}
            />
          ))}
        </ThemeProvider>
      </>
    );

    const firstAccordionButton = screen.getByRole("button", {
      name: /Sample Question 2/i,
    });

    expect(screen.getByTestId("summary-content-0")).toBeVisible();

    expect(screen.queryByTestId("summary-content-1")).not.toBeVisible();

    fireEvent.click(firstAccordionButton);

    expect(screen.queryByTestId("summary-content-0")).toBeVisible();

    fireEvent.click(firstAccordionButton);

    expect(screen.getByTestId("summary-content-1")).toBeVisible();
  });

  it("renders the correct content in the accordion details", () => {
    mockData.forEach((item, index) => {
      render(
        <ThemeProvider theme={theme()}>
          <SummaryAccordion item={item} type={mockType} index={index} />
        </ThemeProvider>
      );
      const summaryElement = screen.getByRole("button", {
        name: `Sample Question ${index + 1}`,
      });

      fireEvent.click(summaryElement);
      const detailsElement = screen.getByTestId(`summary-content-${index}`);

      expect(detailsElement).toHaveTextContent(item.clientNeeds);
      expect(detailsElement).toHaveTextContent(item.cognitiveLevel);
      expect(detailsElement).toHaveTextContent(item.contentArea);
      item.answers.forEach((answer) => {
        expect(detailsElement).toHaveTextContent(answer.answer);
      });
    });
  });
});
