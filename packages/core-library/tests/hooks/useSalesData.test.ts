import { act, renderHook } from "../common";
import { useSalesData } from "../../hooks/useSalesData";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock(
  "../../system/app/internal/blocks/Hub/Analytics/AnalyticsMockData",
  () => ({
    AllSalesMockData: {
      salesData: {
        all: { TotalSales: 10000, RNTotalSales: 5000, PNTotalSales: 5000 },
        today: { TotalSales: 500, RNTotalSales: 250, PNTotalSales: 250 },
      },
    },
    RNSalesMockData: {
      salesData: {
        all: {
          RNTotalSales: 5000,
          StandardTotalSales: 3000,
          FastTrackTotalSales: 2000,
        },
        today: {
          RNTotalSales: 250,
          StandardTotalSales: 150,
          FastTrackTotalSales: 100,
        },
      },
    },
    PNSalesMockData: {
      salesData: {
        all: {
          PNTotalSales: 5000,
          StandardTotalSales: 2500,
          FastTrackTotalSales: 2500,
        },
        today: {
          PNTotalSales: 250,
          StandardTotalSales: 125,
          FastTrackTotalSales: 125,
        },
      },
    },
  })
);

describe("useSalesData Hook", () => {
  it("should initialize with the correct sales data for 'All' sales type", () => {
    const { result } = renderHook(() => useSalesData("All"));

    expect(result.current.selectedPeriod).toBe("all");
    expect(result.current.data.salesData.TotalSales).toBe(10000);
    expect(result.current.statCardsData.length).toBe(3);
    expect(result.current.statCardsData[0].title).toBe("Product Total Sales");
    expect(result.current.statCardsData[0].value).toBe(10000);
  });

  it("should initialize with the correct sales data for 'RN' sales type", () => {
    const { result } = renderHook(() => useSalesData("RN"));

    expect(result.current.selectedPeriod).toBe("all");
    expect(result.current.data.salesData.RNTotalSales).toBe(5000);
    expect(result.current.statCardsData.length).toBe(3);
    expect(result.current.statCardsData[0].title).toBe("RN Total Sales");
    expect(result.current.statCardsData[0].value).toBe(5000);
  });

  it("should initialize with the correct sales data for 'PN' sales type", () => {
    const { result } = renderHook(() => useSalesData("PN"));

    expect(result.current.selectedPeriod).toBe("all");
    expect(result.current.data.salesData.PNTotalSales).toBe(5000);
    expect(result.current.statCardsData.length).toBe(3);
    expect(result.current.statCardsData[0].title).toBe("PN Total Sales");
    expect(result.current.statCardsData[0].value).toBe(5000);
  });

  it("should update data when the period is changed", () => {
    const { result } = renderHook(() => useSalesData("All"));

    act(() => {
      result.current.handlePeriodChange({
        target: { value: "today" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedPeriod).toBe("today");
    expect(result.current.data.salesData.TotalSales).toBe(500);
  });
});
