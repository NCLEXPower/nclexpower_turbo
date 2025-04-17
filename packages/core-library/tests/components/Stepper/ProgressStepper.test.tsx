import { MobileStepper, ProgressStepper } from '../../../components';
import { render, screen } from "../../common";


jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));


jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));


describe('ProgressStepper', () => {
  const mockSteps = ['Step 1', 'Step 2', 'Step 3'];

  it("should render ProgressStepper", () => {
    render(<ProgressStepper steps={mockSteps} activeStep={0} />);
  });

  it('should render all step labels', () => {
    render(<ProgressStepper steps={mockSteps} activeStep={0} />);

    mockSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('should apply correct styles for active step', () => {
    render(<ProgressStepper steps={mockSteps} activeStep={1} />);

    const activeStepElement = screen.getByText('Step 2').parentElement;
    expect(activeStepElement).toHaveStyle({
      color: '#0F2A71',
    });
  });

  it('should apply the correct styles for completed steps', () => {
    render(<ProgressStepper steps={mockSteps} activeStep={2} />);

    const completedStepElement = screen.getByText('Step 1').parentElement;
    expect(completedStepElement).toHaveStyle({
      color: '#70e000'
    });
  });
});

describe('MobileStepper', () => {
  const mockSteps = ['Mobile Step 1', 'Mobile Step 2', 'Mobile Step 3'];
  const mockIcons = [
    <div key="icon1" data-testid="icon1">Icon 1</div>,
    <div key="icon2" data-testid="icon2">Icon 2</div>,
    <div key="icon3" data-testid="icon3">Icon 3</div>
  ];

  it("should render MobileStepper", () => {
    render(<MobileStepper steps={mockSteps} activeStep={1} />);
  });


  it('should render step numbers', () => {
    render(<MobileStepper steps={mockSteps} activeStep={1} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render labels for active and completed steps', () => {
    render(<MobileStepper steps={mockSteps} activeStep={1} />);

    expect(screen.getByText('Mobile Step 1')).toBeInTheDocument();
    expect(screen.getByText('Mobile Step 2')).toBeInTheDocument();
    expect(screen.queryByText('Mobile Step 3')).not.toBeInTheDocument();
  });

  it('it should render icons when provided', () => {
    render(<MobileStepper steps={mockSteps} activeStep={1} icons={mockIcons} />);

    expect(screen.getByTestId('icon1')).toBeInTheDocument();
    expect(screen.getByTestId('icon2')).toBeInTheDocument();
  });

  it('should apply the correct active step styling', () => {
    render(<MobileStepper steps={mockSteps} activeStep={1} />);

    const activeStepElement = screen.getByText('Mobile Step 2').closest('div');
    expect(activeStepElement).toHaveStyle({
      backgroundColor: 'rgba(15, 42, 113, 0.17)',
      color: '#0F2A71'
    });
  });
});