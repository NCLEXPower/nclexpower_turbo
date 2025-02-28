import { renderHook } from "@testing-library/react";
import { useBusinessQueryContext } from "../../../contexts";

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
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