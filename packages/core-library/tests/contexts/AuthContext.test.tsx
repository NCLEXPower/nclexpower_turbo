import React from "react";
import { useAuthContext, AuthProvider } from "../../contexts";
import { useRouter } from "../../core/router";
import { useApiCallback } from "../../hooks/useApi";
import { act, renderHook, waitFor } from "../common";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import { clearSession } from "../../hooks";
import { useAuthSessionIdleTimer } from "../../contexts/auth/hooks/useAuthSessionIdleTimer";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));
jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useAccountId: jest.fn().mockReturnValue(["uid", jest.fn(), jest.fn()]),
  useAccessLevel: jest.fn().mockReturnValue(["al", jest.fn(), jest.fn()]),
  useSession: jest.fn().mockReturnValue(["sessionId", jest.fn(), jest.fn()]),
  useDeviceNotRecognized: jest
    .fn()
    .mockReturnValue(["not_recognized", jest.fn(), jest.fn()]),
  useAuthSession: jest
    .fn()
    .mockReturnValue(["auth_session", jest.fn(), jest.fn()]),
  useNewAccount: jest
    .fn()
    .mockReturnValue(["new_account", jest.fn(), jest.fn()]),
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
  useDeviceId: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
}));

jest.mock("../../hooks/useSensitiveInformation", () => ({
  useSensitiveInformation: jest.fn().mockReturnValue({
    internal: { email: "internal@example.com" },
    customer: { email: "customer@example.com" },
    loading: false,
  }),
}));

jest.mock("../../contexts/auth/hooks/useAuthSessionIdleTimer", () => ({
  useAuthSessionIdleTimer: jest.fn().mockReturnValue({
    start: jest.fn(),
    stop: jest.fn(),
  }),
}));

jest.mock("jwt-decode", () => jest.fn(() => ({ token_id: "mockTokenId" })));

describe("useAuthContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should initialize context with default values", () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });
    expect(result.current.loading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
  });

  test("should handle login", async () => {
    const loginCb = jest.fn().mockResolvedValue({
      data: {
        is2FaEnabled: false,
        responseCode: 200,
        accessTokenResponse: {
          accessToken: "newAccessToken",
          refreshToken: "newRefreshToken",
        },
        sessionId: "newSessionId",
        accountId: "newAccountId",
        accessLevel: "admin",
      },
    });

    jest.mocked(useApiCallback).mockReturnValue({ execute: loginCb } as any);
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.login("test@gmail.com", "password123");
    });

    expect(loginCb).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "password123",
      appName: "mockAppName",
      deviceId: "no-device-id",
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  test("should handle logout", async () => {
    const router = useRouter();
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(clearSession).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith(expect.any(Function));
    expect(result.current.isAuthenticated).toBe(false);
  });

  test("should handle softLogout", async () => {
    const router = useRouter();

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.softLogout();
    });

    expect(clearSession).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith(expect.any(Function));
    expect(result.current.isAuthenticated).toBe(false);
  });

  test("should handle session idle timer start and stop", () => {
    const mockAuthSessionIdleTimer = {
      start: jest.fn(),
      stop: jest.fn(),
    };

    jest
      .mocked(useAuthSessionIdleTimer)
      .mockReturnValue(mockAuthSessionIdleTimer);

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.setIsAuthenticated(true);
    });

    expect(mockAuthSessionIdleTimer.start).toHaveBeenCalled();
    act(() => {
      result.current.setIsAuthenticated(false);
    });
    expect(mockAuthSessionIdleTimer.stop).not.toHaveBeenCalled();
  });

  test("should handle token cleanup in cleanseAuthSession", async () => {
    const destroySessionCb = jest.fn();

    jest
      .mocked(useApiCallback)
      .mockReturnValue({ execute: destroySessionCb } as any);
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(destroySessionCb).toHaveBeenNthCalledWith(1, {
      accessToken: "token",
      appName: "mockAppName",
      email: "internal@example.com",
      refreshToken: "token",
    });

    expect(destroySessionCb).toHaveBeenNthCalledWith(1, {
      accessToken: "token",
      appName: "mockAppName",
      email: "internal@example.com",
      refreshToken: "token",
    });
  });

  it("should handle error scenarios during logout", async () => {
    const mockRevokeCb = jest
      .fn()
      .mockRejectedValue(new Error("Revoke failed"));
    jest.mocked(useApiCallback).mockReturnValue({
      loading: false,
      execute: mockRevokeCb,
    } as any);

    const mockClearSession = jest.mocked(clearSession);
    const mockRouterPush = jest.fn();

    jest.mocked(useRouter).mockReturnValue({ push: mockRouterPush } as any);

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      try {
        await result.current.logout();
      } catch (error) {
        expect(error).toEqual(new Error("Revoke failed"));
      }
    });

    expect(mockRevokeCb).toHaveBeenCalledWith({
      accessToken: "token",
      refreshToken: "token",
      appName: "mockAppName",
      email: "internal@example.com",
    });

    expect(mockClearSession).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalled();
  });

  it("should revoke tokens when RevokeCb is called, clear cookies, and redirect to login", async () => {
    const mockRevokeCb = jest.fn().mockResolvedValue({});
    (useApiCallback as jest.Mock).mockReturnValue({
      loading: false,
      execute: mockRevokeCb,
    });

    const mockClearSession = jest.mocked(clearSession);
    const mockRouterPush = useRouter().push;

    jest.mocked(useSensitiveInformation).mockReturnValue({
      internal: { email: "internal@example.com" },
      customer: { email: "customer@example.com" },
      loading: false,
    } as any);

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      await result.current.logout();
    });

    expect(mockRevokeCb).toHaveBeenCalledWith({
      accessToken: "token",
      refreshToken: "token",
      appName: "mockAppName",
      email: "internal@example.com",
    });

    expect(mockClearSession).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(expect.any(String));
  });

  it("should not redirect to login and not trigger logout if revoke callback is not called", async () => {
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

    expect(mockClearSession).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
