/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { isAxiosError } from "axios";
import { CreateCustomerParams } from "core-library/api/types";
import { useExecuteToast } from "core-library/contexts";
import { useApiCallback } from "core-library/hooks";

export const useCustomerCreation = () => {
  const createCb = useApiCallback(
    async (api, args: CreateCustomerParams) =>
      await api.web.web_ssr_create_customer(args)
  );
  const toast = useExecuteToast();
  async function createCustomerAsync(params: CreateCustomerParams) {
    try {
      const result = await createCb.execute({ ...params });
      return result;
    } catch (error) {
      if (!isAxiosError(error)) {
        console.error(`Something went wrong with customer creation: ${error}.`);
        throw error;
      }

      if (error.response?.status === 409) {
        toast.executeToast("Email address already exists", "top-right", false, {
          toastId: 0,
          type: "error",
        });

        throw new Error("EMAIL_EXISTS");
      }
      throw error;
    }
  }

  return {
    createCustomerAsync,
    isLoading: createCb.loading,
  };
};
