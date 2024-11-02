import { render, screen, fireEvent } from "../common";
import { IconButton, EvaIcon } from "../../components";
import * as eva from 'eva-icons';

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('eva-icons');

describe('IconButton', () => {
    const mockOnClick = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders with correct aria-label', () => {
      render(
        <IconButton ariaLabel="Add item" onClick={mockOnClick}>
          <EvaIcon name="add" />
        </IconButton>
      );
  
      const button = screen.getByLabelText('Add item');
      expect(button).toBeInTheDocument();
    });
  
    it('calls onClick when clicked', () => {
      render(
        <IconButton ariaLabel="Delete item" onClick={mockOnClick}>
          <EvaIcon name="delete" />
        </IconButton>
      );
  
      const button = screen.getByLabelText('Delete item');
      fireEvent.click(button);
  
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
