import { useAuthContext } from "../../../contexts";
import { LoginFormBlock } from "../../../system/app/internal/blocks";
import { render, screen, fireEvent, waitFor } from "../../common";
import { useExecuteToast } from "../../../contexts/ToastContext";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts/auth/AuthContext.tsx", () => ({
  useAuthContext: jest.fn().mockReturnValue({
    login: jest.fn(),
    loading: false,
  }),
}));

jest.mock("../../../contexts/ToastContext", () => ({
  useExecuteToast: jest.fn(() => ({
    executeToast: jest.fn(),
    showToast: jest.fn(),
  })),
}));

describe("LoginFormBlock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders LoginForm with correct initial props", () => {
    render(<LoginFormBlock />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("should call login with correct email and password on form submit", async () => {
    const mockLogin = jest.fn();

    (useAuthContext as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    render(<LoginFormBlock />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByTestId("signin");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123"
      });
    });
  });

  it("should handle unexpected login errors and log them", async () => {
    const loginError = new Error("Network Error");
    const mockLogin = jest.fn().mockRejectedValue(loginError);
    (useAuthContext as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });
  
    const showToastMock = jest.fn();
    (useExecuteToast as jest.Mock).mockReturnValue({
      executeToast: jest.fn(),
      showToast: showToastMock,
    });
  
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  
    render(<LoginFormBlock />);
  
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByTestId("signin");
  
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);
  
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123"
      });
    });
  
    await new Promise((r) => setTimeout(r, 0));
  
    await waitFor(() => {
      expect(showToastMock).toHaveBeenCalledWith(
        "Something went wrong during login",
        "error"
      );
      expect(consoleErrorMock).toHaveBeenCalledWith(
        `Something went wrong during login: ${loginError}`
      );
    });
  
    consoleErrorMock.mockRestore();
  });
});