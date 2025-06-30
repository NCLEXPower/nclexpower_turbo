/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useApiCallback } from "../../../hooks";
import { CustomerOptions, InternalOptions } from "../../../types/global";

export type CreateParams<T extends "customer" | "internal"> = {
  type?: T;
  fields: T extends "customer" ? CustomerOptions : InternalOptions;
};

export const useCreate = <T extends "customer" | "internal">(
  params: CreateParams<T> & { isCustomerCondition?: boolean }
) => {
  const type =
    params.type ?? (params.isCustomerCondition ? "customer" : "internal");

  const customersCb = useApiCallback(
    async (api, args: CustomerOptions) => await api.auth.create_user(args)
  );

  const internalCb = useApiCallback(
    async (api, args: InternalOptions) =>
      await api.auth.web_create_internal_account(args)
  );

  const loading =
    type === "customer" ? customersCb.loading : internalCb.loading;

  async function createCustomer(args: CustomerOptions) {
    try {
      return await customersCb.execute(args);
    } catch (error) {
      console.error(`Something went wrong with customer creation: ${error}.`);
      throw error;
    }
  }

  async function createInternal(args: InternalOptions) {
    try {
      return await internalCb.execute(args);
    } catch (error) {
      console.error(`Something went wrong with internal creation: ${error}.`);
      throw error;
    }
  }

  const execute = (
    additionalArgs?: Partial<CustomerOptions | InternalOptions>
  ) => {
    const combinedArgs = { ...params.fields, ...additionalArgs };
    return type === "customer"
      ? createCustomer(combinedArgs as CustomerOptions)
      : createInternal(combinedArgs as InternalOptions);
  };

  return {
    execute,
    loading,
  };
};
