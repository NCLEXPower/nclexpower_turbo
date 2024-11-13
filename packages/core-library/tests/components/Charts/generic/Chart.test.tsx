import { render } from "../../../common";
import { Chart } from "../../../../components";
import {
  BarChart,
  GaugeChart,
  LineChart,
} from "../../../../components/Charts/generic/charts";
import { ChartOptions } from "../../../../components/Charts/generic/charts/type";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../components/Charts/generic/charts", () => ({
  BarChart: jest.fn(() => <div>Bar Chart</div>),
  LineChart: jest.fn(() => <div>Line Chart</div>),
  GaugeChart: jest.fn(() => <div>Gauge Chart</div>),
}));

describe("Chart Component", () => {
  const mockDataSet = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
  ];
  const mockOptions: ChartOptions = {};

  it("renders the Bar chart when type is 'Bar'", () => {
    const { getByText } = render(
      <Chart type="Bar" dataSet={mockDataSet} options={mockOptions} />
    );
    expect(getByText("Bar Chart")).toBeInTheDocument();
    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });

  it("renders the Line chart when type is 'Line'", () => {
    const { getByText } = render(
      <Chart type="Line" dataSet={mockDataSet} options={mockOptions} />
    );
    expect(getByText("Line Chart")).toBeInTheDocument();
    expect(LineChart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });

  it("renders the Gauge chart when type is 'Gauge'", () => {
    const { getByText } = render(
      <Chart type="Gauge" dataSet={mockDataSet} options={mockOptions} />
    );
    expect(getByText("Gauge Chart")).toBeInTheDocument();
    expect(GaugeChart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });
});
