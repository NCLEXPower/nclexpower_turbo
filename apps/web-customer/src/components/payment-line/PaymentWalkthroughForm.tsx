import React from "react";
import { usePaymentWizardSteps } from "./steps/useSteps";
import { Container } from "@mui/material";

export const PaymentWalkthroughForm = () => {
  const { renderStep: render } = usePaymentWizardSteps();

  return (
    <Container>
      {render({
        isLoading: false,
      })}
    </Container>
  );
};
