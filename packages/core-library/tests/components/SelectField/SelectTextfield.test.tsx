import React from "react";
import { render, screen } from "@testing-library/react";
import { FormHelperText } from "@mui/material";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

interface MockComponentProps {
  helperText?: string; 
  error?: boolean;     
}

const MockComponent = ({ helperText = "", error = false }: { helperText?: string; error?: boolean }) => (
  <>
    {helperText && (
      <FormHelperText error={error} sx={{ marginBottom: 2 }}>
        {helperText}
      </FormHelperText>
    )}
  </>
);

describe("FormHelperText", () => {

  it("renders nothing when helperText is an empty string", () => {
    const { container } = render(<MockComponent helperText="" error={false} />);
    expect(container.firstChild).toBeNull(); // Ensures nothing is rendered
  });

  it("renders error text correctly when error is true and helperText is provided", () => {
    render(<MockComponent helperText="Error text" error={true} />);
    const helperText = screen.getByText("Error text");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("Mui-error");
  });

  it("does not apply error styling when error is false", () => {
    render(<MockComponent helperText="Helper text" error={false} />);
    const helperText = screen.getByText("Helper text");
    expect(helperText).toBeInTheDocument();
    expect(helperText).not.toHaveClass("Mui-error");
  });

  it("renders correctly when error is undefined", () => {
    render(<MockComponent helperText="No error prop" />);
    const helperText = screen.getByText("No error prop");
    expect(helperText).toBeInTheDocument();
    expect(helperText).not.toHaveClass("Mui-error");
  });

  it("renders correctly when helperText and error are both undefined", () => {
    const { container } = render(<MockComponent />);
    expect(container.firstChild).toBeNull(); // Ensures nothing is rendered
  });
});



describe("FormHelperText", () => {
  it("renders helper text when helperText is provided", () => {
    render(<MockComponent helperText="This is helper text" error={false} />);
    const helperText = screen.getByText("This is helper text");
    expect(helperText).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<MockComponent helperText="Error occurred" error={true} />);
    const helperText = screen.getByText("Error occurred");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("Mui-error"); // MUI adds this class for errors
  });

  it("does not render anything if helperText is not provided", () => {
    const { container } = render(<MockComponent error={true} />);
    expect(container.firstChild).toBeNull(); // Ensures nothing is rendered
  });
});
