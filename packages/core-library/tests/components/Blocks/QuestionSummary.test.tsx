import { fireEvent, screen } from "../../common";
import { render } from "@testing-library/react";
import { QuestionSummary } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content";
import { SummaryAccordion } from "../../../components/blocks/Accordion/SummaryAccordion";
import ConfirmationModal from "../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { Button } from '../../../components';

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

describe("QuestionSummary Component", () => {
  const mockNextStep = jest.fn();
  const mockPreviousStep = jest.fn();
  const mockNext = jest.fn();

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

  const MODAL_DEFAULT_PROPS = {
    customButton: <>test</>,
    dialogContent: "test",
  }

  const mockType = "SATA";

  const defaultProps = {
    nextStep: mockNextStep,
    previousStep: mockPreviousStep,
    next: mockNext,
  };
  const mockHandleSubmit = jest.fn();

  it("should render without crashing", () => {
    render(<QuestionSummary {...defaultProps} />);

    expect(
      screen.getByText(/Question and Answer Summary/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("questionType")).toBeInTheDocument();
  });

  it("should call previousStep function when Go Back button is clicked", () => {
    render(<QuestionSummary {...defaultProps} />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockPreviousStep).toHaveBeenCalled();
  });

  it("should render the alert with the correct message", () => {
    render(<QuestionSummary {...defaultProps} />);
    expect(
      screen.getAllByText(
        "By clicking the Continue button, you will send the information you have entered."
      )
    );
  });

  it("renders each accordion with the correct question", () => {
    mockData.forEach((item, index) => {
      render(<SummaryAccordion item={item} type={mockType} index={index} />);
      const questionElement = screen.getByText(`Sample Question ${index + 1}`, {
        selector: "p",
      });
      expect(questionElement).toBeInTheDocument();
    });
  });

  it("expands and collapses the accordion", () => {
    render(
      <>
        {mockData.map((item, index) => (
          <SummaryAccordion
            item={item}
            type={mockType}
            index={index}
            key={index}
          />
        ))}
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
      render(<SummaryAccordion item={item} type={mockType} index={index} />);
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

  it("renders the ConfirmationModal button", () => {
    render(<ConfirmationModal {...MODAL_DEFAULT_PROPS} handleSubmit={mockHandleSubmit} />);

    const button = screen.getByRole("button", { name: /test/i });
    expect(button).toBeInTheDocument();
  });

  it("opens the modal and calls handleSubmit when the button is clicked", async () => {
    render(<ConfirmationModal {...MODAL_DEFAULT_PROPS} handleSubmit={mockHandleSubmit} />);

    const triggerButton = screen.getByRole("button", { name: /test/i });
    fireEvent.click(triggerButton);

    const modal = await screen.findByRole("dialog");
    expect(modal).toBeVisible();

    screen.debug();

    const confirmButton = screen.getByRole("button", { name: /Submit/i });
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});