import React from "react";
import { useRouter } from "../../../core";
import { useApiCallback } from "../../../hooks";
import { act, renderHook, waitFor } from "../../common";
import {
  useAccessToken,
  useRefreshToken,
  useAccountReference,
  useTwoFactorAuthenticationToken,
  useResolvedProductId,
  useSession,
} from "../../../contexts/auth/hooks";
import { useAuthSessionIdleTimer } from "../../../contexts/auth/hooks/useAuthSessionIdleTimer";
import { clearSession } from "../../../hooks";
import { useClearCookies } from "../../../hooks/useClearCookies";
import { useLazyCreate } from "../../../contexts/auth/hooks/useLazyCreate";
import { useStandardAuth } from "../../../contexts/auth/standard/useStandardAuth";

jest.mock("../../../config", () => ({
  config: {
    value: {
      BASEAPP: "mockAppName",
      SECRET_KEY:
        "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
  },
}));

jest.mock("../../../contexts/auth/hooks", () => ({
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
  useTwoFactorAuthenticationToken: jest
    .fn()
    .mockReturnValue(["2FAToken", jest.fn(), jest.fn()]),
  useAccountReference: jest
    .fn()
    .mockReturnValue(["accountReference", jest.fn(), jest.fn()]),
  useResolvedProductId: jest
    .fn()
    .mockReturnValue(["resolved_pi", jest.fn(), jest.fn()]),
}));

jest.mock("../../../contexts/auth/hooks/useLazyCreate");

jest.mock("../../../hooks/useSessionStorage");

jest.mock("../../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest.fn().mockImplementation((callback) => {
    if (callback.name === "login")
      return {
        loading: false,
        execute: jest.fn().mockImplementation((params) => {
          console.log("Mock login called with:", params);
          return Promise.resolve({
            data: {
              accessTokenResponse: {
                accessToken: "newAccessToken",
                refreshToken: "newRefreshToken",
              },
              accountReference: "account123",
              sessionId: "session123",
              twoFactorAuthInformation: {
                has2FactorAuthentication: false,
              },
            },
          });
        }),
      };
    return {
      loading: false,
      execute: jest.fn(),
    };
  }),
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("../../../hooks/useClearCookies", () => ({
  useClearCookies: jest.fn().mockReturnValue([jest.fn()]),
}));

jest.mock("../../../hooks/useCookie", () => ({
  useSingleCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
  useDeviceId: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
  useAccountIdCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
  useAnalyticsDetails: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
  useReferenceCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
  useTwoFactorAuthenticationCookie: jest
    .fn()
    .mockReturnValue([null, jest.fn(), jest.fn()]),
}));

jest.mock("../../../contexts/auth/hooks/useAuthSessionIdleTimer", () => ({
  useAuthSessionIdleTimer: jest.fn().mockReturnValue({
    start: jest.fn(),
    stop: jest.fn(),
  }),
}));

jest.mock("jwt-decode", () => jest.fn(() => ({ token_id: "mockTokenId" })));

