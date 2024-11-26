/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { useRouter } from "core-library";
import { CreateCustomerParams } from "core-library/api/types";
import { useExecuteToast } from "core-library/contexts";
import { useApiCallback } from "core-library/hooks";

export const useCustomerCreation = () => {
  const createCb = useApiCallback(
    async (api, args: CreateCustomerParams) =>
      await api.web.web_ssr_create_customer(args)
  );
  const router = useRouter();
  const toast = useExecuteToast();
  async function createCustomerAsync(params: CreateCustomerParams) {
    try {
      const result = await createCb.execute({ ...params });

      if (result.data === 200) {
        await router.push((route) => route.login);
        toast.showToast("Account has been created successfully", "success");
      }

      if (result.data === 1012) {
        toast.showToast("Email account already exist. Please try again.", "error");
      }

      else {
        toast.showToast("An unexpected error occurred. Please try again.", "error");
      }

      return;

    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  }

  return {
    createCustomerAsync,
    isLoading: createCb.loading,
  };
};
