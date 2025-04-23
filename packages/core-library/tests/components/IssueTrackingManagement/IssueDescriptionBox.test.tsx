import { render, screen } from "../../common";
import { IssueDescriptionBox } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDescriptionBox";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("IssueDescriptionBox", () => {
  it("renders description when provided", () => {
    render(<IssueDescriptionBox description="Test issue" data-testid="desc" />);
    expect(screen.getByTestId("desc")).toHaveTextContent("[Test issue]");
  });

  it("renders fallback when description is not provided", () => {
    render(<IssueDescriptionBox data-testid="desc" />);
    expect(screen.getByTestId("desc")).toHaveTextContent("[No description available.]");
  });
});