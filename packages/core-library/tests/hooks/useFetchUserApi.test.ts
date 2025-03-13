import axios from "axios";
import { config } from "../../config";
import { useFetchUserApi } from "../../hooks";
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

describe("useFetchUserApi", () => {
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

  it("should initialize with null ip, null error, and loading as true", () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    const { result } = renderHook(() => useFetchUserApi());
    
    expect(result.current.ip).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();
  });

  it("should fetch IP when valid API key is provided", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    const mockIp = "192.168.1.1";
    const mockApiKey = "valid-key";
    
    mockAxios.get
      .mockResolvedValueOnce({ data: { ip: mockIp } })
      .mockResolvedValueOnce({ data: { ip: mockIp } });

    const { result } = renderHook(() => useFetchUserApi(mockApiKey));

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(result.current.ip).toBe(mockIp);
    expect(result.current.loading).toBe(false);
  });

  it("should handle error from initial IP fetch", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    const errorMessage = "Network Error";
    mockAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchUserApi("valid-key"));

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

    const { result } = renderHook(() => useFetchUserApi("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it("should not fetch in production environment", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    const { result } = renderHook(() => useFetchUserApi("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(true);
  });

  it("should handle missing IP in initial response", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    mockAxios.get.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useFetchUserApi("valid-key"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Failed to retrieve client IP address.");
    expect(result.current.loading).toBe(false);
  });
});