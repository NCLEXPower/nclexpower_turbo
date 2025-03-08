import { useSalesData } from "../../../hooks/useSalesData";
import { SalesAnalyticsBlock } from "../../../system/app/internal/blocks/Hub/Analytics/AnalyticsBlocks/SalesAnalyticsBlock";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useSalesData");

describe("SalesAnalyticsBlock Component", () => {
  const mockSalesData = {
    selectedPeriod: "all",
    handlePeriodChange: jest.fn(),
    statCardsData: [
      { title: "Total Sales", value: 1000, currency: "$", bgColor: "#181E2F" },
      { title: "New Sales", value: 500, currency: "$", bgColor: "#2A61AC" },
    ],
    data: {
      productDurations: { standard: 23, fastTrack: 8 },
      repeatSales: { firstTime: 70, repeated: 30 },
      barData: [
        { country: "USA", TotalRevenue: 500000 },
        { country: "Canada", TotalRevenue: 400000 },
      ],
      lineData: [
        { label: "Month 1", standard: 20, fastTrack: 10 },
        { label: "Month 2", standard: 25, fastTrack: 12 },
      ],
    },
  };

  beforeEach(() => {
    (useSalesData as jest.Mock).mockReturnValue(mockSalesData);
  });

  it("renders without crashing", () => {
    render(<SalesAnalyticsBlock salesType="All" />);
    const sales = screen.getAllByText("Sales");

    expect(sales).toHaveLength(2);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders the TimePeriodCheckboxes", () => {
    render(<SalesAnalyticsBlock salesType="All" />);
    expect(screen.getByRole("checkbox", { name: /all/i })).toBeInTheDocument();
  });

  it("renders GaugeCards correctly", () => {
    render(<SalesAnalyticsBlock salesType="All" />);
    expect(screen.getByText("Products Durations")).toBeInTheDocument();
    expect(screen.getByText("Repeat Sales")).toBeInTheDocument();
  });

  it("renders LineCard when `lineChart` is true", () => {
    render(<SalesAnalyticsBlock salesType="All" lineChart />);
    expect(screen.getByText("Products Durations")).toBeInTheDocument();
    expect(screen.getByText("23 Days (Standard)")).toBeInTheDocument();
    expect(screen.getByText("8 Days (Fast Track)")).toBeInTheDocument();
  });

  it("renders BarCard correctly", () => {
    render(<SalesAnalyticsBlock salesType="All" />);
    expect(screen.getByText("Demographic/Location")).toBeInTheDocument();
  });
});
