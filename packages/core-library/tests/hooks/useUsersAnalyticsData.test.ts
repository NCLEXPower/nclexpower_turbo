import { renderHook, act } from "../common";
import { useUsersAnalyticsData } from "../../hooks/useUsersAnalyticsData";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock(
  "../../system/app/internal/blocks/Hub/Analytics/AnalyticsMockData",
  () => ({
    UsersMockData: {
      TotalUsers: {
        all: 80000,
        today: 500,
        weekly: 3500,
        monthly: 15000,
        ytd: 60000,
      },
      RNTotalUsers: {
        all: 50000,
        today: 300,
        weekly: 2000,
        monthly: 8000,
        ytd: 40000,
      },
      PNTotalUsers: {
        all: 30000,
        today: 200,
        weekly: 1500,
        monthly: 7000,
        ytd: 20000,
      },
    },
  })
);

describe("useUsersAnalyticsData", () => {
  it("should initialize with the correct period", () => {
    const { result } = renderHook(() => useUsersAnalyticsData());

    expect(result.current.selectedPeriod).toBe("all");
    expect(result.current.data.TotalUsers).toEqual(80000);
    expect(result.current.statsCardData.length).toBe(3);
    expect(result.current.statsCardData[0].title).toBe("Total Users");
    expect(result.current.statsCardData[0].value).toBe(80000);
  });

  it("should update data when the period is changed", () => {
    const { result } = renderHook(() => useUsersAnalyticsData());

    act(() => {
      result.current.handlePeriodChange({
        target: { value: "today" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedPeriod).toBe("today");
    expect(result.current.data.TotalUsers).toEqual(500);
    expect(result.current.statsCardData[0].value).toBe(500);
  });

  it("should update statistics correctly for weekly data", () => {
    const { result } = renderHook(() => useUsersAnalyticsData());

    act(() => {
      result.current.handlePeriodChange({
        target: { value: "weekly" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedPeriod).toBe("weekly");
    expect(result.current.data.TotalUsers).toEqual(3500);
    expect(result.current.statsCardData[0].value).toBe(3500);
  });

  it("should return correct stats for RN and PN users", () => {
    const { result } = renderHook(() => useUsersAnalyticsData());

    expect(result.current.statsCardData[1].title).toBe("RN Total Users");
    expect(result.current.statsCardData[1].value).toBe(50000);

    expect(result.current.statsCardData[2].title).toBe("PN Total Users");
    expect(result.current.statsCardData[2].value).toBe(30000);
  });
});
