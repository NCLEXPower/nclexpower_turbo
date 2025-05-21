import { render, screen, fireEvent } from "../../../common";
import { CustomRadio } from "../../../../components";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("Radio", () => {
  it("renders with default props", () => {
    render(<CustomRadio value="test" />);
    const radioInput = screen.getByTestId("test-option");
    expect(radioInput).toBeInTheDocument();
    expect(radioInput).toHaveAttribute("type", "radio");
  });

  it("is checked when checked prop is true", () => {
    render(<CustomRadio value="test" checked />);
    const radioInput = screen.getByTestId("test-option");
    expect(radioInput).toBeChecked();
  });

  it("is not checked when checked prop is false", () => {
    render(<CustomRadio value="test" />);
    const radioInput = screen.getByTestId("test-option");
    expect(radioInput).not.toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<CustomRadio value="test" onChange={handleChange} />);
    const radioInput = screen.getByTestId("test-option");
    fireEvent.click(radioInput);
    expect(handleChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<CustomRadio value="test" disabled />);
    const radioInput = screen.getByTestId("test-option");
    expect(radioInput).toBeDisabled();
  });
});
