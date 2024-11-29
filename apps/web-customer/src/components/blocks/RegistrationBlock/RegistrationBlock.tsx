/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { RegistrationForm } from "./RegistrationForm";
import { RegistrationFormType } from "core-library/system";
import { useRouter } from "core-library/core/router";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useOrderNumber } from "core-library/contexts/auth/hooks";
import { SelectedProductType } from "core-library/types/global";
import {
  useApiCallback,
  useDesignVisibility,
  useRecaptcha,
} from "core-library/hooks";
import { useCustomerCreation } from "../../../core/hooks/useCustomerCreation";
import { CreateCustomerParams } from "core-library/api/types";

export const RegistrationBlock = () => {
  useDesignVisibility();

  const router = useRouter();
  const orderDetail = useDecryptOrder() as SelectedProductType;
  const [orderNumber, setOrderNumber] = useOrderNumber();
  const { reset, recaptchaRef, siteKey } = useRecaptcha();
  const verifyCb = useApiCallback(
    async (api, args: { token: string }) => await api.auth.verifyRecaptcha(args)
  );

  const { createCustomerAsync, isLoading } = useCustomerCreation();

  async function handleSubmit(
    values: RegistrationFormType,
    token: string | null
  ) {
    const { productId, amount } = orderDetail;

    if (!orderNumber || !productId || !amount || !token) return;

    const filteredValues: CreateCustomerParams = {
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      orderNumber,
      productId,
      totalAmount: amount,
    };
    var result = await verifyCb.execute({ token: token });
    console.log("result", result);
    if (result.status === 200) {
      await createCustomerAsync(filteredValues);
    }
  }

  const handleBack = () => {
    router.push((route) => route.order_summary);
  };

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      handleBack={handleBack}
      submitLoading={isLoading}
      recaptchaRef={recaptchaRef}
      siteKey={siteKey}
    />
  );
};
