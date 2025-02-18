import { render, screen, fireEvent, waitFor } from "../../common";
import ContentApproverForm from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/ContentApproverForm";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/ContentReviewerData",
  () => ({
    contentApprovers: [
      {
        content: "Approval for project",
        approver: "John Doe",
        comment: "Looks good!",
        createdAt: "2024-02-05",
      },
    ],
  })
);

describe("ContentApproverForm", () => {
  it("displays approvers list correctly", () => {
    render(<ContentApproverForm />);

    expect(screen.getByText("Approval for project")).toBeInTheDocument();
    expect(screen.getByText("Approver name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Comment: Looks good!")).toBeInTheDocument();
    expect(screen.getByText("Created At: 2024-02-05")).toBeInTheDocument();
  });

  it("renders the Box and StateStatus when contentLoader is true", () => {
    render(<ContentApproverForm />);

    const boxElement = screen.getByRole("box");
    expect(boxElement).toBeInTheDocument();

    const stateStatusElement = screen.getByRole("state-status");
    expect(stateStatusElement).toBeInTheDocument();
  });

  it("does not render the Box and StateStatus when both isError and contentLoader are false", () => {
    render(<ContentApproverForm />);

    const boxElement = screen.queryByRole("box");
    expect(boxElement).not.toBeInTheDocument();

    const stateStatusElement = screen.queryByRole("state-status");
    expect(stateStatusElement).not.toBeInTheDocument();
  });
});
