import { render, screen } from "../../../common";
import { BarCard } from "../../../../system/app/internal/blocks/Hub/Analytics/Cards";
import { Chart } from "../../../../components";
import { SalesBarChartOptions } from "../../../../system/app/internal/blocks/Hub/Analytics/constants";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../components", () => ({
  Chart: jest.fn(() => <div data-testid="chart-mock" />),
}));

describe("BarCard Component", () => {
  const mockProps = {
    cardTitle: "Revenue by Country",
    dataSet: [
      { country: "USA", TotalRevenue: 400000 },
      { country: "Canada", TotalRevenue: 350000 },
      { country: "Japan", TotalRevenue: 300000 },
    ],
    currency: "$",
  };

  it("renders the title correctly", () => {
    render(<BarCard {...mockProps} />);
    expect(screen.getByText("Revenue by Country")).toBeInTheDocument();
  });

  it("renders country names correctly", () => {
    render(<BarCard {...mockProps} />);
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("renders total revenue values correctly", () => {
    render(<BarCard {...mockProps} />);
    expect(screen.getByText("$400K")).toBeInTheDocument();
    expect(screen.getByText("$350K")).toBeInTheDocument();
    expect(screen.getByText("$300K")).toBeInTheDocument();
  });

  it("renders the Chart component with correct props", () => {
    render(<BarCard {...mockProps} />);

    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Bar",
        dataSet: [
          { country: "USA", TotalRevenue: 400000 },
          { country: "Canada", TotalRevenue: 350000 },
          { country: "Japan", TotalRevenue: 300000 },
        ],
        height: 500,
        options: SalesBarChartOptions,
      }),
      {}
    );
  });

  it("renders the chart mock", () => {
    render(<BarCard {...mockProps} />);
    expect(screen.getByTestId("chart-mock")).toBeInTheDocument();
  });
});
