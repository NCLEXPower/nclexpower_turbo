import {
  BarChartOptions,
  LineChartOptions,
} from "../../../../../../components/Charts/generic/Type";

export const AllbarChartOptions: BarChartOptions = {
  series: [
    {
      dataKey: "TotalRevenue",
      label: "Total Sales Percentage",
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
      scaleType: "linear",
      min: 0,
      max: 100000,
    },
  ],
  grid: { horizontal: true },
  layout: "vertical",
  borderRadius: 5,
};

export const AllgaugeChartOptions = {
  colors: ["#2A61AC", "#181E2F", "#e0e0e0"],
  startAngle: 0,
  endAngle: 360,
  innerRadius: "70%",
  outerRadius: "100%",
};

export const RNbarChartOptions: BarChartOptions = {
  series: [
    {
      dataKey: "TotalRevenue",
      label: "Total Sales Percentage",
      color: "#2A61AC",
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
      scaleType: "linear",
      min: 0,
      max: 100000,
    },
  ],
  grid: { horizontal: true },
  layout: "vertical",
  borderRadius: 5,
};

export const PNbarChartOptions: BarChartOptions = {
  series: [
    {
      dataKey: "TotalRevenue",
      label: "Total Sales Percentage",
      color: "#0C8087",
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
      scaleType: "linear",
      min: 0,
      max: 100000,
    },
  ],
  grid: { horizontal: true },
  layout: "vertical",
  borderRadius: 5,
};

export const RepeatsalesGaugeOptions = {
  colors: ["#1EA537", "#C12C2F", "#e0e0e0"],
  startAngle: 0,
  endAngle: 360,
  innerRadius: "70%",
  outerRadius: "100%",
};

export const PNlineChartOptions: LineChartOptions = {
  xAxis: [
    {
      scaleType: "band",
      dataKey: "month",
    },
  ],
  yAxis: [
    {
      scaleType: "linear",
      min: 0,
      max: 100000,
    },
  ],
  series: [
    {
      dataKey: "standard",
      color: "#103436",
      curve: "linear",
    },
    {
      dataKey: "fastTrack",
      color: "#13565A",
      curve: "linear",
    },
  ],
  grid: { horizontal: true },
};

export const RNlineChartOptions: LineChartOptions = {
  xAxis: [
    {
      scaleType: "band",
      dataKey: "month",
    },
  ],
  yAxis: [
    {
      scaleType: "linear",
      min: 0,
      max: 100000,
    },
  ],
  series: [
    {
      dataKey: "standard",
      color: "#181E2F",
    },
    {
      dataKey: "fastTrack",
      color: "#2A61AC",
    },
  ],
  grid: { horizontal: true },
};

