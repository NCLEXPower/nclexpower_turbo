import React from "react";
import { usePaymentWizardSteps } from "./steps/useSteps";
import { Container } from "@mui/material";
import { usePaymentWalkthroughFormContext } from "./PaymentWalkthroughContext";
import { PaymentTerms } from "./validation";

export const PaymentWalkthroughForm = () => {
  const { form } = usePaymentWalkthroughFormContext();
  const { render } = usePaymentWizardSteps(
    form.handleSubmit((data) => handleSave(data))
  );

  return <Container>{render}</Container>;

  async function handleSave(values: PaymentTerms) {
    console.log("handleSave values", values.IsAgree);
  }
};
