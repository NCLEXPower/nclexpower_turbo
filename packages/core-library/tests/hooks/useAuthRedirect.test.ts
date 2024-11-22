import { renderHook } from "../common";
import { useAuthRedirect, useValidateToken } from "../../hooks";
import { useRouter } from "../../core";
import { useAccessToken } from "../../contexts/auth/hooks";

jest.mock("../../config", () => ({
  config: {
    value: jest.fn(),
  },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
}));

jest.mock("../../hooks/useValidateToken", () => ({
  useValidateToken: jest.fn(),
}));

describe("useAuthRedirect", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ pathname: "", push: mockPush });
    (useAccessToken as jest.Mock).mockReturnValue(["mockAccessToken"]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to login if not authenticated", () => {
    (useValidateToken as jest.Mock).mockReturnValue({
      tokenValidated: false,
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/hub",
      push: mockPush,
    });

    const { result } = renderHook(() => useAuthRedirect(false));

    expect(mockPush).toHaveBeenCalledWith(expect.any(Function));
    expect(result.current).toBe(true);
  });

  it("should set isValidating to false if authenticated and not on login page", () => {
    (useValidateToken as jest.Mock).mockReturnValue({
      tokenValidated: true,
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/hub",
      push: mockPush,
    });

    const { result } = renderHook(() => useAuthRedirect(true));

    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current).toBe(true);
  });

  it("should keep isValidating true if loading", () => {
    (useValidateToken as jest.Mock).mockReturnValue({
      tokenValidated: false,
      loading: true,
    });
    const { result } = renderHook(() => useAuthRedirect(true));

    expect(result.current).toBe(true);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
