import { render, screen } from "../../../common";
import { GaugeCard } from "../../../../system/app/internal/blocks/Hub/Analytics/Cards";
import { Chart } from "../../../../components";
import { GaugeChartOptions } from "../../../../system/app/internal/blocks/Hub/Analytics/constants";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../components", () => ({
  Chart: jest.fn(() => <div data-testid="chart-mock" />),
}));

describe("GaugeCard Component", () => {
  const mockProps = {
    cardFor: "users" as "users",
    dataSet: { standardUsers: 60, fastTrackUsers: 40 },
    gaugeColors: ["#181E2F", "#2A61AC"],
    title: "Registered Nurse Users",
    titleColor: "#00173F",
    label: [
      {
        color: "#181E2F",
        title: "Standard Users: ",
        labelColor: "#000",
        value: 60,
      },
      {
        color: "#2A61AC",
        title: "Fast Track Users: ",
        labelColor: "#000",
        value: 40,
      },
    ],
    span: 6,
  };

  it("renders the title correctly", () => {
    render(<GaugeCard {...mockProps} />);
    expect(screen.getByText("Registered Nurse Users")).toBeInTheDocument();
  });

  it("renders the correct label and values", () => {
    render(<GaugeCard {...mockProps} />);
    expect(screen.getByText("Standard Users: 60")).toBeInTheDocument();
    expect(screen.getByText("Fast Track Users: 40")).toBeInTheDocument();
  });

  it("renders the Chart component with correct props", () => {
    render(<GaugeCard {...mockProps} />);

    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Gauge",
        width: 200,
        height: 200,
        dataSet: [
          { label: "standardUsers", value: 60 },
          { label: "fastTrackUsers", value: 40 },
        ],
        options: expect.objectContaining({
          ...GaugeChartOptions,
          colors: ["#181E2F", "#2A61AC", "#E6E6EC"], // Ensure colors are passed correctly
        }),
      }),
      {}
    );
  });
});
