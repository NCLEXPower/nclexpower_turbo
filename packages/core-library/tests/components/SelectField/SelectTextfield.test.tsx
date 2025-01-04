import React from "react";
import { render, screen } from "@testing-library/react";
import { FormHelperText } from "@mui/material";

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
  it("renders helper text when helperText is provided", () => {
    render(<MockComponent helperText="This is helper text" error={false} />);
    const helperText = screen.getByText("This is helper text");
    expect(helperText).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<MockComponent helperText="Error occurred" error={true} />);
    const helperText = screen.getByText("Error occurred");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("Mui-error");
  });

  it("does not render anything if helperText is not provided", () => {
    const { container } = render(<MockComponent />);
    expect(container.firstChild).toBeNull();
  });
});
