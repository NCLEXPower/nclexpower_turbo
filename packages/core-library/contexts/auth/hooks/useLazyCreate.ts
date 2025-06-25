import { useCallback } from "react";
import { InternalOptions, useCreate } from "./useCreate";
import { isCustomer } from "../../../core";
import { CustomerOptions } from "../../../types/global";

export const useLazyCreate = () => {
  const initialFields = isCustomer
    ? ({} as CustomerOptions)
    : ({} as InternalOptions);

  const { execute, loading } = useCreate({
    isCustomerCondition: isCustomer,
    fields: initialFields,
  });

  const create = useCallback(
    async (
      fields: typeof isCustomer extends true ? CustomerOptions : InternalOptions
    ) => {
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
      fields: typeof isCustomer extends true ? CustomerOptions : InternalOptions
    ) => Promise<any>,
    loading,
  };
};
