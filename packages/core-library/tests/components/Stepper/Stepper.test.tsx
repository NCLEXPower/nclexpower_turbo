import { Stepper } from '../../../components';
import { theme } from '../../../contents/theme/theme';
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
    render(<Stepper steps={mockSteps} activeStep={0} />);
  });

  it('should render all step labels', () => {
    render(<Stepper steps={mockSteps} activeStep={0} />);

    mockSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('should apply correct styles for active step', () => {
    render(<Stepper steps={mockSteps} activeStep={1} />);

    const activeStepElement = screen.getByText('Step 2').parentElement;
    expect(activeStepElement).toHaveStyle({
      color: 'rgb(15, 42, 113);',
    });
  });

  it('should apply the correct styles for completed steps', () => {
    render(<Stepper steps={mockSteps} activeStep={2} />);

    const completedStepElement = screen.getByText('Step 1').parentElement;
    expect(completedStepElement).toHaveStyle({
      color: 'rgb(112, 224, 0);'
    });
  });
});