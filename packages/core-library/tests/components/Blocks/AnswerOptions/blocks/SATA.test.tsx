import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { fireEvent, renderHook, screen, render } from "../../../../common";
import { ContainedRegularQuestionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import {
  initAnswerValues,
  initQuestionsValues,
} from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/constants/constants";
import { SATA } from "../../../../../components/blocks/AnswerOptions/blocks/Regular/SATA/SATA";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFieldArray: jest.fn(),
  useFormContext: jest.fn(),
}));

const MOCK_QUESTIONTYPE = "SATA";

describe("SATA", () => {
  const mockAppend = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: jest.fn(() => []),
    });

    (useFieldArray as jest.Mock).mockReturnValue({
      append: mockAppend,
      remove: mockRemove,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should render when answer fields exist", () => {
    const { result } = renderHook(() =>
      useForm<ContainedRegularQuestionType>({
        defaultValues: {
          questionnaires: [initQuestionsValues(MOCK_QUESTIONTYPE)],
          type: MOCK_QUESTIONTYPE,
        },
      })
    );

    const form = result.current;

    render(
      <FormProvider {...form}>
        <SATA questionIndex={1} />
      </FormProvider>
    );
    expect(screen.getByTestId("sata-answer")).toBeInTheDocument();
  });

  it("Should render a 5 checkboxes", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: jest.fn(() => initQuestionsValues(MOCK_QUESTIONTYPE).answers),
    });

    const { result } = renderHook(() => useForm());
    const form = result.current;

    const { getAllByRole } = render(
      <FormProvider {...form}>
        <SATA questionIndex={1} />
      </FormProvider>
    );
    expect(getAllByRole("checkbox")).toHaveLength(5);
  });

  it("Should Call the function append onclick", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: jest.fn(() => initQuestionsValues(MOCK_QUESTIONTYPE).answers),
    });

    const { result } = renderHook(() => useForm());
    const form = result.current;

    const { getByTestId } = render(
      <FormProvider {...form}>
        <SATA questionIndex={1} />
      </FormProvider>
    );

    fireEvent.click(getByTestId("answer-option-append"));

    expect(mockAppend).toHaveBeenCalledTimes(1);
    expect(mockAppend).toHaveBeenCalledWith({ answer: "", answerKey: false });
  });

  it("Should Call the function remove onclick", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: jest.fn(() => [
        ...initQuestionsValues(MOCK_QUESTIONTYPE).answers,
        initAnswerValues,
      ]),
    });

    const { result } = renderHook(() => useForm());
    const form = result.current;

    const { getAllByRole } = render(
      <FormProvider {...form}>
        <SATA questionIndex={1} />
      </FormProvider>
    );
    expect(getAllByRole("checkbox")).toHaveLength(6);

    const removeButton = screen.getByTestId("answer-option-remove-5");

    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(5);
  });
});
