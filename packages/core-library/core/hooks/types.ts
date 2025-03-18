/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { UseMutationOptions, UseQueryOptions } from "react-query";

export type ApiServiceErr = any;
export type MutOpt<Response, TVariables = unknown> = UseMutationOptions<
  Response,
  ApiServiceErr,
  TVariables,
  unknown
>;
export type QueryOpt<Response, TVariables = unknown> = UseQueryOptions<
  Response,
  ApiServiceErr,
  TVariables,
  any[]
>;

export interface ParamOptions {
  limit: number;
  page: number;
  sortBy: string;
}

export interface CategoryResponseType {
  id: string;
  categoryTypeName: string;
  categoryTypeValue: number;
}
export interface EnvironmentStatus {
  id: string;
  currentMaintenanceMode: number;
  createdDate: string;
  updatedDate: string;
}
