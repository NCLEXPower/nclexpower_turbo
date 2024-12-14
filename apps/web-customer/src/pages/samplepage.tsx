import { DetailedPopUp } from "@/components/blocks/HomePageBlocks/Pricing/PricingComponent/DetailedPopUp";
import { PricingDetails } from "@/constants/constants";
import { Button, EvaIcon } from "core-library/components";
import React from "react";

interface ContentProp{
    details: {
        price: number;
        currency: string;
        productType: string;
        duration: string;
        inclusions: Array<{
            label: string;
        }>;
    }
}





const SamplePage = () => {

  return (
      <DetailedPopUp onClick={() => { }}>
          {/* <Content details={PricingDetails} />  */}
      </DetailedPopUp>
  );
};

export default SamplePage;
