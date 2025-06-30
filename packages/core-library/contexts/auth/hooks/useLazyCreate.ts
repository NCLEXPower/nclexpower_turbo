import { useCallback } from "react";
import { useCreate } from "./useCreate";
import { isCustomer } from "../../../core";
import { CustomerOptions, InternalOptions } from "../../../types/global";

export const useLazyCreate = () => {
  const initialFields = isCustomer
    ? ({} as CustomerOptions)
    : ({} as InternalOptions);

  const { execute, loading } = useCreate({
    isCustomerCondition: isCustomer,
    fields: initialFields,
  });

  const create = useCallback(
    async (fields: CustomerOptions | InternalOptions) => {
      try {
        return await execute(fields);
      } catch (error) {
        console.error(`Account creation failed: ${error}`);
        throw error;
      }
    },
    [execute]
  );

  return {
    create: create as (
      fields: CustomerOptions | InternalOptions
    ) => Promise<any>,
    loading,
  };
};
