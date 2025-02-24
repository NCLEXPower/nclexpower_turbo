import { PeriodType } from "../../../../../../hooks/usePeriodTime";

export type SalesType = "All" | "RN" | "PN";

export type SalesData = {
  TotalSales?: number;
  RNTotalSales?: number;
  PNTotalSales?: number;
  StandardTotalSales?: number;
  FastTrackTotalSales?: number;
};

export type BarData = {
  country: string;
  TotalRevenue: number;
};

export type LineData = {
  label: string;
  standard: number;
  fastTrack: number;
};

export type ProductDuration = {
  standard: number;
  fastTrack: number;
};

export type RepeatSales = {
  firstTime: number;
  repeated: number;
};

export type PeriodicMockData = {
  salesData: Record<PeriodType, SalesData>;
  barData: Record<PeriodType, BarData[]>;
  lineData: Record<PeriodType, LineData[]>;
  productDurations: Record<PeriodType, ProductDuration>;
  repeatSales: Record<PeriodType, RepeatSales>;
};

export type UserAnalytics = Record<PeriodType, number>;

export type PeriodicUserMockData = {
  TotalUsers: UserAnalytics;
  RNTotalUsers: UserAnalytics;
  PNTotalUsers: UserAnalytics;
  RNStandardUsers: UserAnalytics;
  RNFastTrackUsers: UserAnalytics;
  PNStandardUsers: UserAnalytics;
  PNFastTrackUsers: UserAnalytics;
};
