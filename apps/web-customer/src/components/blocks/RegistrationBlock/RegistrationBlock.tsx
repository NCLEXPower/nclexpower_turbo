/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { RegistrationForm } from "./RegistrationForm";
import { RegistrationFormType } from "core-library/system";
import { useRouter } from "core-library/core/router";
import { CustomerOptions } from "core-library/types/global";
import {
  useApi,
  useApiCallback,
  useDesignVisibility,
  useRecaptcha,
} from "core-library/hooks";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useResolvedProductId } from "core-library/contexts/auth/hooks";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";

export const RegistrationBlock = () => {
  useDesignVisibility();
  const { register, loading } = useAuthContext();
  const [resolvedProductId] = useResolvedProductId();
  const router = useRouter();
  const orderNumberCb = useApi((api) => api.webbackoffice.getOrderNumber());
  const verifyProductReference = useApi(
    async (api) => await api.web.verify_product_reference(resolvedProductId),
    [resolvedProductId]
  );
  const createOrderSummaryCb = useApiCallback(
    async (
      api,
      args: {
        orderNumber: string | undefined;
        reference?: string;
      }
    ) => await api.web.create_order_summary(args)
  );
  const { reset, recaptchaRef, siteKey } = useRecaptcha();
  const verifyCb = useApiCallback(
    async (api, args: { token: string }) => await api.auth.verifyRecaptcha(args)
  );
  const toast = useExecuteToast();

  if (verifyProductReference.loading) {
    return <p>Loading Please wait...</p>;
  }

  if (!resolvedProductId || !siteKey || !verifyProductReference.result?.data) {
    return <NotFoundBlock />;
  }

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      handleBack={handleBack}
      submitLoading={loading || orderNumberCb.loading || router.loading}
      recaptchaRef={recaptchaRef}
      siteKey={siteKey}
    />
  );

  async function handleSubmit(
    values: RegistrationFormType,
    token: string | null
  ) {
    if (!token || !resolvedProductId) return reset();

    const filteredValues: CustomerOptions = {
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      orderNumber: orderNumberCb.result?.data,
      isAgreeWithPrivacyPolicy: values.termsofservice,
    };

    try {
      var result = await verifyCb.execute({ token: token });
      if (result.status === 200) {
        const _result = await register(filteredValues);
        const orderSummary = {
          orderNumber: orderNumberCb.result?.data,
          reference: _result.data.reference, //observe return value. And add more property which is product id
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

  function handleBack() {
    router.push((route) => route.order_summary);
  }
};
