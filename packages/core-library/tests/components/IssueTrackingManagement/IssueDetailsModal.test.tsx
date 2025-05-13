import { IssueDetailsModal } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDetailsModal";
import { render, screen, waitFor, userEvent, fireEvent } from "../../common";

jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
  formatDate: jest.fn((date: Date) => "January 1, 2024"),
}));

const mockOnClose = jest.fn();

const mockData = {
  id: "1",
  reference: "REF123",
  description: "This is a test issue",
  dateCreated: "2024-01-01T00:00:00.000Z",
  email: "test@example.com",
  status: 1,
};

describe("IssueDetailsModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with provided data", () => {
    render(
      <IssueDetailsModal open={true} onClose={mockOnClose} data={mockData} />
    );

    expect(screen.getByText("Reference #")).toBeInTheDocument();
    expect(screen.getByText("REF123")).toBeInTheDocument();
    expect(screen.getByTestId("issue-email")).toHaveTextContent(
      "test@example.com"
    );
    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
    expect(screen.getByText("This is a test issue")).toBeInTheDocument();
    expect(screen.getByText("Support's Notes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("calls onClock when close button is clicked", () => {
    render(
      <IssueDetailsModal open={true} onClose={mockOnClose} data={mockData} />
    );

    const closeBtn = screen.getByTestId("close-btn");

    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