export const AllSalesMockData = {
  all: {
    ProductTotalSales: 50,
    RNTotalSales: 50,
    PNTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 30000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 80, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
  },
  today: {
    ProductTotalSales: 30,
    RNTotalSales: 40,
    PNTotalSales: 80,
    barData: [
      { country: "USA", TotalRevenue: 40000 },
      { country: "CAN", TotalRevenue: 30000 },
      { country: "PHI", TotalRevenue: 100000 },
      { country: "JAP", TotalRevenue: 30000 },
      { country: "CHI", TotalRevenue: 40000 },
      { country: "IND", TotalRevenue: 70000 },
    ],
    ProductsDuration: [
      { value: 60, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 70, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
  },
  weekly: {
    ProductTotalSales: 100,
    RNTotalSales: 30,
    PNTotalSales: 20,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 80000 },
      { country: "JAP", TotalRevenue: 70000 },
      { country: "CHI", TotalRevenue: 60000 },
      { country: "IND", TotalRevenue: 50000 },
    ],
    ProductsDuration: [
      { value: 80, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 70, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
  },
  monthly: {
    ProductTotalSales: 32,
    RNTotalSales: 10,
    PNTotalSales: 22,
    barData: [
      { country: "USA", TotalRevenue: 50000 },
      { country: "CAN", TotalRevenue: 20000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 50000 },
      { country: "CHI", TotalRevenue: 30000 },
      { country: "IND", TotalRevenue: 80000 },
    ],
    ProductsDuration: [
      { value: 40, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 50, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
  },
  ytd: {
    ProductTotalSales: 100,
    RNTotalSales: 50,
    PNTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 10, label: "23 days (Standard)", color: "#181E2F" },
      { value: 70, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 60, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
  },
};

export const RNSalesMockData = {
  all: {
    RNTotalSales: 50,
    StandardTotalSales: 50,
    FastTrackTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 80, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 10000, fastTrack: 8000 },
      { month: "Feb", standard: 20000, fastTrack: 16000 },
      { month: "Mar", standard: 30000, fastTrack: 24000 },
      { month: "Apr", standard: 40000, fastTrack: 32000 },
      { month: "May", standard: 50000, fastTrack: 40000 },
      { month: "Jun", standard: 60000, fastTrack: 48000 },
      { month: "Jul", standard: 70000, fastTrack: 56000 },
      { month: "Aug", standard: 80000, fastTrack: 64000 },
      { month: "Sep", standard: 90000, fastTrack: 72000 },
      { month: "Oct", standard: 95000, fastTrack: 76000 },
      { month: "Nov", standard: 98000, fastTrack: 78000 },
      { month: "Dec", standard: 100000, fastTrack: 80000 },
    ],
  },
  today: {
    RNTotalSales: 100,
    StandardTotalSales: 40,
    FastTrackTotalSales: 60,
    barData: [
      { country: "USA", TotalRevenue: 40000 },
      { country: "CAN", TotalRevenue: 30000 },
      { country: "PHI", TotalRevenue: 100000 },
      { country: "JAP", TotalRevenue: 40000 },
      { country: "CHI", TotalRevenue: 60000 },
      { country: "IND", TotalRevenue: 70000 },
    ],
    ProductsDuration: [
      { value: 80, label: "23 days (Standard)", color: "#181E2F" },
      { value: 20, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 40, label: "First Time", color: "#1EA537" },
      { value: 30, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 12000, fastTrack: 9000 },
      { month: "Feb", standard: 21000, fastTrack: 16000 },
      { month: "Mar", standard: 32000, fastTrack: 24000 },
      { month: "Apr", standard: 43000, fastTrack: 31000 },
      { month: "May", standard: 55000, fastTrack: 38000 },
      { month: "Jun", standard: 67000, fastTrack: 46000 },
      { month: "Jul", standard: 79000, fastTrack: 54000 },
      { month: "Aug", standard: 89000, fastTrack: 60000 },
      { month: "Sep", standard: 94000, fastTrack: 68000 },
      { month: "Oct", standard: 97000, fastTrack: 74000 },
      { month: "Nov", standard: 100000, fastTrack: 80000 },
      { month: "Dec", standard: 98000, fastTrack: 76000 },
    ],
  },
  weekly: {
    RNTotalSales: 140,
    StandardTotalSales: 70,
    FastTrackTotalSales: 70,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 80000 },
      { country: "JAP", TotalRevenue: 70000 },
      { country: "CHI", TotalRevenue: 60000 },
      { country: "IND", TotalRevenue: 50000 },
    ],
    ProductsDuration: [
      { value: 80, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 70, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 10000, fastTrack: 8000 },
      { month: "Feb", standard: 20000, fastTrack: 16000 },
      { month: "Mar", standard: 30000, fastTrack: 24000 },
      { month: "Apr", standard: 40000, fastTrack: 32000 },
      { month: "May", standard: 50000, fastTrack: 40000 },
      { month: "Jun", standard: 60000, fastTrack: 48000 },
      { month: "Jul", standard: 70000, fastTrack: 56000 },
      { month: "Aug", standard: 80000, fastTrack: 64000 },
      { month: "Sep", standard: 90000, fastTrack: 72000 },
      { month: "Oct", standard: 95000, fastTrack: 76000 },
      { month: "Nov", standard: 98000, fastTrack: 78000 },
      { month: "Dec", standard: 100000, fastTrack: 80000 },
    ],
  },
  monthly: {
    RNTotalSales: 70,
    StandardTotalSales: 20,
    FastTrackTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 50000 },
      { country: "CAN", TotalRevenue: 20000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 50000 },
      { country: "CHI", TotalRevenue: 30000 },
      { country: "IND", TotalRevenue: 80000 },
    ],
    ProductsDuration: [
      { value: 40, label: "23 days (Standard)", color: "#181E2F" },
      { value: 10, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 50, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 15000, fastTrack: 10000 },
      { month: "Feb", standard: 25000, fastTrack: 14000 },
      { month: "Mar", standard: 35000, fastTrack: 22000 },
      { month: "Apr", standard: 45000, fastTrack: 30000 },
      { month: "May", standard: 55000, fastTrack: 38000 },
      { month: "Jun", standard: 65000, fastTrack: 46000 },
      { month: "Jul", standard: 75000, fastTrack: 54000 },
      { month: "Aug", standard: 85000, fastTrack: 62000 },
      { month: "Sep", standard: 95000, fastTrack: 70000 },
      { month: "Oct", standard: 98000, fastTrack: 74000 },
      { month: "Nov", standard: 100000, fastTrack: 78000 },
      { month: "Dec", standard: 99000, fastTrack: 80000 },
    ],
  },
  ytd: {
    RNTotalSales: 80,
    StandardTotalSales: 40,
    FastTrackTotalSales: 40,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 10, label: "23 days (Standard)", color: "#181E2F" },
      { value: 70, label: "8 days (Fast Track)", color: "#2A61AC" },
    ],
    RepeatSales: [
      { value: 60, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 20000, fastTrack: 10000 },
      { month: "Feb", standard: 30000, fastTrack: 20000 },
      { month: "Mar", standard: 40000, fastTrack: 30000 },
      { month: "Apr", standard: 50000, fastTrack: 40000 },
      { month: "May", standard: 60000, fastTrack: 50000 },
      { month: "Jun", standard: 70000, fastTrack: 60000 },
      { month: "Jul", standard: 80000, fastTrack: 70000 },
      { month: "Aug", standard: 90000, fastTrack: 80000 },
      { month: "Sep", standard: 95000, fastTrack: 90000 },
      { month: "Oct", standard: 100000, fastTrack: 95000 },
      { month: "Nov", standard: 100000, fastTrack: 100000 },
      { month: "Dec", standard: 100000, fastTrack: 100000 },
    ],
  },
};

