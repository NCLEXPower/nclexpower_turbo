import useMaintenanceMode from "../../../hooks/useMaintenanceMode";
import { MaintenanceMode } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/MaintenanceMode/MaintenanceMode";
import { render, renderHook, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useMaintenanceMode");

describe("MaintenanceMode", () => {
  const nextStep = jest.fn();
  const previous = jest.fn();
  const previousStep = jest.fn();
  const reset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Maintenance Mode", () => {
    (useMaintenanceMode as jest.Mock).mockReturnValue({
      data: ["uat"],
      loading: false,
      dateCommenced: "Sample Date",
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
    expect(queryByTestId("maintenance-mode-id")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    (useMaintenanceMode as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      dateCommenced: undefined,
      refetch: jest.fn(),
    });

    render(
      <MaintenanceMode
        nextStep={nextStep}
        previous={previous}
        previousStep={previousStep}
        reset={reset}
        values={{}}
      />
    );

    expect(screen.queryByTestId("fetch-loading")).toBeInTheDocument();
  });
});
