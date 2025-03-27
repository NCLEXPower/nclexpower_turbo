import { useCookie, useDeviceId, useGeoCountry } from "../../hooks/useCookie";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

const key = "test";
const anotherKey = "anotherTest";

// Create an object to simulate the stored cookie values
let mockCookies: Record<string, string | null> = {
  geocountry: null,
  devid: null,
};

jest.mock("react-cookie", () => ({
  useCookies: jest.fn().mockImplementation((keys: string[]) => [
    mockCookies, // Return the mock state
    (key: string, newValue: string | null) => {
      mockCookies[key] = newValue; // Simulate setting a cookie
    },
    (key: string) => {
      mockCookies[key] = null; // Simulate removing a cookie
    },
  ]),
}));

describe("useCookie", () => {
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
  afterEach(() => {
    mockCookies.geocountry = null;
    mockCookies.devid = null;
  });

  it("should return initial value for useGeoCountry", () => {
    const { result } = renderHook(() => useGeoCountry());
    expect(result.current[0]).toBeNull();
  });

  it("should set and get value for useGeoCountry", () => {
    const { result, rerender } = renderHook(() => useGeoCountry());
    result.current[1]("US");
    rerender();
    expect(result.current[0]).toBe("US");
  });

  it("should clear value for useGeoCountry", () => {
    const { result, rerender } = renderHook(() => useGeoCountry());
    result.current[1]("US");
    result.current[2]();
    rerender();
    expect(result.current[0]).toBeNull();
  });

  it("should return initial value for useDeviceId", () => {
    const { result } = renderHook(() => useDeviceId());
    expect(result.current[0]).toBeNull();
  });

  it("should set and get value for useDeviceId", () => {
    const { result, rerender } = renderHook(() => useDeviceId());
    result.current[1]("device-123");
    rerender();
    expect(result.current[0]).toBe("device-123");
  });

  it("should clear value for useDeviceId", () => {
    const { result, rerender } = renderHook(() => useDeviceId());
    result.current[1]("device-123");
    result.current[2]();
    rerender();
    expect(result.current[0]).toBeNull();
  });
});
