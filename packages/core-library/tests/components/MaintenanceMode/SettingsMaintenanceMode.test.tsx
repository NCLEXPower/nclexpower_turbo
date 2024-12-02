import { useMaintenanceMode } from "../../../hooks/index";
import { render } from "../../common";
import { SettingsMaintenanceMode } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/MaintenanceMode/SettingsMaintenanceMode";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  useCheckoutIntent: jest.fn(() => [null, jest.fn()]),
}));

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useMaintenanceMode: jest.fn(),
}));

jest.mock("../../../hooks");

describe("SettingsMaintenanceMode", () => {
  const nextStep = jest.fn();
  const previous = jest.fn();
  const previousStep = jest.fn();
  const reset = jest.fn();

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
      <SettingsMaintenanceMode
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

    const { queryByTestId } = render(
      <SettingsMaintenanceMode
        nextStep={nextStep}
        previous={previous}
        previousStep={previousStep}
        reset={reset}
        values={{}}
      />
    );

    expect(queryByTestId("fetch-loading")).toBeInTheDocument();
  });
});
