import { TabOption } from "../../../../../../components";
import {
  BarChartOptions,
  LineChartOptions,
} from "../../../../../../components/Charts/generic/charts/type";
import { SalesAnalyticsBlock } from "./AnalyticsBlocks/SalesAnalyticsBlock";
import { UsersAnalyticsBlock } from "./AnalyticsBlocks/UsersAnalyticsBlock";
import { formatNumber } from "./utils";

export const timePeriod: string[] = [
  "All",
  "Today",
  "Weekly",
  "Monthly",
  "YTD",
];

export const GaugeChartOptions = {
  startAngle: 0,
  endAngle: 360,
  innerRadius: "70%",
  outerRadius: "100%",
};

export const SalesBarChartOptions: BarChartOptions = {
  series: [
    {
      dataKey: "TotalRevenue",
      label: "Total Sales",
      color: "#0F2A71",
    },
  ],
  xAxis: [
    {
      scaleType: "band",
      dataKey: "country",
    },
  ],
  yAxis: [
    {
      valueFormatter: (value) => formatNumber(value),
    },
  ],
  grid: { horizontal: true },
  layout: "vertical",
  borderRadius: 5,
};

export const SaleLineChartOptions: LineChartOptions = {
  xAxis: [
    {
      scaleType: "band",
      dataKey: "label",
    },
  ],
  yAxis: [
    {
      scaleType: "linear",
    },
  ],
  series: [
    {
      dataKey: "standard",
      color: "#181E2F",
      curve: "linear",
    },
    {
      dataKey: "fastTrack",
      color: "#2A61AC",
      curve: "linear",
    },
  ],
  grid: { horizontal: true },
};

export const analyticsTabs: TabOption[] = [
  {
    key: "All",
    content: <SalesAnalyticsBlock salesType="All" />,
  },
  {
    key: "RN",
    content: <SalesAnalyticsBlock salesType="RN" lineChart />,
  },
  {
    key: "PN",
    content: <SalesAnalyticsBlock salesType="PN" lineChart />,
  },
  {
    key: "Users",
    content: <UsersAnalyticsBlock />,
  },
];
