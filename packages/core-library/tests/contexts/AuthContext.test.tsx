import React from "react";
import { useAuthContext, AuthProvider } from "../../contexts";
import { useRouter } from "../../core/router";
import { useApiCallback } from "../../hooks/useApi";
import { renderHook, waitFor } from "../common";
import { useSensitiveInformation } from "../../hooks/useSensitiveInformation";
import { clearSession } from "../../hooks";
import { exec } from "child_process";

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
      integrateDeviceInUseUpdater: expect.any(Function),
      loginFromSso: expect.any(Function),
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
