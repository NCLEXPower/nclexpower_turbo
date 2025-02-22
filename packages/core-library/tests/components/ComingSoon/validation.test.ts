import { contentDateSchema } from "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/validation";

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

describe("Content Date Schema", () => {
  it("should validate valid data", async () => {
    const validData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: false,
      goLiveDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
      announcement: false,
      isActive: true,
    };

    await expect(contentDateSchema.isValid(validData)).resolves.toBe(true);
  });

  it("should return error when eventName is missing", async () => {
    const invalidData = {
      description: "Event Description",
      hasNoSchedule: false,
      goLiveDate: new Date(),
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should return error when description exceeds max length", async () => {
    const invalidData = {
      eventName: "Valid Title",
      description: "a".repeat(501),
      hasNoSchedule: false,
      goLiveDate: new Date(),
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should return error when goLiveDate is before today", async () => {
    const invalidData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: false,
      goLiveDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should return error when countries list is empty", async () => {
    const invalidData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: true,
      countries: [],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should return error when TargetEnvironment is invalid", async () => {
    const invalidData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: true,
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Production",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should validate correctly when hasNoSchedule is true", async () => {
    const validData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: true,
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(validData)).resolves.toBe(true);
  });

  it("should return error when timeZone is missing", async () => {
    const invalidData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: true,
      countries: ["USA"],
      countryKey: ["America/New_York"],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });

  it("should return error when countryKey is empty", async () => {
    const invalidData = {
      eventName: "Event Title",
      description: "Event Description",
      hasNoSchedule: true,
      countries: ["USA"],
      timeZone: "America/New_York",
      countryKey: [],
      TargetEnvironment: "Dev",
    };

    await expect(contentDateSchema.isValid(invalidData)).resolves.toBe(false);
  });
});
