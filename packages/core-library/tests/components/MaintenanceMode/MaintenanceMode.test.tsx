import { render, screen } from "../../common";
import { MaintenanceMode } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/MaintenanceMode/MaintenanceMode";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("MaintenanceMode", () => {
  const nextStep = jest.fn();
  const previous = jest.fn();
  const previousStep = jest.fn();
  const reset = jest.fn();
  const useMaintenanceMode = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useMaintenanceMode as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      dateCommenced: undefined,
      refetch: jest.fn(),
    });

    const { queryByTestId } = render(
      <MaintenanceMode
        nextStep={nextStep}
        previous={previous}
        previousStep={previousStep}
        reset={reset}
        values={{}}
      />
    );
    expect(queryByTestId("fetch-loading")).toBeInTheDocument();
  });

  it("should render Maintenance Mode ", () => {
    useMaintenanceMode.mockReturnValue({
      data: ["uat"],
      loading: false,
      dateCommenced: "2024-12-01",
      refetch: jest.fn(),
    });

    const { container } = render(
      <MaintenanceMode
        nextStep={nextStep}
        previous={previous}
        previousStep={previousStep}
        reset={reset}
        values={{}}
      />
    );
    expect(container).toBeInTheDocument();
  });
});
