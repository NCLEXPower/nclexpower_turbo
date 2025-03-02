import React from "react";
import { render, screen, act, fireEvent, userEvent } from "../../common";
import { CaseStudySummary } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content";
import { TableView } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/TableView";
import { usePageLoaderContext } from "../../../contexts";
import { useAtom } from "jotai";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useBeforeUnload.ts", () => ({
  useBeforeUnload: jest.fn(),
}));

jest.mock("../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn(),
}));

const mockSetActiveStep = jest.fn();
const mockActiveStepAtom = jest.fn();

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(() => mockActiveStepAtom),
}));

jest.mock(
  "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader",
  () => ({
    CaseStudyLoader: () => <div>Loading...</div>,
  })
);

const caseStudyMockData = {
  caseName: ["Case Study 1"],
  nurseNotes: [
    { seqContent: "Patient is experiencing mild nausea.", seqNum: 1 },
    {
      seqContent: "Blood pressure stable, monitoring for dehydration.",
      seqNum: 2,
    },
  ],
  hxPhy: [
    { seqContent: "History of hypertension.", seqNum: 1 },
    { seqContent: "No known allergies.", seqNum: 2 },
  ],
  labs: [
    { seqContent: "CBC normal, WBC slightly elevated.", seqNum: 1 },
    { seqContent: "Electrolytes within normal limits.", seqNum: 2 },
  ],
  orders: [
    { seqContent: "Administer IV fluids 1000ml over 8 hours.", seqNum: 1 },
    { seqContent: "Perform chest X-ray.", seqNum: 2 },
  ],
  questionnaires: [
    {
      questionId: 1,
      questionText: "What is the primary concern in this case?",
      options: [
        { optionId: "a", optionText: "Nausea", isCorrect: false },
        { optionId: "b", optionText: "Dehydration", isCorrect: true },
        { optionId: "c", optionText: "Hypertension", isCorrect: false },
      ],
      answerKey: "b",
    },
    {
      questionId: 2,
      questionText: "What intervention is most appropriate next?",
      options: [
        { optionId: "a", optionText: "Oral hydration", isCorrect: false },
        { optionId: "b", optionText: "IV fluids", isCorrect: true },
        { optionId: "c", optionText: "Dietary changes", isCorrect: false },
      ],
      answerKey: "b",
    },
  ],
};

jest.mock(
  "../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog",
  () => ({
    default: ({ handleSubmit }: { handleSubmit: () => void }) => (
      <button onClick={handleSubmit}>Confirm</button>
    ),
  })
);

describe("CaseStudySummary Component", () => {
  let mockSetContentLoader: jest.Mock;
  let mockNextStep: jest.Mock;
  let mockPreviousStep: jest.Mock;
  let mockNext: jest.Mock;
  let mockPrevious: jest.Mock;

  beforeEach(() => {
    mockSetContentLoader = jest.fn();
    mockNextStep = jest.fn();
    mockPreviousStep = jest.fn();
    mockNext = jest.fn();
    mockPrevious = jest.fn();

    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });

    (useAtom as jest.Mock).mockReturnValue([{}]);
  });

  it("should render the Case Study Summary", () => {
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: true,
      setContentLoader: mockSetContentLoader,
    });
    render(
      <CaseStudySummary
        nextStep={mockNextStep}
        previousStep={mockPreviousStep}
        values={{}}
        next={mockNext}
        previous={mockPrevious}
        reset={jest.fn()}
      />
    );
  });

  it("renders loader when contentLoader is true", () => {
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: true,
      setContentLoader: mockSetContentLoader,
    });

    render(
      <CaseStudySummary
        nextStep={mockNextStep}
        previousStep={mockPreviousStep}
        values={{}}
        next={mockNext}
        previous={mockPrevious}
        reset={jest.fn()}
      />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
