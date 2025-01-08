/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { PricingDetails } from "@/constants/constants";
import { DetailedPopUp } from "./DetailedPopUp";
import PricingContent from "./PricingContent";

interface SelectPriceDetailsProp {
  onClick: () => void;
}

export const SelectPriceDetails = ({ onClick }: SelectPriceDetailsProp) => {
  return (
    <DetailedPopUp onClick={onClick}>
      <PricingContent
        details={PricingDetails}
      />
    </DetailedPopUp>
  );
};
