export interface FilterLabel {
  id: string;
  label: string;
}

export interface SortByValue {
  id: string;
  desc?: boolean;
}

export interface PaginatedTableParams {
  ascending: boolean;
  propertyName: string;
  pageNumber: number;
  pageSize: number;
}
