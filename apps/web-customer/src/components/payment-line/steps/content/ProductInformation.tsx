import React, { useEffect } from "react";
import { NCLEXBanner, ProceedButton, SignOutButton } from "./components";
import { Card, EvaIcon } from "core-library/components";
import { Box, Typography } from "@mui/material";
import { productData } from "./constant/ContentData";
import Divider from "core-library/components/Divider/Divider";
import { ProductInformationLoader } from "core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader";
import { usePageLoaderContext } from "core-library/contexts";
import { usePaymentWalkthroughFormContext } from "../../PaymentWalkthroughContext";
import { OrderSummaryResponse } from "core-library/api/types";

interface Props {
  nextStep({}): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export function ProductInformation({
  previousStep,
  nextStep,
  next,
  previous,
  reset,
}: Props) {
  const { orderSummary, loading } = usePaymentWalkthroughFormContext();

  if (loading) {
    return <ProductInformationLoader />;
  }

  const handleProceed = () => {
    next();
    nextStep("TermsConditionsPage");
  };

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const OrderSummarize = ({
    order,
  }: {
    order: Partial<OrderSummaryResponse | undefined>;
  }) => {
    const isOrderValid = (): boolean => {
      return (
        !!order?.orderId &&
        !!order?.orderNumber &&
        !!order?.productName &&
        !!order?.productDescription &&
        !!order?.currency &&
        typeof order?.price === "number" &&
        order?.price > 0 &&
        !!order?.categoryName &&
        !!order?.categoryDescription
      );
    };

    return (
      <Card sx={{ padding: 5, width: "100%" }} elevation={4}>
        {isOrderValid() ? (
          <Box sx={{ width: "100%" }}>
            <h1 className="pt-sans-bold text-2xl text-[#0F2A71] mb-4">
              Order Summary
            </h1>
            <Divider color="#0F2A71/50%" thickness={3} />
            <div className="px-2 lg:px-24">
              <div className="flex items-center justify-between pt-sans-narrow-bold text-[#0f2A71] mt-4 ">
                <Typography
                  sx={{
                    fontFamily: "PT Sans",
                    fontSize: "clamp(0.90rem, 2.5vw, 1rem)",
                    fontWeight: "bold",
                    color: "#0F2A71",
                  }}
                >
                  Plan Name :{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "PT Sans",
                    fontSize: "clamp(0.90rem, 2.5vw, 1rem)",
                    fontWeight: "bold",
                    color: "#0F2A71",
                  }}
                >
                  Duration :{" "}
                </Typography>
              </div>
              <div className="w-full flex items-center justify-between text-darkBlue">
                <Typography
                  sx={{
                    fontFamily: "PT Sans Narrow",
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    fontWeight: "bold",
                  }}
                >
                  {orderSummary?.productName}{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "PT Sans Narrow",
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    fontWeight: "bold",
                  }}
                >
                  {orderSummary?.programTitle === 0 &&
                  orderSummary?.programType === 0
                    ? "(RN) 23 Days (Standard)"
                    : "(PN) 8 Days (Fast Track)"}
                </Typography>
              </div>
            </div>
            <div className="flex items-start justify-around flex-col pt-sans-bold mt-6">
              <p className="text-[#0F2A71]">Product Description:</p>
              <p className="text-slate-700 -mt-4 pt-sans-narrow-regular pr-6 md:pr-20 pl-4">
                {orderSummary?.productDescription}
              </p>
            </div>
            <Divider color="#0F2A71/50%" thickness={3} />
            <div className="flex items-center justify-end gap-3 pt-sans-narrow-bold text-[#0f2A71] text-xl mt-3">
              <Typography
                sx={{
                  fontFamily: "PT Sans",
                  fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)",
                  fontWeight: "bold",
                  color: "#0F2A71",
                }}
              >
                Product Price :{" "}
              </Typography>
              <p className="text-2xl md:text-3xl lg:text-4xl">
                {orderSummary?.price} {orderSummary?.currency}
              </p>
            </div>
          </Box>
        ) : (
          <div>No Data...</div>
        )}
      </Card>
    );
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
      <div className="lg:w-[800px] w-full">
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
          <h1 className="pt-sans-bold text-2xl md:text-3xl lg:text-4xl text-[#0F2A71] mb-4">
            Contact Information
          </h1>
          <OrderSummarize order={orderSummary} />
          <ProceedButton onClick={handleProceed} />
        </div>
      </div>
      <NCLEXBanner />
    </Box>
  );
}
