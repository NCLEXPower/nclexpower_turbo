import { CaseNameSelection } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseNameSelection";
import { useApi } from "../../../hooks";
import { usePageLoaderContext } from "../../../contexts/PageLoaderContext";
import { screen, render } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useApiCallback: jest.fn(),
  useCustomAction: jest.fn(),
  useApi: jest.fn(),
  useBeforeUnload: jest.fn(),
}));

jest.mock("../../../contexts/PageLoaderContext", () => ({
  usePageLoaderContext: jest.fn(),
}));

describe("CaseNameSelection Component", () => {
  const mockCaseNames = {
    data: [
      { id: "1", caseName: "Case A" },
      { id: "2", caseName: "Case B" },
    ],
  };

  const mockSetContentLoader = jest.fn();

  jest.mocked(useApi).mockImplementation(
    () =>
      ({
        result: { data: mockCaseNames },
      }) as any
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });
  });

  it("Should render the case name selection block", () => {
    (usePageLoaderContext as jest.Mock).mockReturnValue({
      contentLoader: false,
      setContentLoader: mockSetContentLoader,
    });
    render(
      <CaseNameSelection
        next={jest.fn()}
        nextStep={jest.fn()}
        previousStep={jest.fn()}
        values={{}}
      />
    );

    const caseNameBlock = screen.getByTestId("casename-block-test");
    expect(caseNameBlock).toBeInTheDocument();
  });
});
