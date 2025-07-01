import {
  useAnalyticsDetails,
  useCookie,
  useReferenceCookie,
  useSingleCookie,
  useTwoFactorAuthenticationCookie,
} from "../../hooks/useCookie";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

const key = "test";
const anotherKey = "anotherTest";

let mockCookies: Record<string, string | null> = {
  session_cookie: null,
  analytics: null,
  reference_cookie: null,
  "2faToken": null,
};

jest.mock("react-cookie", () => ({
  useCookies: jest.fn().mockImplementation((keys: string[]) => [
    mockCookies,
    (key: string, newValue: string | null, options?: any) => {
      mockCookies[key] = newValue;
    },
    (key: string, options?: any) => {
      mockCookies[key] = null;
    },
  ]),
}));

describe("useCookie", () => {
  const key = "test";
  const anotherKey = "anotherTest";

  afterEach(() => {
    mockCookies[key] = null;
    mockCookies[anotherKey] = null;
  });

  it("should return initial cookie value as null", () => {
    const { result } = renderHook(() => useCookie(key));
    expect(result.current[0]).toBeUndefined();
  });

  it("should set and get cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    rerender();
    expect(result.current[0]).toBe("testValue");
  });

  it("should clear cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    result.current[2](); // Clear the cookie
    rerender();
    expect(result.current[0]).toBeNull();
  });

  it("should set cookie with default options", () => {
    const { result } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    expect(mockCookies[key]).toBe("testValue");
  });

  it("should maintain separate values for different keys", () => {
    const { result: firstHook } = renderHook(() => useCookie(key));
    const { result: secondHook } = renderHook(() => useCookie(anotherKey));

    firstHook.current[1]("value1");
    secondHook.current[1]("value2");

    expect(mockCookies[key]).toBe("value1");
    expect(mockCookies[anotherKey]).toBe("value2");
  });

  it("should remove only the targeted cookie", () => {
    const { result: firstHook } = renderHook(() => useCookie(key));
    const { result: secondHook } = renderHook(() => useCookie(anotherKey));

    firstHook.current[1]("value1");
    secondHook.current[1]("value2");

    firstHook.current[2](); // Remove only the first key

    expect(mockCookies[key]).toBeNull();
    expect(mockCookies[anotherKey]).toBe("value2");
  });
});

describe("Custom Cookie Hooks", () => {
  beforeEach(() => {
    // Reset all cookies before each test
    mockCookies.session_cookie = null;
    mockCookies.analytics = null;
    mockCookies.reference_cookie = null;
    mockCookies["2faToken"] = null;
  });

  describe("useSingleCookie", () => {
    it("should use the correct cookie key from config", () => {
      const { result } = renderHook(() => useSingleCookie());
      expect(result.current[0]).toBeUndefined();
    });

    it("should clear session cookie", () => {
      const { result, rerender } = renderHook(() => useSingleCookie());
      result.current[1]("session_value");
      result.current[2]();
      rerender();
      expect(result.current[0]).toBeNull();
      expect(mockCookies.session_cookie).toBeNull();
    });
  });

  describe("useAnalyticsDetails", () => {
    it("should use 'analytics' as cookie key", () => {
      const { result } = renderHook(() => useAnalyticsDetails());
      expect(result.current[0]).toBeNull();
    });

    it("should set and get analytics cookie value", () => {
      const { result, rerender } = renderHook(() => useAnalyticsDetails());
      result.current[1]("analytics_value");
      rerender();
      expect(result.current[0]).toBe("analytics_value");
      expect(mockCookies.analytics).toBe("analytics_value");
    });

    it("should clear analytics cookie", () => {
      const { result, rerender } = renderHook(() => useAnalyticsDetails());
      result.current[1]("analytics_value");
      result.current[2]();
      rerender();
      expect(result.current[0]).toBeNull();
      expect(mockCookies.analytics).toBeNull();
    });
  });

  describe("useReferenceCookie", () => {
    it("should clear reference cookie", () => {
      const { result, rerender } = renderHook(() => useReferenceCookie());
      result.current[1]("reference_value");
      result.current[2]();
      rerender();
      expect(result.current[0]).toBeNull();
      expect(mockCookies.reference_cookie).toBeNull();
    });
  });

  describe("useTwoFactorAuthenticationCookie", () => {
    it("should use '2faToken' as cookie key", () => {
      const { result } = renderHook(() => useTwoFactorAuthenticationCookie());
      expect(result.current[0]).toBeNull();
    });

    it("should set and get 2FA token cookie value", () => {
      const { result, rerender } = renderHook(() =>
        useTwoFactorAuthenticationCookie()
      );
      result.current[1]("2fa_token_value");
      rerender();
      expect(result.current[0]).toBe("2fa_token_value");
      expect(mockCookies["2faToken"]).toBe("2fa_token_value");
    });

    it("should clear 2FA token cookie", () => {
      const { result, rerender } = renderHook(() =>
        useTwoFactorAuthenticationCookie()
      );
      result.current[1]("2fa_token_value");
      result.current[2]();
      rerender();
      expect(result.current[0]).toBeNull();
      expect(mockCookies["2faToken"]).toBeNull();
    });
  });

  describe("Cookie Isolation", () => {
    it("should clear cookies independently", () => {
      const { result: sessionHook } = renderHook(() => useSingleCookie());
      const { result: analyticsHook } = renderHook(() => useAnalyticsDetails());

      sessionHook.current[1]("session1");
      analyticsHook.current[1]("analytics1");

      sessionHook.current[2]();

      expect(mockCookies.session_cookie).toBeNull();
      expect(mockCookies.analytics).toBe("analytics1");
    });
  });
});
