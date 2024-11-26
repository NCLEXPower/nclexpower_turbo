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
