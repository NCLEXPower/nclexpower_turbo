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
  test("displays approvers list correctly", () => {
    render(<ContentApproverForm />);

    expect(screen.getByText("Approval for project")).toBeInTheDocument();
    expect(screen.getByText("Approver name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Comment: Looks good!")).toBeInTheDocument();
    expect(screen.getByText("Created At: 2024-02-05")).toBeInTheDocument();
  });
});
