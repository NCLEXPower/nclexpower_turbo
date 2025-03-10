import { PolicyManagementBlock } from "../../../../system/app/internal/blocks";
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

jest.mock("../../../../contexts/TabsContext.tsx", () => ({
  useTabsContext: jest.fn(() => ({
    activeTabIndex: 0,
    onTabChanged: jest.fn(),
  })),
}));


describe("Policy Management Block", () => {
  it("should render the Policy Management Page without error", () => {
    render(
      <PolicyManagementBlock />
    );
  });

  it("should render the Create Policy tab by default", () => {
    render(<PolicyManagementBlock />);
    expect(screen.getByText("Creation of Policy")).toBeInTheDocument();
    expect(screen.getByText(/Policy Management is the process/i)).toBeInTheDocument();
  });

  it("should switch to the Policy Management tab when clicked", () => {
    render(<PolicyManagementBlock />);
    fireEvent.click(screen.getByRole("tablist"));
    expect(screen.getByText("Date Received")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

});
