import { render } from "../../../../common";
import { GaugeChart } from "../../../../../components/Charts/generic/charts";
import { Gauge } from "@mui/x-charts";
import { GaugeChartOptions } from "../../../../../components/Charts/generic/charts/type";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/x-charts", () => ({
  Gauge: jest.fn(() => <div>Mock Gauge Component</div>),
}));

jest.mock("../../../../../components/Charts/generic/charts/type", () => ({
  useGaugeStyles: jest.fn(() => ({ mockStyle: true })),
}));

describe("Gaugechart Component", () => {
  const mockDataSet = [{ value: 75 }];
  const mockOptions: GaugeChartOptions = {};
  const width = 200;
  const height = 200;

  it("renders the Gauge component with correct props", () => {
    const { getByText } = render(
      <GaugeChart
        dataSet={mockDataSet}
        width={width}
        height={height}
        options={mockOptions}
      />
    );

    expect(getByText("Mock Gauge Component")).toBeInTheDocument();
    expect(Gauge).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 75,
        width,
        height,
        ...mockOptions,
      }),
      {}
    );
  });

  it("displays the correct percentage text based on value and max", () => {
    const customOptions: GaugeChartOptions = {};
    const { getByText } = render(
      <GaugeChart
        dataSet={[{ value: 100 }]}
        width={width}
        height={height}
        options={customOptions}
      />
    );
    expect(getByText("Mock Gauge Component")).toBeInTheDocument();
    expect(Gauge).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.any(Function),
      }),
      {}
    );

    const textFunction = (Gauge as unknown as jest.Mock).mock.calls[0][0].text;
    expect(textFunction({ value: 100, valueMax: 200 })).toBe("50%");
  });

  it("renders with default value of 0 if no dataSet value is provided", () => {
    render(
      <GaugeChart
        dataSet={[]}
        width={width}
        height={height}
        options={mockOptions}
      />
    );

    expect(Gauge).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 0,
      }),
      {}
    );
  });
});
