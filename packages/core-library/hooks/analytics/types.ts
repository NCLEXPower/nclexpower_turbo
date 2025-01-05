export interface TimePeriodSalesProps {
  saleId: string;
  country: string;
  createdDate: string;
  customerAccountId: string;
  customerEmail: string;
  credentialId: string;
  productId: string;
  productName: string;
  programTitle: number;
  programType: number;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

export interface ProductSalesProps {
  productTitle: number;
  productType: number;
  totalSales: number;
  totalRevenue: number;
}

export interface RepeatSalesProps {
  customerAccountId: string;
  customerEmail: string;
  saleType: string;
  salesCount: number;
}

export interface DemographicSalesProps {
  country: string;
  totalSales: number;
  totalRevenue: number;
}

export interface SalesPercentageProps {
  country: string;
  totalRevenue: number;
  percentage: number;
}

export interface AllSalesProps {
  timePeriodSales: TimePeriodSalesProps[];
  productSales: ProductSalesProps[];
  repeatSales: RepeatSalesProps[];
  demographicSales: DemographicSalesProps[];
  salesPercentage: SalesPercentageProps[];
}
