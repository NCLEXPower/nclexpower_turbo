import React from "react";
import { useAuthContext, AuthProvider } from "../../contexts";
import { useRouter } from "../../core/router";
import { useApiCallback } from "../../hooks/useApi";
import { renderHook, waitFor } from "../common";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import { clearSession } from "../../hooks";
import { useClearCookies } from "../../hooks/useClearCookies";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));
jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useAccountId: jest.fn().mockReturnValue(["uid", jest.fn(), jest.fn()]),
  useAccessLevel: jest.fn().mockReturnValue(["al", jest.fn(), jest.fn()]),
}));
jest.mock("../../hooks/useSessionStorage");
jest.mock("../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest.fn().mockImplementation(() => ({
    loading: false,
    execute: jest.fn(),
  })),
}));
jest.mock("../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("../../hooks/useCookie", () => ({
  useSingleCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
}));
jest.mock("../../hooks/useClearCookies", () => ({
  useClearCookies: jest.fn().mockReturnValue([jest.fn()]),
}));

jest.mock("../../hooks/useSensitiveInformation", () => ({
  useSensitiveInformation: jest.fn().mockReturnValue({
    internal: { email: "internal@example.com" },
    customer: { email: "customer@example.com" },
    loading: false,
  }),
}));

describe("useAuthContext", () => {
  it("should return initial values", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    expect(result.current).toEqual({
      isAuthenticated: true,
      loading: false,
      login: expect.any(Function),
      logout: expect.any(Function),
      register: expect.any(Function),
      createInternal: expect.any(Function),
      setIsAuthenticated: expect.any(Function),
      verificationPreparation: expect.any(Object),
      setVerificationPreparation: expect.any(Function),
      setAccessToken: expect.any(Function),
      setRefreshToken: expect.any(Function),
      setSingleCookie: expect.any(Function),
      softLogout: expect.any(Function),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should revoke tokens when RevokeCb is called, clear cookies, and redirect to login", async () => {
    const mockRevokeCb = jest.fn().mockResolvedValue({});
    (useApiCallback as jest.Mock).mockReturnValue({
      loading: false,
      execute: mockRevokeCb,
    });

    const mockClearSession = jest.mocked(clearSession);
    const mockClearCookies = jest.mocked(useClearCookies);
    const mockRouterPush = useRouter().push;

    jest.mock("../../hooks/useSensitiveInformation", () => ({
      useSensitiveInformation: jest.fn(),
    }));

    (useSensitiveInformation as jest.Mock).mockReturnValue({
      internal: { email: "internal@example.com" },
      customer: { email: "customer@example.com" },
      loading: false,
    });

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      await result.current.logout();
    });

    jest.runAllTimers();

    expect(mockRevokeCb).toHaveBeenCalledWith({
      accessToken: "token",
      refreshToken: "token",
      appName: "mockAppName",
      email: "internal@example.com",
    });

    expect(mockClearCookies).toHaveBeenCalled();
    expect(mockClearSession).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should not redirect to login and not trigger logout if revoke callback is not called", async () => {
    const mockClearCookies = jest.fn();
    const mockClearSession = jest.fn();
    const mockRouterPush = jest.fn();

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      await result.current.logout();
    });

    expect(mockClearCookies).not.toHaveBeenCalled();
    expect(mockClearSession).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
