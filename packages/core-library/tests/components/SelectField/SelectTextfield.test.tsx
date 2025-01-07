import { SelectField } from '../../../components/Textfield/SelectTextfield';
import { render, screen } from '../../common';

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));


describe('SelectField', () => {
  it('renders FormHelperText when helperText is provided', () => {
    render(
      <SelectField 
        helperText="This is a helper text" 
        error={false} 
        options={[]} 
      />
    );

    const formHelperText = screen.getByText("This is a helper text");
    expect(formHelperText).toBeInTheDocument();
  });

  it('does not render FormHelperText when helperText is not provided', () => {
    render(<SelectField helperText={""} error={false} options={[]} />);

    const formHelperText = screen.queryByText(/This is a helper text/i);
    expect(formHelperText).not.toBeInTheDocument();
  });

  it('renders FormHelperText with error styling when error is true', () => {
    render(
      <SelectField 
        helperText="This is a helper text" 
        error={true} 
        options={[]} 
      />
    );

    const formHelperText = screen.getByText("This is a helper text");
  });
});