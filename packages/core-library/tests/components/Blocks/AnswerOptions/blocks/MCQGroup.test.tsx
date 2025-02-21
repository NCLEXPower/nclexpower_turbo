import { FormProvider, useForm } from "react-hook-form";
import { MCQGroup } from "../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQGroup/MCQGroup";
import { fireEvent, render, renderHook, screen } from "../../../../common";
import { MCQTableCreation } from "../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/MCQGroup/components/MCQTableCreation";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("MCQGroup", () => {
  const mockQuestionIndex = 1;

  it("should render MCQ Group Component", () => {
    const { result } = renderHook(() => useForm());
    const form = result.current;
    render(
      <FormProvider {...form}>
        <MCQGroup questionIndex={mockQuestionIndex} />
      </FormProvider>
    );

    expect(screen.getByTestId("mcq-group-id")).toBeInTheDocument();
  });

  it("should detect checkbox behavior", () => {
    const { result } = renderHook(() => useForm());
    const form = result.current;
    const { getAllByRole } = render(
      <FormProvider {...form}>
        <MCQGroup questionIndex={mockQuestionIndex} />
      </FormProvider>
    );

    const checkbox = getAllByRole("checkbox");
    fireEvent.click(checkbox[1]);
    expect(checkbox[1]).toBeChecked();
  });

  it("renders 'No data available' when no ColumnField or RowField is provided", () => {
    render(
      <MCQTableCreation
        ColumnField={[]}
        RowField={[]}
        questionIndex={mockQuestionIndex}
      />
    );
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
