// import { render } from "@testing-library/react";
// import { screen, fireEvent, waitFor } from "../../common";
// import { IssueDetailsModal } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDetailsModal";
// import { useExecuteToast } from "../../../contexts";
// import { useApiCallback } from "../../../hooks";

// jest.mock("../../../config", () => ({
//   config: { value: jest.fn() },
// }));

// jest.mock("../../../core/router", () => ({
//   useRouter: jest.fn(),
// }));

// jest.mock("../../../hooks");

// jest.mock("../../../contexts", () => ({
//   useExecuteToast: jest.fn(() => ({
//     executeToast: jest.fn(),
//   })),
// }));

//   let mockUpdateStatusCb: { execute: jest.Mock };
//   let mockShowToast: jest.Mock;

// jest.mock("../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueDescriptionBox", () => ({
//   IssueDescriptionBox: ({
//     description,
//     "data-testid": testId,
//   }: { description?: string; "data-testid"?: string }) => (
//     <div data-testid={testId}>{description}</div>
//   ),
// }));

// jest.mock("../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueStatusDropdown", () => ({
//   IssueStatusDropdown: ({
//     selectedStatus,
//     setSelectedStatus,
//     "data-testid": testId,
//   }: {
//     selectedStatus: number;
//     setSelectedStatus: (status: number) => void;
//     "data-testid"?: string;
//   }) => (
//     <select
//       data-testid={testId}
//       value={selectedStatus.toString()}
//       onChange={(e) => setSelectedStatus(Number(e.target.value))}
//     >
//       {[0, 1, 2].map((value) => (
//         <option key={value} value={value.toString()}>
//           {["To Be Reviewed", "In Review", "Resolved"][value]}
//         </option>
//       ))}
//     </select>
//   ),
// }));

// describe("IssueDetailsModal", () => {
//   const validContext = {
//     email: "test@example.com",
//     reference: "123456",
//     description: "Test description",
//     dateCreated: "March 1, 2025",
//     status: 1,
//   };

//   let mockOnClose: jest.Mock;
//   let mockOnStatusChange: jest.Mock;
//   let modalProps: { isOpen: boolean; context: any };
//   let mockFetchTickets: jest.Mock;

//   jest.mock("../../../hooks", () => ({
//     useApiCallback: () => mockUpdateStatusCb,
//   }));

//   beforeEach(() => {
//     jest.clearAllMocks();

//     modalProps = {
//       isOpen: false,
//       context: undefined,
//     };

//     mockOnClose = jest.fn(() => {
//       modalProps.isOpen = false;
//       modalProps.context = undefined;
//     });

//     mockOnStatusChange = jest.fn();
//     mockUpdateStatusCb = {
//       execute: jest.fn().mockResolvedValue(true),
//     };
//     mockShowToast = jest.fn();
//     mockFetchTickets = jest.fn();

//     (useExecuteToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
//     (useApiCallback as jest.Mock).mockReturnValue(mockUpdateStatusCb);
//   });

//   test("renders IssueDetailsModal without crashing", () => {
//     render(
//       <IssueDetailsModal
//         modal={{
//           isOpen: false,
//           context: undefined,
//         }}
//         onClose={mockOnClose}
//         onStatusChange={mockOnStatusChange}
//         fetchTickets={mockFetchTickets}
//       />
//     );

//     expect(screen.queryByTestId("custom-modal-backdrop")).not.toBeInTheDocument();
//   });

//   test("renders IssueDetailsModal correctly when modal is open", () => {
//     render(
//       <IssueDetailsModal
//         modal={{ isOpen: true, context: validContext }}
//         onClose={mockOnClose}
//         onStatusChange={mockOnStatusChange}
//         fetchTickets={mockFetchTickets}
//       />
//     );

//     expect(screen.getByText("Reference #")).toBeInTheDocument();
//     expect(screen.getByTestId("issue-email")).toHaveTextContent("test@example.com");
//     expect(screen.getByText(/\[123456\]/)).toBeInTheDocument();
//     expect(screen.getByText(/\[March 1, 2025\]/)).toBeInTheDocument();
//     expect(screen.getByTestId("issue-description-box")).toHaveTextContent("Test description");
//   });

//   test("initializes selectedStatus state with context.status", () => {
//     render(
//       <IssueDetailsModal
//         modal={{ isOpen: true, context: validContext }}
//         onClose={mockOnClose}
//         onStatusChange={mockOnStatusChange}
//         fetchTickets={mockFetchTickets}
//       />
//     );

//     const statusDropdown = screen.getByTestId("issue-status-dropdown");
//     expect(statusDropdown).toHaveTextContent("In Review");
//   });

//   test("updates selectedStatus when dropdown value changes", () => {
//     render(
//       <IssueDetailsModal
//         modal={{ isOpen: true, context: validContext }}
//         onClose={mockOnClose}
//         onStatusChange={mockOnStatusChange}
//         fetchTickets={mockFetchTickets}
//       />
//     );

//     const dropdown = screen.getByTestId("issue-status-dropdown") as HTMLSelectElement;
//     fireEvent.change(dropdown, { target: { value: "2" } });
//     expect(dropdown.value).toBe("2");
//   });

//   test("submits valid data and calls onStatusChange and onClose", async () => {
//     render(
//       <IssueDetailsModal
//         modal={{ isOpen: true, context: validContext }}
//         onClose={mockOnClose}
//         onStatusChange={mockOnStatusChange}
//         fetchTickets={mockFetchTickets}
//       />
//     );

//     const notesArea = await screen.findByTestId("support-text-area") as HTMLTextAreaElement;
//     fireEvent.change(notesArea, { target: { value: "New notes" } });

//     const submitButton = screen.getByRole("button", { name: /Submit/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => expect(mockUpdateStatusCb.execute).toHaveBeenCalled());

//     const form = mockUpdateStatusCb.execute.mock.calls[0][0] as FormData;

//     expect(form.get("Notes")).toBe("New notes");
//     expect(form.get("RefNo")).toBe(validContext.reference);
//     expect(form.get("UpdateStatus")).toBe("1");

//     expect(mockOnStatusChange).toHaveBeenCalledWith(validContext.reference, expect.any(Number));
//     expect(mockOnClose).toHaveBeenCalled();
//   });
// });
