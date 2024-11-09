import { render } from "../../../common";
import { Chart } from "../../../../components";
import {
  Barchart,
  Gaugechart,
  Linechart,
} from "../../../../components/Charts/generic";
import { ChartOptions } from "../../../../components/Charts/generic/Type";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../components/Charts/generic", () => ({
  Barchart: jest.fn(() => <div>Bar Chart</div>),
  Linechart: jest.fn(() => <div>Line Chart</div>),
  Gaugechart: jest.fn(() => <div>Gauge Chart</div>),
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
    expect(Barchart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });

  it("renders the Line chart when type is 'Line'", () => {
    const { getByText } = render(
      <Chart type="Line" dataSet={mockDataSet} options={mockOptions} />
    );
    expect(getByText("Line Chart")).toBeInTheDocument();
    expect(Linechart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });

  it("renders the Gauge chart when type is 'Gauge'", () => {
    const { getByText } = render(
      <Chart type="Gauge" dataSet={mockDataSet} options={mockOptions} />
    );
    expect(getByText("Gauge Chart")).toBeInTheDocument();
    expect(Gaugechart).toHaveBeenCalledWith(
      expect.objectContaining({ dataSet: mockDataSet }),
      {}
    );
  });
});
