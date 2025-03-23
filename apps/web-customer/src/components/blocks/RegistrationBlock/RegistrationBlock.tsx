/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { RegistrationForm } from "./RegistrationForm";
import { RegistrationFormType } from "core-library/system";
import { useRouter } from "core-library/core/router";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { SelectedProductType } from "core-library/types/global";
import {
  useApi,
  useApiCallback,
  useDesignVisibility,
  useRecaptcha,
} from "core-library/hooks";
import { useCustomerCreation } from "../../../core/hooks/useCustomerCreation";
import { CreateCustomerParams } from "core-library/api/types";
import { useExecuteToast } from "core-library/contexts";

export const RegistrationBlock = () => {
  useDesignVisibility();
  const router = useRouter();
  const orderNumberCb = useApi((api) => api.webbackoffice.getOrderNumber());
  const createOrderSummaryCb = useApiCallback(
    async (
      api,
      args: {
        orderNumber: string | undefined;
        productId: string;
        accountId: string | undefined;
        pricingId: string | undefined;
      }
    ) => await api.web.create_order_summary(args)
  );
  const orderDetail = useDecryptOrder() as SelectedProductType;
  const { reset, recaptchaRef, siteKey } = useRecaptcha();
  const verifyCb = useApiCallback(
    async (api, args: { token: string }) => await api.auth.verifyRecaptcha(args)
  );
  const toast = useExecuteToast();
  const { createCustomerAsync, isLoading } = useCustomerCreation();

  async function handleSubmit(
    values: RegistrationFormType,
    token: string | null
  ) {
    const { productId, amount } = orderDetail;

    if (!productId || !amount || !token) return reset();

    const filteredValues: CreateCustomerParams = {
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      orderNumber: orderNumberCb.result?.data,
      productId,
      totalAmount: amount,
      privacyServicePolicy: values.termsofservice,
    };

    try {
      var result = await verifyCb.execute({ token: token });
      if (result.status === 200) {
        const _result = await createCustomerAsync(filteredValues);
        const orderSummary = {
          orderNumber: orderNumberCb.result?.data,
          productId,
          accountId: _result?.data.accountId,
          pricingId: orderDetail.pricingId,
        };
        await createOrderSummaryCb.execute({
          ...orderSummary,
        });
        await router.push((route) => route.login);
      }
    } catch (error) {
      toast.showToast(
        `Something went wrong during submission ${error}`,
        "error"
      );
      return;
    }
  }

  const handleBack = () => {
    router.push((route) => route.order_summary);
  };

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      handleBack={handleBack}
      submitLoading={isLoading || orderNumberCb.loading || router.loading}
      recaptchaRef={recaptchaRef}
      siteKey={siteKey}
    />
  );
};
