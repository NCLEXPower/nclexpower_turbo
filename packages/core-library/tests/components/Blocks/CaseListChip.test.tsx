import { CaseListChip } from "../../../system/app/internal/blocks/Hub/QuestionManagement/CaseListChip";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

describe("CaseListChipBlock", () => {
  it("should render the CAseListChipBlock", () => {
    render(<CaseListChip status={0} />);

    const chip = screen.getByTestId("caselist-chip");
    expect(chip).toBeInTheDocument();
  });

  it("should render the chip with pending text", () => {
    render(<CaseListChip status={0} />);

    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
});
