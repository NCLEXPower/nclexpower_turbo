import { render } from "@testing-library/react";
import { screen, userEvent } from "../../../../common";
import { RefundPolicyBlock } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/steps/contents/RefundPolicyBlock";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock(
  "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/constants",
  () => ({
    policies: [
      { value: "Policy 1", hasTable: false },
      { value: "Policy 2 with table", hasTable: true },
    ],
    policyConditions: ["Condition 1", "Condition 2"],
    gridData: [
      { timePeriod: "48h - 72h", amount: "100%" },
      { timePeriod: "72h - 1 week", amount: "50%" },
    ],
  })
);

describe("RefundPolicyBlock", () => {
  const mockNext = jest.fn();
  const mockNextStep = jest.fn();
  const mockCloseModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <RefundPolicyBlock
        next={mockNext}
        nextStep={mockNextStep}
        closeModal={mockCloseModal}
      />
    );
  };

  it("renders the Refund Policy title", () => {
    renderForm();

    expect(
      screen.getByText(/refund policy/i, { selector: "h3" })
    ).toBeInTheDocument();
  });

  it("displays policies and table when hasTable=true", () => {
    renderForm();

    expect(screen.getByText("Policy 1")).toBeInTheDocument();

    expect(screen.getByText("Policy 2 with table")).toBeInTheDocument();

    expect(screen.getByText("Time Period After Purchase")).toBeInTheDocument();
    expect(screen.getByText("48h - 72h")).toBeInTheDocument();
  });

  it("calls closeModal when Cancel is clicked", async () => {
    renderForm();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockNextStep).not.toHaveBeenCalled();
  });

  it("calls nextStep({}) and next when Continue is clicked", async () => {
    renderForm();

    const continueButton = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueButton);

    expect(mockNextStep).toHaveBeenCalledWith({});
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
