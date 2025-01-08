import { DetailedPopUp } from "@/components/blocks/HomePageBlocks/Pricing/PricingComponent/DetailedPopUp";
import PricingContent from "@/components/blocks/HomePageBlocks/Pricing/PricingComponent/PricingContent";
import { PricingDetails } from "@/constants/constants";
import { Button, EvaIcon } from "core-library/components";
import React from "react";

interface ContentProp {
  details: {
    price: number;
    currency: string;
    productType: string;
    duration: string;
    description: string;
    inclusions: Array<{
      label: string;
    }>;
  };
}

const SamplePage = () => {
  return (
    <DetailedPopUp onClick={() => {}}>
      <PricingContent
        details={PricingDetails}
      />
    </DetailedPopUp>
  );
};

export default SamplePage;
