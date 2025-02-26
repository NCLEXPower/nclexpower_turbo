import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { render, screen } from "../../common";
import { ContainedCaseStudyQuestionType } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { BackgroundInfoTab } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudyCreation/components/BackgroundInfoTab";

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
  useFieldArray: jest.fn().mockReturnValue({
    append: jest.fn(),
  }),
}));

describe("BackgroundInfoTab", () => {
  const defaultIndex = 0;
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const form = useForm<ContainedCaseStudyQuestionType>();
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  const mockFormValues = {
    getValues: jest.fn(),
    setValue: jest.fn(),
    resetField: jest.fn(),
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue(mockFormValues);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the AnswerCaseStudy component", () => {
    (useFieldArray as jest.Mock).mockReturnValue({
      append: jest.fn(),
    });

    render(
      <Wrapper>
        <BackgroundInfoTab isSequenceDisabled={true} type={"test"} />{" "}
      </Wrapper>
    );
    expect(screen.getByTestId("background-info-tab")).toBeInTheDocument();
  });
});
