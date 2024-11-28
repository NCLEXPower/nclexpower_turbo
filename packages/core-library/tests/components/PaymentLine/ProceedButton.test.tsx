import { act, render, screen, userEvent } from "../../common";
import { ProceedButton } from "../../../../../apps/web-customer/src/components/payment-line/steps/content/components/ProceedButton";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const handleClick = jest.fn();

describe("ProceedButton", () => {
  it("should render the proceed button", () => {
    act(() => {
      render(
        <ProceedButton
          onClick={handleClick}
          disabled={false}
          btnTitle="Proceed"
        />
      );
    });
  });

  it("should call the onClick function upon clicking the button", async () => {
    render(
      <ProceedButton
        onClick={handleClick}
        disabled={false}
        btnTitle="Proceed"
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("proceed-button"));
    });
    expect(handleClick).toHaveBeenCalled();
  })

  it("should disable the proceed button", async () => {
    render(
      <ProceedButton
        onClick={handleClick}
        disabled={true}
        btnTitle="Proceed"
      />
    );
    expect(screen.getByTestId("proceed-button")).toBeDisabled();
  })

  it("should show the right button title or placeholder", async () => {
    render(
      <ProceedButton
        onClick={handleClick}
        disabled={false}
        btnTitle="Proceed to Login"
      />
    );
    expect(screen.getByText("Proceed to Login")).toBeInTheDocument();
  })
});
