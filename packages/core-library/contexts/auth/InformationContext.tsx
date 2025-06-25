"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useApi } from "../../hooks";
import { useAccountReference } from "./hooks";
import { isCustomer } from "../../core";

export interface AccountData {
  information: Information | undefined;
}

interface Information {
  id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
}

export interface AccountReferenceContextType {
  accountData: AccountData | null;
  isLoading: boolean;
}

const AccountReferenceContext = createContext<
  AccountReferenceContextType | undefined
>(undefined);

export const useAccountReferenceContext = () =>
  useContext(AccountReferenceContext);

export const InformationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [reference] = useAccountReference();
  const account = useApi((api) => api.auth.accountReference(reference));

  const loading = account.loading;

  useEffect(() => {
    setAccountData({
      information: isCustomer
        ? account.result?.data.customerInfo
        : account.result?.data.internalInfo,
    });
  }, [account.result?.data]);

  return (
    <AccountReferenceContext.Provider
      value={{ accountData, isLoading: loading }}
    >
      {children}
    </AccountReferenceContext.Provider>
  );
};
