import React, { useEffect } from "react";
import { NCLEXBanner, ProceedButton, SignOutButton } from "./components";
import { Card, Checkbox, EvaIcon } from "core-library/components";
import { Box } from "@mui/material";
import { ProductInformationLoader } from "core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader";
import {
  PaymentExecutionProps,
  usePaymentWalkthroughFormContext,
} from "../../PaymentWalkthroughContext";
import { useSafeStripe, useValidateToken } from "core-library/hooks";
import { NotFoundBlock } from "@/components/blocks/NotFoundBlock/NotFoundBlock";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useExecuteToast } from "core-library/contexts";

interface Props {
  nextStep({}): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export function StripePaymentPage({
  previousStep,
  nextStep,
  next,
  previous,
  reset,
}: Props) {
  const { loading, execute } = usePaymentWalkthroughFormContext();
  const { stripe, elements, isStripeReady } = useSafeStripe();
  const toast = useExecuteToast();

  if (loading) {
    return <ProductInformationLoader />;
  }

  if (!isStripeReady) return;

  if (!stripe || !elements) {
    return <NotFoundBlock />;
  }

  async function handleProceed() {
    const stripeObject = {
      stripe,
      elements,
    } as PaymentExecutionProps;
    await execute({ ...stripeObject });
  }

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="w-full lg:w-[800px] ">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handlePrevious}
          >
            <EvaIcon
              name="arrow-back-outline"
              fill="#0F2A71"
              width={20}
              height={20}
            />
            <span className="pt-sans-regular text-[#0F2A71] text-lg">Back</span>
          </div>
          <SignOutButton />
        </Box>
        <div className="w-full">
          <h1 className="pt-sans-bold md:text-3xl text-2xl lg:text-4xl text-[#0F2A71] mb-4">
            Payment
          </h1>
          <Card sx={{ padding: 5, width: "100%" }} elevation={4}>
            <Box sx={{ width: "100%" }}>
              <h1 className="pt-sans-bold text:lg md:text-2xl text-[#0F2A71]">
                Contact/Payment Information
              </h1>
              <hr className="w-full bg-[#0F2A71]/5 my-4" />
            </Box>
            <div className="w-full h-full flex flex-col gap-2 form-font font-semibold">
              <p className="border-b border-slate-400 mb-2 pb-2 text-slate-500">
                Contact Information
              </p>
              <LinkAuthenticationElement />
              <p className="border-b border-slate-400 mb-2 pb-2 text-slate-500">
                Card Information
              </p>
              <PaymentElement />
            </div>
          </Card>
          <ProceedButton
            loading={loading}
            onClick={handleProceed}
            btnTitle="Confirm Payment"
          />
        </div>
      </div>
      <NCLEXBanner />
    </Box>
  );
}
