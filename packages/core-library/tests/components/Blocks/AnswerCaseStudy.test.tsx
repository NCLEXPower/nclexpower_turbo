import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { ContainedCaseStudyQuestionType } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { render, screen } from "../../common";
import { AnswerCaseStudy } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudyCreation/AnswerCaseStudy";
import { AnswerOptions } from "../../../components";

jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/Regular/MCQ/MCQ",
  () => ({
    MCQ: jest.fn(() => <div>MCQ Component</div>),
  })
);
jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/Regular/SATA/SATA",
  () => ({
    SATA: jest.fn(() => <div>SATA Component</div>),
  })
);
jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/CaseStudy/DDC/DDC",
  () => ({
    DDC: jest.fn(() => <div>DDC Component</div>),
  })
);
jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/CaseStudy/MRSN/MRSN",
  () => ({
    MRSN: jest.fn(() => <div>MRSN Component</div>),
  })
);
jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/DND",
  () => ({
    DND: jest.fn(() => <div>DND Component</div>),
  })
);
jest.mock(
  "../../../components/blocks/AnswerOptions/blocks/CaseStudy/Bowtie/Bowtie",
  () => ({
    Bowtie: jest.fn(() => <div>Bowtie Component</div>),
  })
);

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn(),
  useWatch: jest.fn(),
}));

describe("AnswerCaseStudy", () => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const form = useForm<ContainedCaseStudyQuestionType>();
    return <FormProvider {...form}>{children}</FormProvider>;
  };
  const defaultIndex = 0;

  const mockFormValues = {
    getValues: jest.fn(),
    setValue: jest.fn(),
    resetField: jest.fn(),
    watch: jest.fn().mockImplementation((field: string) => {
      switch (field) {
        case `questionnaires.${defaultIndex}.questionType`:
          return "SATA";
        case `questionnaires.${defaultIndex}.seqNum`:
          return 2;
        default:
          return undefined;
      }
    }),
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue(mockFormValues);
    (useWatch as jest.Mock).mockReturnValue({
      questionnaires: [{ questionType: "SATA", seqNum: 2, answers: [] }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the AnswerCaseStudy component", () => {
    render(
      <Wrapper>
        <AnswerCaseStudy index={defaultIndex} />{" "}
      </Wrapper>
    );
    expect(screen.getByTestId("answer-case-study")).toBeInTheDocument();
  });

  it("renders MCQ component for regularQuestion with MCQ questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="regularQuestion"
        questionnaireType="MCQ"
        questionIndex={1}
      />
    );
    expect(screen.getByText("MCQ Component")).toBeInTheDocument();
  });

  it("renders SATA component for regularQuestion with SATA questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="regularQuestion"
        questionnaireType="SATA"
        questionIndex={1}
      />
    );
    expect(screen.getByText("SATA Component")).toBeInTheDocument();
  });

  it("renders DDC component for caseStudy with DDC questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="caseStudy"
        questionnaireType="DDC"
        questionIndex={1}
      />
    );
    expect(screen.getByText("DDC Component")).toBeInTheDocument();
  });

  it("renders SATA component for caseStudy with SATA questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="caseStudy"
        questionnaireType="SATA"
        questionIndex={1}
      />
    );
    expect(screen.getByText("SATA Component")).toBeInTheDocument();
  });

  it("renders MRSN component for caseStudy with MRSN questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="caseStudy"
        questionnaireType="MRSN"
        questionIndex={1}
      />
    );
    expect(screen.getByText("MRSN Component")).toBeInTheDocument();
  });

  it("renders DND component for caseStudy with DND questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="caseStudy"
        questionnaireType="DND"
        questionIndex={1}
      />
    );
    expect(screen.getByText("DND Component")).toBeInTheDocument();
  });

  it("renders Bowtie component for caseStudy with Bowtie questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="caseStudy"
        questionnaireType="BOWTIE"
        questionIndex={1}
      />
    );
    expect(screen.getByText("Bowtie Component")).toBeInTheDocument();
  });

  it("returns null when no matching questionType or questionnaireType", () => {
    render(
      <AnswerOptions
        questionType="regularQuestion"
        questionnaireType={undefined}
        questionIndex={1}
      />
    );
    expect(screen.queryByText("MCQ Component")).not.toBeInTheDocument();
    expect(screen.queryByText("SATA Component")).not.toBeInTheDocument();
    expect(screen.queryByText("DDC Component")).not.toBeInTheDocument();
    expect(screen.queryByText("MRSN Component")).not.toBeInTheDocument();
    expect(screen.queryByText("DND Component")).not.toBeInTheDocument();
    expect(screen.queryByText("Bowtie Component")).not.toBeInTheDocument();
  });
});
