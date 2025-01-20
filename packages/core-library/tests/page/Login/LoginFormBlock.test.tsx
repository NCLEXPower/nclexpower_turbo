import { useAuthContext } from "../../../contexts";
import { LoginFormBlock } from "../../../system/app/internal/blocks";
import { LoginForm } from "../../../system/app/internal/blocks/LoginFormBlock/LoginForm";
import { render, screen, fireEvent, waitFor } from "../../common";

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

describe("LoginFormBlock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should uncheck the 'Remember Me' checkbox when rememberMe is false", () => {
    render(<LoginFormBlock />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders LoginForm with correct initial props", () => {
    render(<LoginFormBlock />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("toggles Remember Me checkbox", () => {
    render(<LoginFormBlock />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("should pre-fill the inputs with savedData", () => {
    render(
      <LoginForm
        onSubmit={jest.fn()}
        submitLoading={false}
        rememberMe={true}
        savedData={{
          email: "test@example.com",
          password: "password123",
          rememberMe: true,
        }}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(screen.getByPlaceholderText("Enter your email")).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByPlaceholderText("Enter your password")).toHaveValue(
      "password123"
    );
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
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });
});
