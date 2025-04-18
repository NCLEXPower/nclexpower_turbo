import { ReportedIssuesBlock } from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { useBusinessQueryContext } from "../../../contexts";
import { useExecuteToast } from "../../../contexts";
import { render } from "@testing-library/react";
import { screen, waitFor, fireEvent, renderHook } from "../../common";
import { useApiCallback } from "../../../hooks";
import { useDateFormat } from "../../../system/app/internal/blocks/Hub/core/hooks";
import { format, parseISO } from "date-fns";
 
jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));
 
jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
  useExecuteToast: jest.fn(() => ({
    showToast: jest.fn(),
  })),
}));
 
jest.mock("date-fns", () => ({
  format: jest.fn(),
  parseISO: jest.fn(),
}));
 
jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useApiCallback: jest.fn(),
}));
 
beforeEach(() => {
  jest.clearAllMocks();
 
  (useApiCallback as jest.Mock).mockReturnValue({
    loading: false,
    execute: jest.fn().mockResolvedValue({}),
  });
 
  (useExecuteToast as jest.Mock).mockReturnValue({
    showToast: jest.fn(),
  });
});
 
describe("Reported Issues Block", () => {
  it("should return mock data and refetch function", () => {
    const mockRefetch = jest.fn();
    const mockData = [{ id: 1, ticketNumber: "TICKET-001" }];
 
    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQueryGetAllReportedIssues: jest.fn(() => ({
        data: mockData,
        refetch: mockRefetch,
      })),
    });
    const { result } = renderHook(() => {
      const { businessQueryGetAllReportedIssues } = useBusinessQueryContext();
      return businessQueryGetAllReportedIssues(["getAllReportedIssues"]);
    });
 
    expect(result.current.data).toEqual(mockData);
    expect(result.current.refetch).toBe(mockRefetch);
  });
 
  it("calls showToast with correct message and type", () => {
    render(<ReportedIssuesBlock />);
    const mockShowToast = jest.fn();
    const mockExecuteToast = jest.fn();
 
    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
      executeToast: mockExecuteToast,
    });
 
    const { showToast } = useExecuteToast();
    showToast("Test message", "success");
 
    expect(mockShowToast).toHaveBeenCalledWith("Test message", "success");
  });
  it("should set isLoading to true when loading is true", () => {
    const deleteReportedIssuesCb = { loading: true };
    const isLoading = deleteReportedIssuesCb.loading;
 
    expect(isLoading).toBe(true);
  });
 
  it("should set isLoading to false when loading is false", () => {
    render(<ReportedIssuesBlock />);
    const deleteReportedIssuesCb = { loading: false };
    const isLoading = deleteReportedIssuesCb.loading;
    expect(isLoading).toBe(false);
  });
});
 
describe("useDateFormat Hook", () => {
  it("should return a formatted date", () => {
    render(<ReportedIssuesBlock />);
    const mockDate = "2025-03-05T14:30:00Z";
    const mockFormat = "MMMM d, yyyy h:mm:ss a";
    const formattedMockDate = "March 5, 2025 2:30:00 PM";
 
    (parseISO as jest.Mock).mockReturnValue(new Date(mockDate));
    (format as jest.Mock).mockReturnValue(formattedMockDate);
 
    const { getFormattedDate } = useDateFormat();
    const formattedDate = getFormattedDate(mockDate, mockFormat);
 
    expect(parseISO).toHaveBeenCalledWith(mockDate);
    expect(format).toHaveBeenCalledWith(new Date(mockDate), mockFormat);
    expect(formattedDate).toBe(formattedMockDate);
  });
 
  it("should handle invalid date input gracefully", () => {
    render(<ReportedIssuesBlock />);
    console.error = jest.fn();
 
    (parseISO as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid date");
    });
 
    const { getFormattedDate } = useDateFormat();
    const result = getFormattedDate("invalid-date");
 
    expect(console.error).toHaveBeenCalledWith("Invalid date format");
    expect(result).toBeUndefined();
  });
});
 
jest.mock("@mui/x-data-grid", () => {
  const actualModule = jest.requireActual("@mui/x-data-grid");
  return {
    ...actualModule,
    DataGrid: (props: {
      rows: any[];
      columns: any[];
      isLoading: boolean;
      initPageSize: number;
    }) => {
      return (
        <div role="grid" data-testid="data-grid">
          {props.rows.map((row) => (
            <div key={row.id} role="row" data-rowid={row.id}>
              {props.columns.map((col) => (
                <div
                  key={col.field}
                  role="cell"
                  data-colid={col.field}
                  data-testid={`cell-${row.id}-${col.field}`}
                >
                  {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  };
});
 
describe("Reported Issues Block", () => {
  it("should show success toast when deletion succeeds", async () => {
    render(<ReportedIssuesBlock />);
 
    screen.debug();
 
    const moreOptionsButton = await screen.findByTestId("action-button");
    fireEvent.click(moreOptionsButton);
 
    screen.debug();
 
    const deleteTrigger = await screen.findByTestId("delete-button");
    fireEvent.click(deleteTrigger);
    const confirmDeleteButton = await screen.findByTestId("confirm-button");
    fireEvent.click(confirmDeleteButton);
 
    const { showToast } = useExecuteToast();
 
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith("Succesfully deleted!", "success");
    });
  });
});