describe("useStandardAuth", () => {
  const mockLoginCb = {
    execute: jest.fn(),
    loading: false,
  };

  const mockLogoutCb = {
    execute: jest.fn(),
    loading: false,
  };

  const mockSetAccessToken = jest.fn();
  const mockSetRefreshToken = jest.fn();
  const mockSetTwoFactorAuthToken = jest.fn();
  const mockClearTwoFactorAuth = jest.fn();
  const mockSetAccountReference = jest.fn();
  const mockSetSingleCookie = jest.fn();
  const mockSetReference = jest.fn();
  const mockSetTwoFactorAuthCookie = jest.fn();
  const mockClearResolvedProductId = jest.fn();
  const mockSetSession = jest.fn();
  const mockRouterPush = jest.fn();
  const mockClearCookies = jest.fn();
  const mockIdleTimer = {
    start: jest.fn(),
    stop: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAccessToken as jest.Mock).mockReturnValue([
      "initialToken",
      mockSetAccessToken,
    ]);

    (useApiCallback as jest.Mock).mockImplementation((callback) => {
      if (callback.name === "login") {
        return {
          loading: false,
          execute: jest.fn().mockResolvedValue({
            data: {
              accessTokenResponse: {
                accessToken: "newAccessToken",
                refreshToken: "newRefreshToken",
              },
              accountReference: "account123",
              sessionId: "session123",
              twoFactorAuthInformation: {
                has2FactorAuthentication: false,
              },
            },
          }),
        };
      }
      return {
        loading: false,
        execute: jest.fn(),
      };
    });

    (useAuthSessionIdleTimer as jest.Mock).mockReturnValue(mockIdleTimer);
    (useClearCookies as jest.Mock).mockReturnValue([mockClearCookies]);
    (useLazyCreate as jest.Mock).mockReturnValue({
      create: jest.fn(),
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    (useRefreshToken as jest.Mock).mockReturnValue([
      "initialRefreshToken",
      mockSetRefreshToken,
    ]);
    (useTwoFactorAuthenticationToken as jest.Mock).mockReturnValue([
      null,
      mockSetTwoFactorAuthToken,
      mockClearTwoFactorAuth,
    ]);
    (useAccountReference as jest.Mock).mockReturnValue([
      null,
      mockSetAccountReference,
    ]);
    (useResolvedProductId as jest.Mock).mockReturnValue([
      null,
      null,
      mockClearResolvedProductId,
    ]);
    (useSession as jest.Mock).mockReturnValue(["mockSession", mockSetSession]);
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useStandardAuth());
    expect(result.current.loading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAuthenticating).toBe(false);
  });

  describe("Authentication Flow", () => {
    it("should handle successful login without 2FA", async () => {
      const { result } = renderHook(() => useStandardAuth());

      await act(async () => {
        await result.current.login({
          email: "test@arxenius.com",
          password: "123",
        });
      });

      const apiCallbackMock = (useApiCallback as jest.Mock).mock.results[0]
        .value;
      expect(apiCallbackMock.execute).toHaveBeenCalledWith({
        email: "test@arxenius.com",
        password: "123",
      });
    });

    it("should reject login when email is missing", async () => {
      const { result } = renderHook(() => useStandardAuth());
      await expect(
        act(async () => {
          await result.current.login({ email: "", password: "validpass" });
        })
      ).rejects.toThrow("Email and password are required");
    });

    it("should handle successful logout", async () => {
      const mockAuthSessionIdleTimer = {
        start: jest.fn(),
        stop: jest.fn(),
      };

      jest
        .mocked(useAuthSessionIdleTimer)
        .mockReturnValue(mockAuthSessionIdleTimer);

      const { result } = renderHook(() => useStandardAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(clearSession).toHaveBeenCalled();
      expect(mockClearCookies).toHaveBeenCalled();
      expect(result.current.isAuthenticated).toBe(false);
      expect(mockAuthSessionIdleTimer.stop).toHaveBeenCalled();
    });

    it("should handle softLogout", async () => {
      const mockAuthSessionIdleTimer = {
        start: jest.fn(),
        stop: jest.fn(),
      };

      jest
        .mocked(useAuthSessionIdleTimer)
        .mockReturnValue(mockAuthSessionIdleTimer);

      const { result } = renderHook(() => useStandardAuth());

      await act(async () => {
        await result.current.softLogout();
      });

      expect(clearSession).toHaveBeenCalled();
      expect(mockClearCookies).toHaveBeenCalled();
      expect(result.current.isAuthenticated).toBe(false);
      expect(mockAuthSessionIdleTimer.stop).toHaveBeenCalled();
    });

    it("should handle session idle timer start and stop", () => {
      const mockAuthSessionIdleTimer = {
        start: jest.fn(),
        stop: jest.fn(),
      };

      jest
        .mocked(useAuthSessionIdleTimer)
        .mockReturnValue(mockAuthSessionIdleTimer);

      const { result } = renderHook(() => useStandardAuth());

      act(() => {
        result.current.setIsAuthenticated(true);
      });

      expect(mockAuthSessionIdleTimer.start).toHaveBeenCalled();
      act(() => {
        result.current.setIsAuthenticated(false);
      });
      expect(mockAuthSessionIdleTimer.stop).toHaveBeenCalled();
    });

    it("should handle successful registration", async () => {
      const mockResponse = {
        data: {
          responseCode: 200,
          accessTokenResponse: {
            accessToken: "newAccessToken",
            refreshToken: "newRefreshToken",
          },
          accountReference: "account123",
          sessionId: "session123",
        },
        status: 200,
      };

      jest.mocked(useLazyCreate).mockReturnValueOnce({
        create: jest.fn().mockResolvedValue(mockResponse),
        loading: false,
      } as any);

      const { result } = renderHook(() => useStandardAuth());

      const registrationData = {
        firstname: "John",
        middlename: "Q",
        lastname: "Doe",
        reference: "product123",
        email: "john.doe@example.com",
        password: "securePassword123",
        orderNumber: "ORDER123",
        isAgreeWithPrivacyPolicy: true,
        isTrial: false,
      };

      await act(async () => {
        const response = await result.current.register(registrationData);
        expect(response).toEqual(mockResponse);
      });
    });
  });
});
