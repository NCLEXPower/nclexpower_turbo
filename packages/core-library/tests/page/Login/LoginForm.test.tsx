import { render, screen, fireEvent } from "../../common";
import { LoginForm } from "../../../system/app/internal/blocks/LoginFormBlock/LoginForm";

const mockOnSubmit = jest.fn();

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("LoginForm", () => {
  it("should render complete text, fields and button", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={false}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("signin")).toBeInTheDocument();
  });

  it("should toggle show password when clicked", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={false}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    const passwordInput = screen
      .getByTestId("password-input")
      .querySelector("input");

    const toggleButton = screen.getByTestId("toggle-password");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("should disable the Sign In button when submitLoading is true", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={true}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    const signInButton = screen.getByText("Sign In");
    expect(signInButton).toBeDisabled();
  });

  it("should enable the Sign In button when submitLoading is false", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={false}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    const signInButton = screen.getByText("Sign In");
    expect(signInButton).not.toBeDisabled();
  });

  it("should call onSubmit when button is clicked", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={false}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    const signInButton = screen.getByTestId("signin");

    fireEvent.click(signInButton);

    expect(mockOnSubmit);
  });

  it("should prevent space input in the email field", () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        submitLoading={false}
        rememberMe={false}
        handleChangeRememberMe={function (
          event: React.ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        savedData={null}
      />
    );

    const emailInput = screen.getByTestId("email-input").querySelector("input");

    fireEvent.keyPress(emailInput!, { key: " ", code: "Space", charCode: 32 });

    expect(emailInput).not.toHaveValue(" ");
  });
});
