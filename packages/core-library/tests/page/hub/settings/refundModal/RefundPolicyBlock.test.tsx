import { render } from "@testing-library/react";
import { screen, fireEvent, within } from "../../../../common";
import { RefundPolicyBlock } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/RefundPolicyBlock";
import { policies } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/constants";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

describe("Refund Policy Block", () => {
  const mockCloseModal = jest.fn();
  const mockNextPage = jest.fn();

  const renderComponent = () => {
    return render(
      <RefundPolicyBlock closeModal={mockCloseModal} nextPage={mockNextPage} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the refund policy block", () => {
    renderComponent();

    expect(screen.getByTestId("policy-block")).toBeInTheDocument();
  });

  it("renders Refund Policy title", () => {
    renderComponent();

    expect(
      screen.getByText(/refund policy/i, { selector: "h3" })
    ).toBeInTheDocument();
  });

  it("renders all policies from the constants", () => {
    renderComponent();

    policies.forEach((policy) => {
      expect(screen.getByText(policy.value)).toBeInTheDocument();
    });
  });

  it("renders the PolicyGrid only for policies with hasTable set to true", () => {
    renderComponent();

    const policiesWithTable = policies.filter((policy) => policy.hasTable);
    const policiesWithoutTable = policies.filter((policy) => !policy.hasTable);

    policiesWithTable.forEach((policy) => {
      const policyElement = screen.getByText(policy.value);
      const policyContainer = policyElement.closest("li");

      expect(
        within(policyContainer!).getByText(/time period after purchase/i)
      ).toBeInTheDocument();
    });

    policiesWithoutTable.forEach((policy) => {
      const policyElement = screen.getByText(policy.value);
      const policyContainer = policyElement.closest("li");

      expect(
        within(policyContainer!).queryByText(/time period after purchase/i)
      ).not.toBeInTheDocument();
    });
  });

  it("calls the closeModal function when the Cancel button is clicked", () => {
    renderComponent();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("calls the nextPage function when the Continue button is clicked", () => {
    renderComponent();

    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);

    expect(mockNextPage).toHaveBeenCalledTimes(1);
  });
});
