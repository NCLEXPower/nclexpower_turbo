import { renderHook, waitFor } from "../common";
import { useDeviceInfo } from "../../hooks";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("@fingerprintjs/fingerprintjs", () => ({
  load: jest.fn().mockResolvedValue({
    get: jest.fn().mockResolvedValue({ visitorId: "mockedFingerprint" }),
  }),
}));

jest.mock("ua-parser-js", () => {
  return jest.fn().mockImplementation(() => ({
    getDevice: jest
      .fn()
      .mockReturnValue({ model: "mockedDeviceModel", type: "mobile" }),
    getOS: jest.fn().mockReturnValue({ name: "iOS", version: "14.4" }),
  }));
});

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({ ip: "123.45.67.89" }),
});

describe("useDeviceInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return device information", async () => {
    const { result } = renderHook(() => useDeviceInfo());

    await waitFor(() => {
      expect(result.current.deviceInfo).toEqual({
        fingerprint: "mockedFingerprint",
        deviceName: "iOS 14.4 (mockedDeviceModel)",
        deviceType: "mobile",
        ipAddress: "123.45.67.89",
      });
    });
  });

  it("should handle errors gracefully and return defaults", async () => {
    jest
      .mocked(FingerprintJS.load)
      .mockRejectedValue(new Error("Fingerprint error"));
    jest.mocked(global.fetch).mockRejectedValue(new Error("Fetch IP error"));

    const { result } = renderHook(() => useDeviceInfo());

    await waitFor(() => {
      expect(result.current.deviceInfo).toEqual({
        fingerprint: "Unknown",
        deviceName: "iOS 14.4 (mockedDeviceModel)",
        deviceType: "mobile",
        ipAddress: "Unknown",
      });
    });
  });
});
