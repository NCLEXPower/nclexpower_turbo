/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { RegistrationForm } from './RegistrationForm';
import { RegistrationFormType } from 'core-library/system';
import { useRouter } from "core-library/core/router";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useOrderNumber } from "core-library/contexts/auth/hooks";
import {AccountCreationData} from "core-library/types/types";
import { useExecuteToast } from 'core-library/contexts';
import { SelectedProductType } from 'core-library/types/global';

export const RegistrationBlock = () => {
    const router = useRouter();
    const toast = useExecuteToast();

    const orderDetail = useDecryptOrder() as SelectedProductType;

    const [orderNumber, setOrderNumber] = useOrderNumber();

    const showToast = (message: string, type: "error" | "success") => {
      toast.executeToast(message, "top-right", false, {
        toastId: 0,
        type,
      });
    };

    async function handleSubmit(values: RegistrationFormType) {
      const { productId, amount } = orderDetail;

      if(!orderNumber || !productId || !amount) return;

      const filteredValues: AccountCreationData = {
        firstname: values.firstname,
        middlename: values.middlename,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        orderNumber,
        productId,
        totalAmount: amount,
      };

      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        showToast("Account has been successfully created.", "success");
      } catch (err) {
        showToast("Something went wrong. Please try again.", "error");
      }
    }

    const handleBack = () => {
        router.push((route) => route.order_summary);
      };

    return (
        <RegistrationForm onSubmit={handleSubmit} handleBack={handleBack}/>
    )
  }