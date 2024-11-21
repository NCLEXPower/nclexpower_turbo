import { useRouter } from "core-library";
import { CreateCustomerParams } from "core-library/api/types";
import { useExecuteToast } from "core-library/contexts";
import { useApiCallback } from "core-library/hooks";
import React from "react";

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
      if (result.status === 200) {
        await router.push((route) => route.login);
        toast.showToast("Account has been created successfully", "success");
      }
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  }

  return {
    createCustomerAsync,
    isLoading: createCb.loading,
  };
};
