import { fireEvent, render, waitFor, screen, act } from '../../common'
import '@testing-library/jest-dom';
import { FieldErrors } from 'react-hook-form';
import { ErrorMapping } from '../../../components';
import { useMapErrors } from '../../../hooks/useMappedErrors';


const mockFn = jest.fn()
jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
}));
jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../../hooks/useMappedErrors', () => ({
    useMapErrors: jest.fn(),
}));

describe('ErrorMapping Component', () => {
    const mockErrors: FieldErrors = {
        caseName: {
            type: 'required',
            message: 'Select at least 1 case name',
        },
        nurseNotes: {
            type: 'min',
            message: 'Please provide at least one note',
        },
    };

    beforeEach(() => {
        (useMapErrors as jest.Mock).mockReturnValue({
            caseName: 'Select at least 1 case name',
            nurseNotes: 'Please provide at least one note',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a button showing the number of errors found', () => {
        render(<ErrorMapping errors={mockErrors} />);

        const button = screen.getByText(/2 Errors Found/i);
        expect(button).toBeInTheDocument();
    });

    it('displays the error messages when the button is clicked', async () => {
        render(<ErrorMapping errors={mockErrors} />);

        const button = screen.getByText(/2 Errors Found/i);
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Select at least 1 case name')).toBeInTheDocument();
            expect(screen.getByText('Please provide at least one note')).toBeInTheDocument();
        });
    });

    it('hides the error messages after 5 seconds', async () => {
        jest.useFakeTimers();
        render(<ErrorMapping errors={mockErrors} />);

        const button = screen.getByText(/2 Errors Found/i);
        fireEvent.click(button);

        expect(screen.getByText('Select at least 1 case name')).toBeInTheDocument();
        expect(screen.getByText('Please provide at least one note')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        await waitFor(() => {
            expect(screen.queryByText('Select at least 1 case name')).not.toBeInTheDocument();
            expect(screen.queryByText('Please provide at least one note')).not.toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    it('does not render the button if there are no errors', () => {
        (useMapErrors as jest.Mock).mockReturnValue({});
        render(<ErrorMapping errors={{}} />);

        const button = screen.queryByText(/Errors Found/i);
        expect(button).not.toBeInTheDocument();
    });
});
