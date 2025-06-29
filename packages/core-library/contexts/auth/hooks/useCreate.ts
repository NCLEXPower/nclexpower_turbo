/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useApiCallback } from "../../../hooks";
import { CustomerOptions } from "../../../types/global";

export type CreateParams<T extends "customer" | "internal"> = {
  type?: T;
  fields: T extends "customer" ? CustomerOptions : InternalOptions;
};

export type InternalOptions = {};

export const useCreate = <T extends "customer" | "internal">(
  params: CreateParams<T> & { isCustomerCondition?: boolean }
) => {
  const type =
    params.type ?? (params.isCustomerCondition ? "customer" : "internal");

  const customersCb = useApiCallback(
    async (api, args: CustomerOptions) => await api.auth.create_user(args)
  );

  const loading = type === "customer" ? customersCb.loading : false;

  async function createCustomer(args: CustomerOptions) {
    try {
      return await customersCb.execute(args);
    } catch (error) {
      console.error(`Something went wrong with customer creation: ${error}.`);
      throw error;
    }
  }

  async function createInternal(args: InternalOptions) {}

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
