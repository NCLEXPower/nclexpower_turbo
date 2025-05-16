import axios from "axios";
import { config } from "../../config";
import { useFetchUserIp } from "../../hooks";
import { act, renderHook } from "../common";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  })),
  get: jest.fn(),
}));
jest.mock("../../config", () => ({
  config: {
    value: {
      APIIPURL: "https://mock-apiipurl.com",
      API64URL: "https://mock-api64url.com",
      APIIPKEY: "mock-api-key",
    },
  },
}));

describe("useFetchUserIp", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    config.value.APIIPKEY = "mock-api-key";
  });

  it("should handle error from initial IP fetch", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    const errorMessage = "Network Error";
    mockAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchUserIp("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it("should handle error from IP validation API", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    const mockIp = "192.168.1.1";
    const errorMessage = "Validation Failed";

    mockAxios.get
      .mockResolvedValueOnce({ data: { ip: mockIp } })
      .mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchUserIp("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it("should handle missing IP in initial response", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    mockAxios.get.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useFetchUserIp("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Failed to retrieve client IP address.");
    expect(result.current.loading).toBe(false);
  });

  it("should skip fetching and set loading to false if API key is not provided", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };

    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const { result } = renderHook(() => useFetchUserIp());

    await act(async () => {
      await Promise.resolve();
    });

    expect(warnSpy).toHaveBeenCalledWith(
      "API key is not provided. Skipping IP fetch."
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.ip).toBeNull();
    expect(result.current.error).toBeNull();

    warnSpy.mockRestore();
  });
});
