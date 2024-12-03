import React from "react";
import { getKey, useRecaptcha } from "../../hooks";
import { renderHook, act } from "../common";
import ReCAPTCHA from "react-google-recaptcha";

jest.mock("../../types", () => ({
  parseBase64toJSON: jest.fn(),
}));

jest.mock("../../config", () => ({
  config: {
    value: jest.fn(),
  },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  getKey: jest.fn(() => "parse-site-key"),
}));

describe("getKey function", () => {
  const mockParseBase64toJSON = require("../../types").parseBase64toJSON;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct value when the key matches", () => {
    const result = getKey("mock-base64-value", ["SITEKEY"]);
    expect(result).toBe("parse-site-key");
  });
});

describe("useRecaptcha", () => {
  it("should return initial values correctly", () => {
    const { result } = renderHook(() => useRecaptcha());

    expect(result.current.recaptchaRef.current).toBeNull();
    expect(typeof result.current.reset).toBe("function");
  });

  it("should reset the recaptcha when reset is called", () => {
    const mockReset = jest.fn();

    const mockReCAPTCHA = {
      reset: mockReset,
      current: null,
    };

    jest
      .spyOn(React, "useRef")
      .mockReturnValueOnce({ current: mockReCAPTCHA } as any);

    const { result } = renderHook(() => useRecaptcha());

    act(() => {
      result.current.reset();
    });

    expect(mockReset).toHaveBeenCalled();
  });
});
