import { AxiosError } from "axios";
import { useAuthContext } from "../../contexts";
import { useAuthInterceptor, httpClient } from "../../hooks";
import Http from "../../http-client";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("axios");
jest.mock("../../http-client");
jest.mock("../../hooks/useApi");
jest.mock("../../contexts/auth/AuthContext");

describe("useAuthInterceptor", () => {
  let mockLogout: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogout = jest.fn();
    jest
      .mocked(useAuthContext)
      .mockReturnValue({ softLogout: mockLogout } as any);
  });

  it("should set up middleware options with error handler", async () => {
    const mockAxiosError = {
      name: "AxiosError",
      isAxiosError: true,
      response: {
        status: 401,
        data: {},
        statusText: "Unauthorized",
        headers: {},
        config: {},
      },
    };

    jest
      .mocked(httpClient.setupMiddlewareOptions)
      .mockImplementationOnce((options) => {
        expect(options).toHaveProperty("onErrorHandler");
        options.onErrorHandler(mockAxiosError as AxiosError, new Http({}));
        expect(mockLogout).toHaveBeenCalled();
      });

    renderHook(() => useAuthInterceptor());

    expect(httpClient.setupMiddlewareOptions).toHaveBeenCalled();
  });

  it("should not call logout if the error status is not 401", async () => {
    const mockAxiosError = {
      name: "AxiosError",
      isAxiosError: true,
      response: {
        status: 404,
        data: {},
        statusText: "Not Found",
        headers: {},
        config: {},
      },
    };
    jest
      .mocked(httpClient.setupMiddlewareOptions)
      .mockImplementationOnce((options) => {
        expect(options).toHaveProperty("onErrorHandler");
        options
          .onErrorHandler(mockAxiosError as AxiosError, new Http({}))
          .catch((e) => {});
        expect(mockLogout).not.toHaveBeenCalled();
      });

    renderHook(() => useAuthInterceptor());

    expect(httpClient.setupMiddlewareOptions).toHaveBeenCalled();
  });
});
