import { useCookie } from "../../hooks/useCookie";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

const key: string = "test";
const anotherKey = "anotherTest";
let value: Record<string, string | null> = { [key]: null };

jest.mock("react-cookie", () => ({
  useCookies: jest
    .fn()
    .mockImplementation(() => [
      value,
      (...args: string[]) => (value[key] = args[1]),
      () => (value[key] = null),
    ]),
}));

describe("useCookie", () => {
  afterEach(() => {
    value[key] = null;
  });

  it("should return cookie value", () => {
    const { result } = renderHook(() => useCookie(key));
    expect(result.current[0]).toBeNull();
  });

  it("should set cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    rerender();
    expect(result.current[0]).toBe("testValue");
  });

  it("should clear cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    result.current[2]();
    rerender();
    expect(result.current[0]).toBeNull();
  });

  it("should set cookie with default options", () => {
    const { result } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    expect(value[key]).toBe("testValue");
  });

  it("should set cookie with custom options", () => {
    const { result } = renderHook(() => useCookie(key));
    result.current[1]("customValue", { path: "/custom", secure: true });
    expect(value[key]).toBe("customValue");
  });

  it("should clear cookie with correct path", () => {
    const { result } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    result.current[2]();
    expect(value[key]).toBeNull();
  });

  it("should maintain separate values for different keys", () => {
    const { result: firstHook } = renderHook(() => useCookie(key));
    const { result: secondHook } = renderHook(() => useCookie(anotherKey));

    firstHook.current[1]("value1");
    secondHook.current[1]("value2");

    expect(value[key]).toBe("value2");
    expect(value[anotherKey]).toBe(undefined);
  });

  it("should remove only the targeted cookie", () => {
    const { result: firstHook } = renderHook(() => useCookie(key));
    const { result: secondHook } = renderHook(() => useCookie(anotherKey));

    firstHook.current[1]("value1");
    secondHook.current[1]("value2");

    firstHook.current[2](); // Remove only the first key

    expect(value[key]).toBeNull();
    expect(value[anotherKey]).toBe(undefined);
  });
});
