import { FormProvider, useForm } from "react-hook-form";
import { AnswerOptions, AnswerOptionsType } from "../../../../components";
import { render, renderHook, screen } from "../../../common";
import { useApi, useApiCallback } from '../../../../hooks';
import { DndOptionsType } from '../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/type';

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../../hooks/useApi', () => ({
  useApi: jest.fn(),
  useApiCallback: jest.fn(),
}))

const DEFAULT_PROPS: AnswerOptionsType = {
  questionIndex: 1,
  questionType: "regularQuestion",
  questionnaireType: "MCQ",
};

describe("AnswerOptions", () => {
  const { result } = renderHook(() => useForm());
  const form = result.current;

  it("should render the mcq answer options", () => {
    render(
      <FormProvider {...form}>
        <AnswerOptions {...DEFAULT_PROPS} questionnaireType="MCQ" />
      </FormProvider>
    );
    expect(screen.getByTestId("mcq-answer")).toBeInTheDocument();
  });

  it("should render the SATA answer options", () => {
    render(
      <FormProvider {...form}>
        <AnswerOptions {...DEFAULT_PROPS} questionnaireType="SATA" />
      </FormProvider>
    );
    expect(screen.getByTestId("sata-answer")).toBeInTheDocument();
  });

  it("should render SATA case study ", () => {
    const { container } = render(
      <FormProvider {...form}>
        <AnswerOptions
          questionIndex={1}
          questionType="caseStudy"
          questionnaireType="SATA"
        />
      </FormProvider>
    );
    expect(screen.getByTestId("sata-answer")).toBeInTheDocument();
  });

  it("should render nothing when questionType is caseStudy and MCQ", () => {
    const { container } = render(
      <FormProvider {...form}>
        <AnswerOptions
          questionIndex={1}
          questionType="caseStudy"
          questionnaireType="MCQ"
        />
      </FormProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render  when questionType is caseStudy and MRSN", () => {
    const { container } = render(
      <FormProvider {...form}>
        <AnswerOptions
          questionIndex={1}
          questionType="caseStudy"
          questionnaireType="MRSN"
        />
      </FormProvider>
    );
    expect(screen.getByTestId("mrsn-form")).toBeInTheDocument();
  });

  it("should render when questionType is caseStudy and DND", () => {
    const mockOptionList: DndOptionsType[] =
      [
        {
          id: 'test-id',
          label: "test-label",
          value: "test-value"
        },
        {
          id: 'test-id-2',
          label: "test-label-2",
          value: "test-value-2"
        }
      ];

    (useApi as jest.Mock).mockReturnValue({
      result: mockOptionList,
      execute: jest.fn()
    });

    render(
      <FormProvider {...form}>
        <AnswerOptions
          questionIndex={1}
          questionType="caseStudy"
          questionnaireType="DND"
        />
      </FormProvider>
    );
    expect(screen.getByTestId('dnd-form')).toBeInTheDocument();
  });
});
