import React from "react";
import { render, screen, waitFor } from "../../common";
import { ComingSoonManagementBlock } from "../../../system/app/internal/blocks";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockGetCountryTimezonesExecute = jest.fn();
const mockCreateGoliveScheduleExecute = jest.fn();

jest.mock("../../../../core-library/hooks", () => ({
  useApiCallback: jest.fn((callback) => {
    if (callback.toString().includes("getCountryTimezone")) {
      return { execute: mockGetCountryTimezonesExecute, loading: false };
    }
    if (callback.toString().includes("createGoliveSchedule")) {
      return { execute: mockCreateGoliveScheduleExecute, loading: false };
    }
    return { execute: jest.fn(), loading: false };
  }),
}));

const mockShowToast = jest.fn();
jest.mock("../../../../core-library/contexts", () => ({
  ...jest.requireActual("../../../../core-library/contexts"),
  useExecuteToast: () => ({ showToast: mockShowToast }),
}));

const defaultWatchValues = {
  countryKey: ["USA"],
  goLiveDate: new Date("2025-03-01"),
  eventName: "Test Event",
  TargetEnvironment: "prod",
  description: "Test description",
  announcement: "Test announcement",
  isActive: true,
};
type WatchValues = typeof defaultWatchValues;
let mockWatchValues: WatchValues = { ...defaultWatchValues };

const mockSetValue = jest.fn();

jest.mock("react-hook-form", () => {
  const originalModule = jest.requireActual("react-hook-form");
  return {
    ...originalModule,
    useForm: () => ({
      control: {},
      handleSubmit: (fn: any) => fn,
      watch: (field: keyof WatchValues) => mockWatchValues[field],
      setValue: mockSetValue,
    }),
    FormProvider: originalModule.FormProvider,
  };
});

jest.mock(
  "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/ComingSoonManagement",
  () => (props: any) => (
    <div data-testid="coming-soon-management">{JSON.stringify(props)}</div>
  )
);

jest.mock(
  "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/ComingSoonForm",
  () => (props: any) => (
    <div data-testid="coming-soon-form">{JSON.stringify(props)}</div>
  )
);

jest.mock(
  "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/EmailsNotification",
  () => ({
    EmailsNotification: () => <div data-testid="emails-notification" />,
  })
);

describe("ComingSoonManagementBlock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWatchValues = { ...defaultWatchValues };
  });

  it("calls getCountryTimezones and updates mappedCountries correctly (USA response)", async () => {
    mockGetCountryTimezonesExecute.mockResolvedValue({
      data: [
        {
          countryKey: "USA",
          country: "USA",
          daysRemaining: [
            { selectedTimezone: "EST", daysRemaining: 5 },
            { selectedTimezone: "PST", daysRemaining: 4 },
          ],
        },
      ],
    });

    render(<ComingSoonManagementBlock />);

    await waitFor(() => {
      expect(mockGetCountryTimezonesExecute).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const managementComponent = screen.getByTestId("coming-soon-management");
      const props = JSON.parse(managementComponent.textContent || "{}");

      expect(props.mappedCountries).toEqual([
        {
          countryKey: "USA",
          countryName: "USA",
          daysRemaining: 5,
          timezones: [
            { selectedTimezone: "EST", daysRemaining: 5 },
            { selectedTimezone: "PST", daysRemaining: 4 },
          ],
        },
      ]);
    });
  });
});
