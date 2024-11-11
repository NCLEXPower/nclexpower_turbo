import { render } from "../../../../common";
import { BarChart } from "../../../../../components/Charts/generic/charts";
import { BarChart as MuiBarChart } from "@mui/x-charts";
import { BarChartOptions } from "../../../../../components/Charts/generic/charts/type";
import { SxProps } from "@mui/material";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/x-charts", () => ({
  BarChart: jest.fn(() => <div>Mock Bar Chart Component</div>),
}));

describe("Barchart Component", () => {
  const mockOptions: BarChartOptions = {
    xAxis: [{ dataKey: "month" }],
    yAxis: [{ dataKey: "sales" }],
    series: [],
    borderRadius: 4,
  };
  const mockDataSet = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
  ];
  const customSx: SxProps = { backgroundColor: "blue" };
  const height = 300;
  const width = 600;

  it("renders MuiBarChart with the correct props", () => {
    render(
      <BarChart
        options={mockOptions}
        Height={height}
        Width={width}
        dataSet={mockDataSet}
        sx={customSx}
      />
    );

    // Check if MuiBarChart was called with correct props
    expect(MuiBarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        xAxis: mockOptions.xAxis,
        yAxis: mockOptions.yAxis,
        borderRadius: mockOptions.borderRadius,
        height,
        width,
        sx: customSx,
      }),
      {}
    );
  });

  it("applies default values when Height, Width, and sx are not provided", () => {
    render(<BarChart options={mockOptions} dataSet={mockDataSet} />);

    // Verify MuiBarChart with default values
    expect(MuiBarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        height: undefined,
        width: undefined,
        sx: undefined,
      }),
      {}
    );
  });

  it("uses borderRadius from options correctly", () => {
    render(
      <BarChart
        options={{ ...mockOptions, borderRadius: 10 }}
        dataSet={mockDataSet}
      />
    );

    expect(MuiBarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        borderRadius: 10,
      }),
      {}
    );
  });

  it("renders with correct dataset and options", () => {
    render(<BarChart options={mockOptions} dataSet={mockDataSet} />);

    expect(MuiBarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        dataset: mockDataSet,
        xAxis: mockOptions.xAxis,
        yAxis: mockOptions.yAxis,
      }),
      {}
    );
  });
});
