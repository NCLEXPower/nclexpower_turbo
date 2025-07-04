import { AxiosResponse } from "axios";
import { isCustomer } from "../../core";
import { CustomerOptions, InternalOptions } from "../../types/global";
import { LoginResponse } from "../../api/types";

export type LoginOptions = {
  email: string;
  password: string;
};

export type SoftLogoutOptions = {
  clearChat?: boolean; //genesys web messenger readiness.
};

export type LoginOptionReturnValues = {
  requires2FA?: boolean;
};

export type AuthService = {
  loading: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  login: (options: LoginOptions) => Promise<LoginOptionReturnValues | void>;
  logout: () => Promise<void>;
  register(params: CustomerOptions | InternalOptions): Promise<any>;
  softLogout: (options?: SoftLogoutOptions) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAuthTasksRunning: (isAuthTasksRunning: boolean) => void;
  setSecurityMeasures(result: LoginResponse, has2FA?: boolean): void;
};

export const AUTH_METHODS = {
  STANDARD_AUTH: "STANDARD_AUTH",
  OPENAM: "OPENAM",
} as const;

export type AuthMethod =
  | (typeof AUTH_METHODS)[keyof typeof AUTH_METHODS]
  | undefined;
