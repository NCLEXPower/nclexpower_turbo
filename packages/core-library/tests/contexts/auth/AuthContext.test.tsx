import "@testing-library/jest-dom/extend-expect";
import {
  AuthProvider,
  useAuthContext,
  useSafeAuthContext,
} from "../../../contexts";
import { useStandardAuth } from "../../../contexts/auth/standard/useStandardAuth";
import { AUTH_METHODS } from "../../../contexts/auth/types";
import { act, render, renderHook, screen } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));
jest.mock("../../../contexts/auth/standard/useStandardAuth");

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockedUseStandardAuth = useStandardAuth as jest.Mock;

const TestConsumer = () => {
  const auth = useAuthContext();
  return (
    <div>
      <div data-testid="loading">{auth.loading.toString()}</div>
      <div data-testid="is-authenticated">
        {auth.isAuthenticated.toString()}
      </div>
      <div data-testid="is-authenticating">
        {auth.isAuthenticating.toString()}
      </div>
      <button
        data-testid="login-button"
        onClick={() =>
          auth.login({
            email: "",
            password: "",
          })
        }
      >
        Login
      </button>
      <button data-testid="logout-button" onClick={() => auth.logout()}>
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  const mockLoginFn = jest.fn();
  const mockLogoutFn = jest.fn();
  const mockRegisterFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseStandardAuth.mockReturnValue({
      loading: false,
      isAuthenticating: false,
      isAuthenticated: false,
      login: mockLoginFn,
      logout: mockLogoutFn,
      register: mockRegisterFn,
      softLogout: jest.fn(),
      setIsAuthenticated: jest.fn(),
      setIsAuthTasksRunning: jest.fn(),
      setSecurityMeasures: jest.fn(),
    });
  });

  it("renders StandardAuthProvider by default", async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(mockedUseStandardAuth).toHaveBeenCalled();
  });

  it("passes auth actions from StandardAuth to children", async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    await act(async () => {
      screen.getByTestId("login-button").click();
    });
    expect(mockLoginFn).toHaveBeenCalled();

    await act(async () => {
      screen.getByTestId("logout-button").click();
    });
    expect(mockLogoutFn).toHaveBeenCalled();
  });

  it("hides children during OpenAM authentication", async () => {
    await act(async () => {
      render(
        <AuthProvider authMethod={AUTH_METHODS.OPENAM}>
          <TestConsumer />
        </AuthProvider>
      );
    });
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("throws an error when useAuthContext is used outside of AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuthContext());
    }).toThrow("useAuthContext must be used within an AuthProvider");
  });

  it("provides default values when useSafeAuthContext is used outside of AuthProvider", () => {
    const { result } = renderHook(() => useSafeAuthContext());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isAuthenticating).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
  });
});
