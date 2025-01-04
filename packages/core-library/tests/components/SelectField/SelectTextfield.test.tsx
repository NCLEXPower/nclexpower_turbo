import { render, screen } from '@testing-library/react';
import { FormHelperText } from '@mui/material';

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe('FormHelperText component', () => {
  it('should render helper text when helperText is provided', () => {
    const helperText = 'This is a helper message';
    render(<FormHelperText error={false}>{helperText}</FormHelperText>);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('should not render helper text when helperText is not provided', () => {
    render(<FormHelperText error={false}></FormHelperText>);
    expect(screen.queryByText(/This is a helper message/i)).not.toBeInTheDocument();
  });

  it('should apply error styling when error is true', () => {
    const helperText = 'This is an error message';
    render(<FormHelperText error={true}>{helperText}</FormHelperText>);
    const helperTextElement = screen.getByText(helperText);
    expect(helperTextElement).toHaveClass('Mui-error');
  });

  it('should apply margin bottom style when helperText is provided', () => {
    const helperText = 'This is a helper message';
    render(<FormHelperText error={false} sx={{ marginBottom: 2 }}>{helperText}</FormHelperText>);
    const helperTextElement = screen.getByText(helperText);
    expect(helperTextElement).toHaveStyle('margin-bottom: 16px');
  });
});