import React from "react";
import { usePaymentWizardSteps } from "./steps/useSteps";
import { Container } from "@mui/material";
import { Button } from "core-library/components";

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
