import React from "react";
import ComingSoonManagement from "../../../system/app/internal/blocks/Hub/ComingSoon/ComingSoonManagement";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("console", () => ({
  time: jest.fn(),
}));

jest.mock("../../../components", () => ({
  DateField: (props: any) => (
    <div data-testid="date-field" {...props}>
      DateField
    </div>
  ),
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
  const mappedCountries = [
    {
      countryKey: "USA",
      countryName: "USA",
      daysRemaining: 5,
      timezones: [
        { selectedTimezone: "EST", daysRemaining: 5, hoursRemaining: 12 },
        { selectedTimezone: "PST", daysRemaining: 4, hoursRemaining: 10 },
      ],
    },
  ];

  it("renders with isSwitchOn true and isActive false (DateField enabled, opacity 1)", () => {
    render(
      <ComingSoonManagement
        control={control}
        isSwitchOn={true}
        onSwitchChange={onSwitchChange}
        isActive={false}
        mappedCountries={mappedCountries}
      />
    );

    const goLiveDateLabel = screen.getByText("Go Live Date:");
    expect(goLiveDateLabel).toBeInTheDocument();

    const computedStyle = window.getComputedStyle(goLiveDateLabel);
    expect(computedStyle.opacity).toBe("1");

    const dateField = screen.getByTestId("date-field");
    expect(dateField.getAttribute("disabled")).toBeNull();
  });

  it("renders with isSwitchOn false (DateField disabled, opacity 0.5)", () => {
    render(
      <ComingSoonManagement
        control={control}
        isSwitchOn={false}
        onSwitchChange={onSwitchChange}
        isActive={false}
        mappedCountries={mappedCountries}
      />
    );

    const goLiveDateLabel = screen.getByText("Go Live Date:");
    const computedStyle = window.getComputedStyle(goLiveDateLabel);
    expect(computedStyle.opacity).toBe("0.5");

    const dateField = screen.getByTestId("date-field");
    expect(dateField).toHaveAttribute("disabled");
  });

  it("renders with isActive true (DateField disabled regardless of isSwitchOn)", () => {
    render(
      <ComingSoonManagement
        control={control}
        isSwitchOn={true}
        onSwitchChange={onSwitchChange}
        isActive={true}
        mappedCountries={mappedCountries}
      />
    );

    const dateField = screen.getByTestId("date-field");
    expect(dateField).toHaveAttribute("disabled");
  });
});
