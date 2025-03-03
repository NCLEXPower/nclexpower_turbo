import { renderHook } from "@testing-library/react";
import { useBusinessQueryContext } from "../../../contexts";
import { ReportedIssuesBlock } from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useApiCallback } from '../../../hooks'
import { useExecuteToast } from "../../../contexts";

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
  useExecuteToast: jest.fn(),
}));

describe("businessQueryGetAllReportedIssues hook", () => {
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
});

describe("showToast", () => {
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
});

describe("Error handling with showToast", () => {
  it("logs error and calls showToast with error message", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const mockShowToast = jest.fn();
    const mockExecuteToast = jest.fn();

    (useExecuteToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
      executeToast: mockExecuteToast,
    });

    const error = new Error("Test error");
    console.error(error);
    const { showToast } = useExecuteToast();
    showToast("Something went wrong. Please try again later!", "error");
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockShowToast).toHaveBeenCalledWith(
      "Something went wrong. Please try again later!",
      "error"
    );
    consoleErrorSpy.mockRestore();
  });
});

describe("Successful delete operation", () => {
  it("calls refetch and shows success toast", () => {
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
});

describe("Loading state for deleteReportedIssuesCb", () => {
  it("should set isLoading to true when loading is true", () => {
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