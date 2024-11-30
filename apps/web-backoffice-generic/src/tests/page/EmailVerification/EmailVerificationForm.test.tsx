import { render, screen, fireEvent, waitFor } from "core-library/tests/common";
import { EmailVerificationForm } from "core-library/system/app/internal/blocks/Account/EmailVerification/EmailVerificationForm";
const onSubmitMock = jest.fn();

jest.mock("core-library/config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("core-library/core/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("lottie-react", () => () => <div>Lottie Animation</div>);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EmailVerificationForm", () => {
  it("should render the form email, submit and back to sign in button", () => {
    render(<EmailVerificationForm onSubmit={onSubmitMock} />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("continue-button")).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("should show success alert if the email is valid", () => {
    render(<EmailVerificationForm onSubmit={onSubmitMock} showAlert={true} />);

    const successAlert = screen.getByText(/successfully sent to your email/i);
    expect(successAlert).toBeInTheDocument();
  });

  it("should show error alert if the email is expired", () => {
    render(<EmailVerificationForm onSubmit={onSubmitMock} isExpired={true} />);

    const errorAlert = screen.getByText(
      /the account you are trying to access is already expired/i
    );
    expect(errorAlert).toBeInTheDocument();
  });

  it("should disable continue button if submitLoading is true", () => {
    render(
      <EmailVerificationForm onSubmit={onSubmitMock} submitLoading={true} />
    );

    const continueButton = screen.getByTestId("continue-button");
    expect(continueButton).toBeDisabled();
  });

  it("should call onSubmit when button is clicked", () => {
    render(
      <EmailVerificationForm onSubmit={onSubmitMock} submitLoading={false} />
    );

    const continueButton = screen.getByTestId("continue-button");

    fireEvent.click(continueButton);

    expect(onSubmitMock);
  });

  it("should prevent space key in email input", () => {
    render(<EmailVerificationForm onSubmit={onSubmitMock} />);

    const emailInput = screen.getByTestId("email-input")as HTMLInputElement;

    fireEvent.keyPress(emailInput, { key: " ", code: "Space", charCode: 32 });

    expect(emailInput.value).not.toContain(" ");
  });
});
