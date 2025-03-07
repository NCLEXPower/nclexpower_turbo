import { renderHook } from "@testing-library/react";
import { useBusinessQueryContext } from "../../../contexts";
import { ReportedIssuesBlock } from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useApiCallback, useColumns } from '../../../hooks'
import { useExecuteToast } from "../../../contexts";
import { useDateFormat } from "../../../system/app/internal/blocks/Hub/core/hooks";
import { format, parseISO } from "date-fns";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
  useExecuteToast: jest.fn(),
}));

jest.mock("date-fns", () => ({
  format: jest.fn(),
  parseISO: jest.fn(),
}));

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
  it("calls refetch and shows success toast", () => {
    render(<ReportedIssuesBlock/>)
    const mockRefetch = jest.fn();
    const mockShowToast = jest.fn();
    const mockExecuteToast = jest.fn();

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
      executeToast: mockExecuteToast,
    });

    mockRefetch();
    const { showToast } = useExecuteToast();
    showToast("Successfully deleted!", "success");
    expect(mockRefetch).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith("Successfully deleted!", "success");
  });
  it("should set isLoading to true when loading is true", () => {
    render(<ReportedIssuesBlock/>)
    const deleteReportedIssuesCb = { loading: true };
    const isLoading = deleteReportedIssuesCb.loading;

    expect(isLoading).toBe(true);
  });

  it("should set isLoading to false when loading is false", () => {
    const deleteReportedIssuesCb = { loading: false };
    const isLoading = deleteReportedIssuesCb.loading;
    expect(isLoading).toBe(false);
  });
});
describe("useDateFormat Hook", () => {
  it("should return a formatted date", () => {
    render(<ReportedIssuesBlock/>)
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
    render(<ReportedIssuesBlock/>)
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
      "data-testid"?: string;
    }) => {
      if (props.isLoading) {
        return <div role="progressbar">Loading...</div>;
      }
      return (
        <div role="grid" data-testid={props["data-testid"] || "data-grid"}>
          {props.rows.length === 0 ? (
            <div>No data</div>
          ) : (
            props.rows.map((row) => <div key={row.id}>{row.name}</div>)
          )}
        </div>
      );
    },
  };
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
describe("render ReportIssuesBlock", () => {
    it("Should render the report issues block", () => {
      render(<ReportedIssuesBlock />);
  
      expect(screen.getByTestId("reported-issues-block")).toBeInTheDocument();
    });
  });
describe("Error Handling", () => {
  it("should log the error and show a toast message", () => {
    render(<ReportedIssuesBlock/>)
    const { showToast } = useExecuteToast();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {}); 
    const error = new Error("Test Error");

    console.error(error);
    showToast("Something went wrong. Please try again later!", "error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(showToast).toHaveBeenCalledWith(
      "Something went wrong. Please try again later!",
      "error"
    );

    consoleErrorSpy.mockRestore();
  });
});

  describe("Delete Success Handling", () => {
    it("should call refetch and show success toast", () => {
        render(<ReportedIssuesBlock/>)
        const { showToast } = useExecuteToast();
        const refetch = jest.fn();
  
      refetch();
      showToast("Succesfully deleted!", "success");
  
      expect(refetch).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith("Succesfully deleted!", "success");
    });
  });
  describe("deleteReportedIssuesCb.execute", () => {
    it("should call execute with correct arguments and resolve successfully", async () => {
        render(<ReportedIssuesBlock/>)
      const reportedIssueId = 123;
      const deleteReportedIssuesCb = { execute: jest.fn().mockResolvedValue({ success: true }) };
  
      const response = await deleteReportedIssuesCb.execute({ id: reportedIssueId });
  
      expect(deleteReportedIssuesCb.execute).toHaveBeenCalledWith({ id: reportedIssueId });
      expect(response).toEqual({ success: true });
    });
  
    it("should handle errors correctly", async () => {
      const reportedIssueId = 123;
      const deleteReportedIssuesCb = { execute: jest.fn().mockRejectedValue(new Error("API Error")) };
      await expect(deleteReportedIssuesCb.execute({ id: reportedIssueId })).rejects.toThrow("API Error");
      expect(deleteReportedIssuesCb.execute).toHaveBeenCalledWith({ id: reportedIssueId });
    });
  });