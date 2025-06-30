import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApi } from "../hooks";
import { useAccountReference } from "./auth/hooks";

export type AccountReferenceInformation = {
  id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  // imgurl: string; // this might need to be added also in backend.
};

export type AccountReferenceResponse = {
  customerInfo: AccountReferenceInformation;
  internalInfo: AccountReferenceInformation;
};

type AccountReferenceContextType = {
  reference: string | undefined;
  customerInfo: AccountReferenceInformation | null;
  internalInfo: AccountReferenceInformation | null;
  loading: boolean;
};

const AccountReferenceContext = createContext<
  AccountReferenceContextType | undefined
>(undefined);

type AccountReferenceProviderProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  authLoading: boolean;
};

export const useAccountReferenceContext = (): AccountReferenceContextType => {
  const context = useContext(AccountReferenceContext);
  if (context === undefined) {
    throw new Error(
      "useAccountReference must be used within an AccountReferenceProvider"
    );
  }
  return context;
};

export const AccountReferenceProvider: React.FC<
  AccountReferenceProviderProps
> = ({ children, authLoading, isAuthenticated }) => {
  const [reference] = useAccountReference();

  const accountReference = useApi((api) =>
    isAuthenticated
      ? api.auth.accountReference(reference)
      : Promise.resolve(null)
  );

  const loading = authLoading || accountReference.loading;

  const value = useMemo(
    () => ({
      reference,
      customerInfo: accountReference.result?.data.customerInfo ?? null,
      internalInfo: accountReference.result?.data.internalInfo ?? null,
      loading,
    }),
    [reference, loading, accountReference.result?.data]
  );

  return (
    <AccountReferenceContext.Provider value={value}>
      {children}
    </AccountReferenceContext.Provider>
  );
};
