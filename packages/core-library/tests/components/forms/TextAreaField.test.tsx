import { TextareaComponent } from "../../../components/forms/TextAreaField";
import { fireEvent, render, waitFor } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks", () => ({
  useResolution: jest.fn().mockReturnValue({ isMobile: false }),
  useApiCallback: jest.fn().mockImplementation(() => ({
    loading: false,
    execute: jest.fn(),
  })),
  useSessionStorage: jest
    .fn()
    .mockImplementation(() => [undefined, jest.fn(), jest.fn()]),
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe("TextareaComponent", () => {
  it("renders correctly with default props", () => {
    const { getByRole } = render(<TextareaComponent />);
    const textareaElement = getByRole("textbox");
    expect(textareaElement).toBeInTheDocument();
  });

  it("renders with custom data-testid", () => {
    const { getByTestId } = render(
      <TextareaComponent data-testid="custom-testid" />
    );
    const textareaElement = getByTestId("custom-testid");
    expect(textareaElement).toBeInTheDocument();
  });
});
