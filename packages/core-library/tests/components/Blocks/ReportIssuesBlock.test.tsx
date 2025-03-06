import { ReportedIssuesBlock } from "../../../system/app/internal/blocks/Hub/Reports/ReportIssuesBlock";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useApiCallback, useColumns } from '../../../hooks'
import { useExecuteToast } from "../../../contexts";
import { useDateFormat } from "../../../system/app/internal/blocks/Hub/core/hooks";
import { format, parseISO } from "date-fns";
import { useBusinessQueryContext } from '../../../contexts';
import { renderHook } from "@testing-library/react";

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
    render(<ReportedIssuesBlock/>)
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