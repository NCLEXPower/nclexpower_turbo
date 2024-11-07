import { render, screen, waitFor } from "../../common";
import { DynamicChart } from "../../../components";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const sampleDataSet = [
  { name: "Product A", TotalSales: 50000 },
  { name: "Product B", TotalSales: 25000 },
];

const samplelineData = [
  { month: "Jan", standard: 10000, fastTrack: 8000 },
  { month: "Feb", standard: 20000, fastTrack: 16000 },
];
describe("DynamicChart Component", () => {
  test("renders BarChart with processed data", async () => {
    render(
      <DynamicChart
        type="Bar"
        dataSet={sampleDataSet}
        width={800}
        height={450}
        options={{
          xDataKey: "name",
          yDataKey: "TotalSales",
          maxRevenue: 100000,
          yAxisMax: 100,
          colors: ["#0F2A71"],
          borderRadius: 6,
        }}
      />
    );

    const processedData = sampleDataSet.map((item) => ({
      ...item,
      revenuePercentage: (item.TotalSales / 100000) * 100,
    }));

    await waitFor(() => {
      processedData.forEach((data) => {
        const percentageText = `${data.revenuePercentage.toFixed(1)}%`;

        expect(
          screen.findByText(new RegExp(`${percentageText}`))
        ).resolves.toBeInTheDocument();
      });
    });
  });

  test("renders LineChart with appropriate data", () => {
    render(
      <DynamicChart
        type="Line"
        dataSet={samplelineData}
        width={500}
        height={300}
        options={{
          xDataKey: "month",
          yAxisMin: 0,
          yAxisMax: 100000,
          lineSeries: [
            {
              dataKey: "standard",
              label: "standard",
              color: "#103436",
            },
            {
              dataKey: "fastTrack",
              label: "fastTrack",
              color: "#13565A",
            },
          ],
        }}
      />
    );

    expect(screen.getByText("standard")).toBeInTheDocument();
    expect(screen.getByText("fastTrack")).toBeInTheDocument();
  });

  test("renders Gauge with correct calculated percentage", () => {
    render(
      <DynamicChart
        type="Gauge"
        dataSet={[]}
        options={{
          gaugeSegments: [
            {
              value: 60,
              label: "",
            },
            {
              value: 20,
              label: "",
            },
          ],
          gaugeTotal: 100,
          colors: ["#4caf50", "#f44336"],
        }}
      />
    );

    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  test("renders fallback for unknown chart type", () => {
    render(<DynamicChart type="Unknown" dataSet={[]} options={{}} />);
    expect(screen.getByText("No chart type selected")).toBeInTheDocument();
  });
});
