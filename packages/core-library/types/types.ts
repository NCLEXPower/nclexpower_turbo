import { credentialsType } from "./../api/types";
import { useCallback, useReducer } from "react";
import { DataTableHeader } from "../components";
import { DataTableColumn } from "./page";
import { usePaginatedSort } from "./hooks";

export interface Membership {
  firstname: string | null;
  surname: string | null;
  referenceNumber: string | null;
  status: string | null;
}

export type CmsTokens = {
  email: string;
  phoneNumber: string;
  name: string;
};

export interface AccessKey {
  contentAccessKey: string;
}

export interface LoginParams {
  email: string;
  password: string;
  appName: string;
}

export interface PricingParams {
  pricing: number;
  currency: string;
}

export interface ProductParams {
  features: string[];
  productName: string;
  pricingId: string;
  categoryId: string;
  productDescription: string | null;
  programType: number;
}

export interface RegisterParams {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename: string;
  imgurl: string;
  email: string;
  appName: string;
}

export interface PaginationData {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface internalAccountType {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  imgurl: string;
  username: string;
  password: string;
  accessLevel: number;
  routers: RouteType[];
}

export interface EnrollDeviceType {
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  deviceFingerprint: string;
  accountId: string;
}

export interface EnrollDeviceResponseType {
  responseCode: number;
  message: string;
  deviceId?: string | undefined;
}

export type RouteType = {
  label: string;
  value: string;
};

export type DataTableRow = Record<string, string>;

export type PaginatedSortResult = ReturnType<typeof usePaginatedSort>;

export type UseDataTableParamsResult = {
  columns: {
    name: string;
    align?: DataTableHeader["align"];
    width?: DataTableHeader["width"];
    parseValue: (row?: DataTableRow) => string;
    sort?: {
      sorted: boolean;
      ascending: boolean;
      onClick: () => void;
    };
  }[];
  paginatedSort: PaginatedSortResult;
  rows: DataTableRow[];
  loading: boolean;
};

export interface AccountCreationData {
  firstname: string;
  middlename: string | undefined | null;
  lastname: string;
  email: string;
  password: string;
  orderNumber: string;
  productId: string;
  totalAmount: number;
};

export type Deletetype = {
  id: number;
  text: string;
};