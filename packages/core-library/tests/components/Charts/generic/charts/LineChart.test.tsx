import { render } from "../../../../common";
import { LineChart } from "../../../../../components/Charts/generic/charts";
import { LineChart as MuiLineChart } from "@mui/x-charts";
import { SxProps } from "@mui/material";
import { LineChartOptions } from "../../../../../components/Charts/generic/charts/type";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/x-charts", () => ({
  LineChart: jest.fn(() => <div>Mock Line Chart Component</div>),
}));

describe("Linechart Component", () => {
  const mockOptions: LineChartOptions = {
    xAxis: [{ dataKey: "month" }],
    yAxis: [{ dataKey: "sales" }],
    series: [],
  };
  const mockDataSet = [
    { label: "Jan", value: 100 },
    { label: "Feb", value: 150 },
  ];
  const customSx: SxProps = { color: "red" };
  const height = 300;
  const width = 600;

  it("renders MuiLineChart with the correct props", () => {
    render(
      <LineChart
        options={mockOptions}
        height={height}
        width={width}
        dataSet={mockDataSet}
        sx={customSx}
      />
    );

    expect(MuiLineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        xAxis: mockOptions.xAxis,
        yAxis: mockOptions.yAxis,
        height,
        width,
        sx: customSx,
      }),
      {}
    );
  });

  it("applies default values when height, width, and sx are not provided", () => {
    render(<LineChart options={mockOptions} dataSet={mockDataSet} />);

    expect(MuiLineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        height: undefined,
        width: undefined,
        sx: undefined,
      }),
      {}
    );
  });

  it("renders with correct dataset and options", () => {
    render(<LineChart options={mockOptions} dataSet={mockDataSet} />);

    expect(MuiLineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        xAxis: mockOptions.xAxis,
        yAxis: mockOptions.yAxis,
      }),
      {}
    );
  });
});
