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

jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn(),
  useAccountId: jest.fn(),
}));

// Mock data for tokenized information
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
  let mockAccessToken: jest.Mock;
  let mockAccountId: jest.Mock;
  let mockExecute: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up mocked hooks
    mockAccessToken = jest.mocked(useAccessToken, true);
    mockAccountId = jest.mocked(useAccountId, true);
    mockExecute = jest.fn();

    // Default mock implementations
    mockAccessToken.mockReturnValue([
      "mock-access-token",
      jest.fn(),
      jest.fn(),
    ]);
    mockAccountId.mockReturnValue(["mock-account-id", jest.fn(), jest.fn()]);

    jest.mocked(useApiCallback).mockReturnValue({
      execute: mockExecute,
    } as any);
  });

  it("should validate tokenize information and set internal and customer info", async () => {
    // Mock API call success
    mockExecute.mockResolvedValue({
      data: {
        tokenizeInformation: mockTokenizeInfo,
        customerTokenizationInformation: mockCustomerTokenizeInfo,
      },
    });

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    // Assert API call
    expect(mockExecute).toHaveBeenCalledWith({
      accessToken: "mock-access-token",
      accountId: "mock-account-id",
      appName: "test-app",
    });

    // Assert result
    expect(result.current.internal).toEqual(mockTokenizeInfo);
    expect(result.current.customer).toEqual(mockCustomerTokenizeInfo);
  });

  it("should not make API call if accountId or accessToken is missing or undefined", async () => {
    // Mock missing tokens
    mockAccessToken.mockReturnValue([undefined, jest.fn(), jest.fn()]);
    mockAccountId.mockReturnValue([undefined, jest.fn(), jest.fn()]);

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    // Assert no API call
    expect(mockExecute).not.toHaveBeenCalled();
    expect(result.current.internal).toBeUndefined();
    expect(result.current.customer).toBeUndefined();
  });

  it("should handle API call failure", async () => {
    // Mock API call failure
    mockExecute.mockRejectedValue(new Error("API call failed"));

    const { result, rerender } = renderHook(() => useSensitiveInformation());

    await act(async () => {
      rerender();
    });

    // Assert API call
    expect(mockExecute).toHaveBeenCalledWith({
      accessToken: "mock-access-token",
      accountId: "mock-account-id",
      appName: "test-app",
    });

    // Assert error handling
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
