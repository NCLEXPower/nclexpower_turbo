import { BarChartOptions } from "../../../../../../components/Charts/generic/charts/type";
import { TabsItem } from "../../../../../../core/utils/contants/tabs-item";
import { SalesAnalyticsBlock } from "./SalesAnalyticsBlock";
import { UsersAnalyticsBlock } from "./UsersAnalyticsBlock";
import { SalesAnalyticsData, UsersAnalyticsData } from "../types";

const mockSalesAnalyticsData: SalesAnalyticsData = {
  currency: "$",
  RNData: {
    productsDurations: 40,
    salesRepeat: 45,
    demographic: [
      {
        country: "USA",
        totalRevenue: 100000,
      },
      {
        country: "Canada",
        totalRevenue: 90000,
      },
      {
        country: "Philippines",
        totalRevenue: 80000,
      },
      {
        country: "Japan",
        totalRevenue: 78000,
      },
      {
        country: "China",
        totalRevenue: 65000,
      },
      {
        country: "India",
        totalRevenue: 63000,
      },
    ],
  },
  PNData: {
    productsDurations: 40,
    salesRepeat: 45,
    demographic: [
      {
        country: "USA",
        totalRevenue: 100000,
      },
      {
        country: "Canada",
        totalRevenue: 90000,
      },
      {
        country: "Philippines",
        totalRevenue: 80000,
      },
      {
        country: "Japan",
        totalRevenue: 78000,
      },
      {
        country: "China",
        totalRevenue: 65000,
      },
      {
        country: "India",
        totalRevenue: 63000,
      },
    ],
  },
};

const mockUsersAnalyticsData: UsersAnalyticsData = {
  RNUsers: {
    standard: 20100,
    fastTrack: 30115,
    gaugeValue: 80,
  },
  PNUsers: {
    standard: 10100,
    fastTrack: 10005,
    gaugeValue: 90,
  },
};

export const CurrentProgressOption = {
  startAngle: 0,
  endAngle: 360,
  innerRadius: 75,
  outerRadius: 100,
};

export const BarOptions: BarChartOptions = {
  series: [
    {
      dataKey: "totalRevenue",
      label: "Total Revenue",
      color: "#0F2A71",
    },
  ],
  xAxis: [{ scaleType: "band", dataKey: "country" }],
  yAxis: [
    {
      valueFormatter: (value) => formatNumber(value), // Formats numbers (e.g., 100,000)
    },
  ],
  grid: { horizontal: true },
  borderRadius: 4,
};

export const lineOptions = {
  series: [{ dataKey: "value" }],
  grid: { horizontal: true },
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
};

export const analyticsContents: TabsItem[] = [
  {
    id: 1,
    title: "All",
    content: (
      <SalesAnalyticsBlock data={mockSalesAnalyticsData} dataFor="All" />
    ),
  },
  {
    id: 2,
    title: "RN",
    content: <SalesAnalyticsBlock data={mockSalesAnalyticsData} dataFor="RN" />,
  },
  {
    id: 3,
    title: "PN",
    content: <SalesAnalyticsBlock data={mockSalesAnalyticsData} dataFor="PN" />,
  },
  {
    id: 4,
    title: "Users",
    content: <UsersAnalyticsBlock data={mockUsersAnalyticsData} />,
  },
];
