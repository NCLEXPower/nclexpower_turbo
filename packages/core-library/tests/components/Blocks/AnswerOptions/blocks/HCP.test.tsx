import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { fireEvent, renderHook, screen, render } from "../../../../common";
import { MCQ } from "../../../../../components/blocks/AnswerOptions/blocks/Regular/MCQ/MCQ";
import { HCP } from "../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/HCP/HCP";
import { watch } from "fs";
import { HCPNAnswerOptionType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

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
  useFormContext: jest.fn(),
}));

describe("HCPQuestionType", () => {
  const mockHCPOptions: HCPNAnswerOptionType[] = [
    {
      answer: "test-answer",
      answerKey: false,
      attrName: "test-attr-name",
    },
  ];

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      watch: jest.fn(() => mockHCPOptions),
    });
  });

  const { result } = renderHook(() => useForm());
  const form = result.current;

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  it("Should render hcp question type", () => {
    render(
      <Wrapper>
        <HCP questionIndex={1} />
      </Wrapper>
    );
  });
});