export const PNSalesMockData = {
  all: {
    PNTotalSales: 50,
    StandardTotalSales: 50,
    FastTrackTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#103436" },
      { value: 10, label: "8 days (Fast Track)", color: "#13565A" },
    ],
    RepeatSales: [
      { value: 80, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 10000, fastTrack: 8000 },
      { month: "Feb", standard: 20000, fastTrack: 16000 },
      { month: "Mar", standard: 30000, fastTrack: 24000 },
      { month: "Apr", standard: 40000, fastTrack: 32000 },
      { month: "May", standard: 50000, fastTrack: 40000 },
      { month: "Jun", standard: 60000, fastTrack: 48000 },
      { month: "Jul", standard: 70000, fastTrack: 56000 },
      { month: "Aug", standard: 80000, fastTrack: 64000 },
      { month: "Sep", standard: 90000, fastTrack: 72000 },
      { month: "Oct", standard: 95000, fastTrack: 76000 },
      { month: "Nov", standard: 98000, fastTrack: 78000 },
      { month: "Dec", standard: 100000, fastTrack: 80000 },
    ],
  },
  today: {
    PNTotalSales: 40,
    StandardTotalSales: 40,
    FastTrackTotalSales: 60,
    barData: [
      { country: "JAP", TotalRevenue: 40000 },
      { country: "CAN", TotalRevenue: 30000 },
      { country: "PHI", TotalRevenue: 100000 },
      { country: "CHI", TotalRevenue: 40000 },
      { country: "USA", TotalRevenue: 60000 },
      { country: "IND", TotalRevenue: 70000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#103436" },
      { value: 10, label: "8 days (Fast Track)", color: "#13565A" },
    ],
    RepeatSales: [
      { value: 40, label: "First Time", color: "#1EA537" },
      { value: 30, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 12000, fastTrack: 9000 },
      { month: "Feb", standard: 22000, fastTrack: 17000 },
      { month: "Mar", standard: 33000, fastTrack: 25000 },
      { month: "Apr", standard: 41000, fastTrack: 33000 },
      { month: "May", standard: 52000, fastTrack: 41000 },
      { month: "Jun", standard: 61000, fastTrack: 49000 },
      { month: "Jul", standard: 74000, fastTrack: 57000 },
      { month: "Aug", standard: 83000, fastTrack: 64000 },
      { month: "Sep", standard: 91000, fastTrack: 71000 },
      { month: "Oct", standard: 96000, fastTrack: 78000 },
      { month: "Nov", standard: 100000, fastTrack: 80000 },
      { month: "Dec", standard: 98000, fastTrack: 75000 },
    ],
  },
  weekly: {
    PNTotalSales: 70,
    StandardTotalSales: 70,
    FastTrackTotalSales: 70,
    barData: [
      { country: "CAN", TotalRevenue: 100000 },
      { country: "PHI", TotalRevenue: 90000 },
      { country: "JAP", TotalRevenue: 80000 },
      { country: "CHI", TotalRevenue: 70000 },
      { country: "USA", TotalRevenue: 60000 },
      { country: "IND", TotalRevenue: 50000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#103436" },
      { value: 10, label: "8 days (Fast Track)", color: "#13565A" },
    ],
    RepeatSales: [
      { value: 70, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 12000, fastTrack: 9000 },
      { month: "Feb", standard: 21000, fastTrack: 16000 },
      { month: "Mar", standard: 32000, fastTrack: 24000 },
      { month: "Apr", standard: 43000, fastTrack: 31000 },
      { month: "May", standard: 55000, fastTrack: 38000 },
      { month: "Jun", standard: 67000, fastTrack: 46000 },
      { month: "Jul", standard: 79000, fastTrack: 54000 },
      { month: "Aug", standard: 89000, fastTrack: 60000 },
      { month: "Sep", standard: 94000, fastTrack: 68000 },
      { month: "Oct", standard: 97000, fastTrack: 74000 },
      { month: "Nov", standard: 100000, fastTrack: 80000 },
      { month: "Dec", standard: 98000, fastTrack: 76000 },
    ],
  },
  monthly: {
    PNTotalSales: 80,
    StandardTotalSales: 20,
    FastTrackTotalSales: 50,
    barData: [
      { country: "USA", TotalRevenue: 50000 },
      { country: "CAN", TotalRevenue: 20000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 50000 },
      { country: "CHI", TotalRevenue: 30000 },
      { country: "IND", TotalRevenue: 80000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#103436" },
      { value: 10, label: "8 days (Fast Track)", color: "#13565A" },
    ],
    RepeatSales: [
      { value: 50, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 15000, fastTrack: 10000 },
      { month: "Feb", standard: 25000, fastTrack: 14000 },
      { month: "Mar", standard: 35000, fastTrack: 22000 },
      { month: "Apr", standard: 45000, fastTrack: 30000 },
      { month: "May", standard: 55000, fastTrack: 38000 },
      { month: "Jun", standard: 65000, fastTrack: 46000 },
      { month: "Jul", standard: 75000, fastTrack: 54000 },
      { month: "Aug", standard: 85000, fastTrack: 62000 },
      { month: "Sep", standard: 95000, fastTrack: 70000 },
      { month: "Oct", standard: 98000, fastTrack: 74000 },
      { month: "Nov", standard: 100000, fastTrack: 78000 },
      { month: "Dec", standard: 99000, fastTrack: 80000 },
    ],
  },
  ytd: {
    PNTotalSales: 30,
    StandardTotalSales: 40,
    FastTrackTotalSales: 40,
    barData: [
      { country: "USA", TotalRevenue: 100000 },
      { country: "CAN", TotalRevenue: 90000 },
      { country: "PHI", TotalRevenue: 70000 },
      { country: "JAP", TotalRevenue: 60000 },
      { country: "CHI", TotalRevenue: 50000 },
      { country: "IND", TotalRevenue: 30000 },
    ],
    ProductsDuration: [
      { value: 70, label: "23 days (Standard)", color: "#103436" },
      { value: 10, label: "8 days (Fast Track)", color: "#13565A" },
    ],
    RepeatSales: [
      { value: 60, label: "First Time", color: "#1EA537" },
      { value: 10, label: "Repeated", color: "#C12C2F" },
    ],
    lineData: [
      { month: "Jan", standard: 20000, fastTrack: 10000 },
      { month: "Feb", standard: 30000, fastTrack: 20000 },
      { month: "Mar", standard: 40000, fastTrack: 30000 },
      { month: "Apr", standard: 50000, fastTrack: 40000 },
      { month: "May", standard: 60000, fastTrack: 50000 },
      { month: "Jun", standard: 70000, fastTrack: 60000 },
      { month: "Jul", standard: 80000, fastTrack: 70000 },
      { month: "Aug", standard: 90000, fastTrack: 80000 },
      { month: "Sep", standard: 95000, fastTrack: 90000 },
      { month: "Oct", standard: 100000, fastTrack: 95000 },
      { month: "Nov", standard: 100000, fastTrack: 100000 },
      { month: "Dec", standard: 100000, fastTrack: 100000 },
    ],
  },
};
