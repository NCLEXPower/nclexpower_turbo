/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { CreateCustomerParams } from "core-library/api/types";
import { useApiCallback } from "core-library/hooks";

export const useCustomerCreation = () => {
  const createCb = useApiCallback(
    async (api, args: CreateCustomerParams) =>
      await api.web.web_ssr_create_customer(args)
  );
  async function createCustomerAsync(params: CreateCustomerParams) {
    try {
      const result = await createCb.execute({ ...params });
      return result;
    } catch (error) {
      console.error(`Something went wrong with customer creation: ${error}.`);
      return;
    }
  }

  return {
    createCustomerAsync,
    isLoading: createCb.loading,
  };
};
