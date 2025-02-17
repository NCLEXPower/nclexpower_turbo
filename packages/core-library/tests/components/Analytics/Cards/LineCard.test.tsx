import { render, screen } from "../../../common";
import { LineCard } from "../../../../system/app/internal/blocks/Hub/Analytics/Cards";
import { Chart } from "../../../../components";
import { SaleLineChartOptions } from "../../../../system/app/internal/blocks/Hub/Analytics/constants";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../components", () => ({
  Chart: jest.fn(() => <div data-testid="chart-mock" />),
}));

describe("LineCard Component", () => {
  const mockProps = {
    lineData: [
      { label: "Jan", standard: 5000, fastTrack: 3000 },
      { label: "Feb", standard: 6000, fastTrack: 4000 },
    ],
    title: "Sales Trends",
    titleColor: "#00173F",
    label: [
      { color: "#103436", title: "Standard Sales", labelColor: "#000" },
      { color: "#13565A", title: "Fast Track Sales", labelColor: "#000" },
    ],
  };

  it("renders the title correctly", () => {
    render(<LineCard {...mockProps} />);
    expect(screen.getByText("Sales Trends")).toBeInTheDocument();
  });

  it("renders all labels correctly", () => {
    render(<LineCard {...mockProps} />);
    expect(screen.getByText("Standard Sales")).toBeInTheDocument();
    expect(screen.getByText("Fast Track Sales")).toBeInTheDocument();
  });

  it("renders the Chart component with correct props", () => {
    render(<LineCard {...mockProps} />);

    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Line",
        dataSet: [
          { label: "Jan", standard: 5000, fastTrack: 3000 },
          { label: "Feb", standard: 6000, fastTrack: 4000 },
        ],
        width: 350,
        height: 200,
        options: SaleLineChartOptions,
      }),
      {}
    );
  });

  it("renders the chart mock", () => {
    render(<LineCard {...mockProps} />);
    expect(screen.getByTestId("chart-mock")).toBeInTheDocument();
  });
});
