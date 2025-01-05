import { renderHook, act } from "../../common";
import axios from "axios";
import { useCountryFromIp } from "../../../hooks/ipCountry/useCountryFromIp";
import { config } from "../../../config";
import { CountryResponse } from "../../../hooks/ipCountry/types";

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
jest.mock("../../../config", () => ({
  config: {
    value: {
      APIIPURL: "https://mock-apiipurl.com",
      API64URL: "https://mock-api64url.com",
      APIIPKEY: "mock-api-key",
    },
  },
}));

describe("useCountryFromIp", () => {
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
  });

  it("should initialize with null geoData, null error, and loading as true", () => {
    process.env = { ...process.env, NODE_ENV: "production" };

    const { result } = renderHook(() => useCountryFromIp());

    expect(result.current.geoData).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();
  });

  it("should not fetch geoData in non-production environment if API key is not provided", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    config.value.APIIPKEY = null;

    const { result } = renderHook(() => useCountryFromIp());

    await act(async () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
    });

    expect(mockAxios.get).not.toHaveBeenCalled();

    expect(result.current.geoData).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();
  });

  it("should initialize with loading set to true and no geoData or error", () => {
    process.env = { ...process.env, NODE_ENV: "production" };

    const { result } = renderHook(() => useCountryFromIp("mock-api-key"));

    expect(result.current.geoData).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();
  });

  it("should handle errors when IP API call fails", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    const { result } = renderHook(() => useCountryFromIp("mock-api-key"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.geoData).toBeNull();
    expect(result.current.loading).toBeTruthy();
  });
});
