import { PolicyCreation } from "../../../../system/app/internal/blocks/Hub/PolicyManagement/PolicyCreation";
import { screen, render, fireEvent } from "../../../common";

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("Policy Creation", () => {
  it("should render the Policy Creation Page without error", () => {
    render(
      <PolicyCreation />
    );
  });

  it("should render the policy creation component without error", () => {
    render(<PolicyCreation />);
    expect(screen.getByText('Creation of Policy')).toBeInTheDocument();
    expect(screen.getByText(/Policy management is the process of creating/i)).toBeInTheDocument();
    expect(screen.getByText('Section Details')).toBeInTheDocument();
    expect(screen.getByText('SubSections')).toBeInTheDocument();
    expect(screen.getByText('Add SubSection')).toBeInTheDocument();
    expect(screen.getByText('Section Title')).toBeInTheDocument();

  });

  it('should display validation errors when form fields are empty', async () => {
    render(<PolicyCreation />);
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
  });

});
