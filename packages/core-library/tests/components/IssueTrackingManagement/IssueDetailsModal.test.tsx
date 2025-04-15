import { screen, fireEvent, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { IssueDetailsModal } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDetailsModal";
import { useExecuteToast } from "../../../contexts";
import { useApiCallback } from "../../../hooks";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks");

jest.mock("../../../contexts", () => ({
  useExecuteToast: jest.fn(() => ({
    executeToast: jest.fn(),
  })),
}));

jest.mock("../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDescriptionBox", () => ({
  IssueDescriptionBox: ({
    description,
    "data-testid": testId,
  }: { description?: string; "data-testid"?: string }) => (
    <div data-testid={testId}>{description}</div>
  ),
}));

jest.mock("../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueStatusDropdown", () => ({
  IssueStatusDropdown: ({
    selectedStatus,
    setSelectedStatus,
    "data-testid": testId,
  }: {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    "data-testid"?: string;
  }) => (
    <select
      data-testid={testId}
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
    >
      {["To Be Reviewed", "In Review", "Resolved"].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
}));

describe("IssueDetailsModal", () => {
  const validContext = {
    email: "test@example.com",
    reference: "123456",
    description: "Test description",
    dateCreated: "2025-03-01",
    status: 1,
  };

  let mockOnClose: jest.Mock;
  let mockOnStatusChange: jest.Mock;
  let mockUpdateStatusCb: { execute: jest.Mock };
  let mockShowToast: jest.Mock;
  let modalProps: { isOpen: boolean; context: any };

  beforeEach(() => {
    jest.clearAllMocks();

    modalProps = {
      isOpen: false,
      context: undefined,
    };

    mockOnClose = jest.fn(() => {
      modalProps.isOpen = false;
      modalProps.context = undefined;
    });

    mockOnStatusChange = jest.fn();
    mockUpdateStatusCb = { execute: jest.fn() };
    mockShowToast = jest.fn();

    (useExecuteToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useApiCallback as jest.Mock).mockReturnValue(mockUpdateStatusCb);
  });

  test("renders IssueDetailsModal without crashing", () => {
    render(
      <IssueDetailsModal
        modal={{
          isOpen: false,
          context: undefined,
        }}
        onClose={mockOnClose}
        onStatusChange={mockOnStatusChange}
      />
    );

    expect(screen.queryByTestId("custom-modal-backdrop")).not.toBeInTheDocument();
  });

  test("renders IssueDetailsModal correctly when modal is open", () => {
    render(
      <IssueDetailsModal
        modal={{ isOpen: true, context: validContext }}
        onClose={mockOnClose}
        onStatusChange={mockOnStatusChange}
      />
    );

    expect(screen.getByText("Reference #")).toBeInTheDocument();
    expect(screen.getByTestId("issue-email")).toHaveTextContent("test@example.com");
    expect(screen.getByText(/\[123456\]/)).toBeInTheDocument();
    expect(screen.getByText(/\[2025-03-01\]/)).toBeInTheDocument();
    expect(screen.getByTestId("issue-description-box")).toHaveTextContent("Test description");
  });

  test("initializes selectedStatus state with context.status", () => {
    render(
      <IssueDetailsModal
        modal={{ isOpen: true, context: validContext }}
        onClose={mockOnClose}
        onStatusChange={mockOnStatusChange}
      />
    );

    const statusDropdown = screen.getByTestId("issue-status-dropdown");
    expect(statusDropdown).toHaveTextContent("In Review");
  });

  test("updates selectedStatus when dropdown value changes", () => {
    render(
      <IssueDetailsModal
        modal={{ isOpen: true, context: validContext }}
        onClose={mockOnClose}
        onStatusChange={mockOnStatusChange}
      />
    );

    const dropdown = screen.getByTestId("issue-status-dropdown") as HTMLSelectElement;
    fireEvent.change(dropdown, { target: { value: "Resolved" } });
    expect(dropdown.value).toBe("Resolved");
  });

  test("submits valid data and calls onStatusChange and onClose", async () => {
    render(
      <IssueDetailsModal
        modal={{ isOpen: true, context: validContext }}
        onClose={mockOnClose}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const notesArea = screen.getByTestId("support-text-area") as HTMLTextAreaElement;
    fireEvent.change(notesArea, { target: { value: "New notes" } });
  
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);
  
    await waitFor(() => expect(mockUpdateStatusCb.execute).toHaveBeenCalled());
  
    expect(mockUpdateStatusCb.execute).toHaveBeenCalledWith({
      Notes: "New notes",
      RefNo: validContext.reference,
      UpdateStatus: 1, 
    });
  
    expect(mockOnStatusChange).toHaveBeenCalledWith(validContext.reference, "In Review");
    expect(mockOnClose).toHaveBeenCalled();
  });
});
