import { sanitizedEnvironment } from "../../utils";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

describe("sanitizedEnvironment", () => {
  it("should return 'dev' when environment is 0", () => {
    expect(sanitizedEnvironment(0)).toBe("dev");
  });

  it("should return 'uat' when environment is 1", () => {
    expect(sanitizedEnvironment(1)).toBe("uat");
  });

  it("should return 'preprod' when environment is 2", () => {
    expect(sanitizedEnvironment(2)).toBe("preprod");
  });

  it("should return 'prod' when environment is undefined", () => {
    expect(sanitizedEnvironment(undefined)).toBe("prod");
  });

  it("should return 'prod' for any other number (e.g. 3)", () => {
    expect(sanitizedEnvironment(3)).toBe("prod");
  });
});
