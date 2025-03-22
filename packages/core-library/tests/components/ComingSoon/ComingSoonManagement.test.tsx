import React from "react";
import ComingSoonManagement from "../../../system/app/internal/blocks/Hub/ComingSoon/ComingSoonManagement";
import { render, screen, fireEvent } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components", () => ({
  DateField: (props: any) => <input data-testid="date-field" {...props} />,
  GenericSelectField: (props: any) => (
    <div data-testid="generic-select-field" {...props}>
      GenericSelectField
    </div>
  ),
  MultipleSelectField: (props: any) => (
    <div data-testid="multiple-select-field" {...props}>
      MultipleSelectField
    </div>
  ),
  CustomTooltip: (props: any) => (
    <div data-testid="custom-tooltip" {...props}>
      CustomTooltip
    </div>
  ),
}));

jest.mock("../../../components/Button/SwitchButton", () => ({
  SwitchButton: (props: any) => (
    <input data-testid="switch-button" type="checkbox" {...props} />
  ),
}));

jest.mock(
  "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/LiveCountDown",
  () => () => <div data-testid="live-countdown">LiveCountdown</div>
);

describe("ComingSoonManagement component", () => {
  const control = {} as any;
  const onSwitchChange = jest.fn();
  const onCountdownToggle = jest.fn();
  const mappedCountries = [
    {
      countryKey: "USA",
      countryName: "USA",
      daysRemaining: 5,
      timezones: [
        { selectedTimezone: "EST", daysRemaining: 5 },
        { selectedTimezone: "PST", daysRemaining: 4 },
      ],
    },
  ];

  const renderComponent = (
    props: Partial<React.ComponentProps<typeof ComingSoonManagement>> = {}
  ) => {
    const defaultProps = {
      control,
      isSwitchOn: true,
      onSwitchChange,
      isActive: false,
      mappedCountries,
      isCountdownEnabled: true,
      onCountdownToggle,
    };

    return render(<ComingSoonManagement {...defaultProps} {...props} />);
  };

  it("renders with countdown enabled and isSwitchOn true", () => {
    renderComponent();

    expect(screen.getByText("Coming Soon Management")).toBeInTheDocument();
    expect(screen.getByTestId("live-countdown")).toBeInTheDocument();
    expect(screen.getByText("Go Live Date:")).toBeInTheDocument();

    const switches = screen.getAllByTestId("switch-button");
    expect(switches[0]).toBeChecked();
    expect(switches[1]).toBeChecked();

    expect(screen.getByTestId("date-field")).toBeEnabled();
  });

  it("disables fields when isActive is true", () => {
    renderComponent({ isActive: true });

    const switches = screen.getAllByTestId("switch-button");
    expect(switches[0]).toBeDisabled();
    expect(switches[1]).toBeDisabled();

    expect(screen.getByTestId("date-field")).toBeDisabled();
  });

  it("renders countdown disabled state", () => {
    renderComponent({ isCountdownEnabled: false });

    expect(screen.queryByTestId("live-countdown")).not.toBeInTheDocument();
    expect(screen.queryByText("Go Live Date:")).not.toBeInTheDocument();
    expect(screen.getByTestId("multiple-select-field")).toBeInTheDocument();

    const switches = screen.getAllByTestId("switch-button");
    expect(switches).toHaveLength(1);
    expect(switches[0]).not.toBeChecked();
  });

  it("handles countdown toggle", () => {
    renderComponent();

    const switches = screen.getAllByTestId("switch-button");
    fireEvent.click(switches[0]);
    expect(onCountdownToggle).toHaveBeenCalled();
  });

  it("adjusts opacity when isSwitchOn changes", () => {
    const { rerender } = renderComponent({ isSwitchOn: true });
    expect(
      window.getComputedStyle(screen.getByText("Go Live Date:")).opacity
    ).toBe("1");

    rerender(
      <ComingSoonManagement
        control={control}
        isSwitchOn={false}
        onSwitchChange={onSwitchChange}
        isActive={false}
        mappedCountries={mappedCountries}
        isCountdownEnabled={true}
        onCountdownToggle={onCountdownToggle}
      />
    );
    expect(
      window.getComputedStyle(screen.getByText("Go Live Date:")).opacity
    ).toBe("0.5");
  });
});
