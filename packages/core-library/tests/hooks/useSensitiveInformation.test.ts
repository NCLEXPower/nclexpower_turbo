import { renderHook, act } from "../common";
import { useApiCallback, useSensitiveInformation } from "../../hooks";
import { useAccessToken, useAccountId } from "../../contexts/auth/hooks";
import {
  CustomerTokenizeInformations,
  TokenizeInformations,
} from "../../api/types";

jest.mock("../../config", () => ({
  config: {
    value: {
      BASEAPP: "test-app",
    },
  },
}));

jest.mock("../../hooks/useApi", () => ({
  useApiCallback: jest.fn(),
}));

jest.mock("../../contexts/auth/hooks.ts", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useAccountId: jest.fn().mockReturnValue(["uid", jest.fn(), jest.fn()]),
}));

const mockTokenizeInfo: TokenizeInformations = {
  email: "test@gmail.com",
  firstname: "test",
  id: "test-id",
  imgurl: "no-image",
  lastname: "test",
  middlename: "test",
};

const mockCustomerTokenizeInfo: CustomerTokenizeInformations = {
  email: "test@gmail.com",
  firstname: "test",
  id: "test-id",
  imgUrl: "no-image",
  lastname: "test",
  middlename: "test",
};

describe("useSensitiveInformation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate tokenize information and set internal and customer info", async () => {
    jest
      .mocked(useAccessToken)
      .mockReturnValue(["test-access-token", jest.fn(), jest.fn()]);
    jest
      .mocked(useAccountId)
      .mockReturnValue(["test-account-id", jest.fn(), jest.fn()]);

    const mockExecute = jest.fn().mockResolvedValue({
      data: {
        tokenizeInformation: mockTokenizeInfo,
        customerTokenizationInformation: mockCustomerTokenizeInfo,
      },
    });
    jest.mocked(useApiCallback).mockReturnValue({
      execute: mockExecute,
    } as any);

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    expect(mockExecute).toHaveBeenCalledWith({
      accessToken: "test-access-token",
      accountId: "test-account-id",
      appName: "test-app",
    });

    expect(result.current.internal).toEqual(mockTokenizeInfo);
    expect(result.current.customer).toEqual(mockCustomerTokenizeInfo);
  });

  it("should not make API call if accountId or accessToken is missing or undefined", async () => {
    jest
      .mocked(useAccessToken)
      .mockReturnValue([undefined, jest.fn(), jest.fn()]);
    jest
      .mocked(useAccountId)
      .mockReturnValue([undefined, jest.fn(), jest.fn()]);

    const mockExecute = jest.fn();
    jest.mocked(useApiCallback).mockReturnValue({
      execute: mockExecute,
    } as any);

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    expect(mockExecute).not.toHaveBeenCalled();
    expect(result.current.internal).toBeUndefined();
    expect(result.current.customer).toBeUndefined();
  });

  it("should handle API call failure", async () => {
    jest
      .mocked(useAccessToken)
      .mockReturnValue(["test-access-token", jest.fn(), jest.fn()]);
    jest
      .mocked(useAccountId)
      .mockReturnValue(["test-account-id", jest.fn(), jest.fn()]);

    const mockExecute = jest
      .fn()
      .mockRejectedValue(new Error("API call failed"));
    jest.mocked(useApiCallback).mockReturnValue({
      execute: mockExecute,
    } as any);

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    expect(mockExecute).toHaveBeenCalledWith({
      accessToken: "test-access-token",
      accountId: "test-account-id",
      appName: "test-app",
    });

    expect(result.current.internal).toBeUndefined();
    expect(result.current.customer).toBeUndefined();
    expect(result.current.error).toBe(
      "Failed to validate tokenize information"
    );
  });
  it("should have undefined initial values for internal and customer info", () => {
    const { result } = renderHook(() => useSensitiveInformation());

    expect(result.current.internal).toBeUndefined();
    expect(result.current.customer).toBeUndefined();
  });
});
