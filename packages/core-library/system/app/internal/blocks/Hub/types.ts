export interface DashboardCardType {
  id: number;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  title: string;
  cardValue: string;
}

export type Demographic = {
  country: string;
  totalRevenue: number;
};

export type SalesData = {
  productsDurations: number;
  salesRepeat: number;
  demographic: Demographic[];
};

export type SalesAnalyticsData = {
  currency: string;
  RNData: SalesData;
  PNData: SalesData;
};

export type UsersData = {
  standard: number;
  fastTrack: number;
  gaugeValue: number;
};

export type UsersAnalyticsData = {
  RNUsers: UsersData;
  PNUsers: UsersData;
};
