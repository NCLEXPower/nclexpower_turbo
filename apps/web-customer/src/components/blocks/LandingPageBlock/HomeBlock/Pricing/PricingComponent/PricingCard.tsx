/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/
import {
  ProductCardType,
  SelectedProductType,
} from "core-library/types/global";
import React from "react";
import { EvaIcon } from "core-library/components";

interface CardProps {
  cardData: ProductCardType;
  handleSelectProduct: (values: SelectedProductType) => void;
}

const PricingCard: React.FC<CardProps> = ({
  cardData,
  handleSelectProduct,
}) => {
  const ProgramTitle = cardData.programTitle;
  const InclusionsList = cardData.inclusions?.features;

  const handleProductDetails = () => {
    handleSelectProduct({
      amount: cardData.pricing.price,
      currency: cardData.pricing.currency,
      productName: cardData.productName,
      productDescription: cardData.productDescription,
      programTitle: cardData.programTitle,
      pricingId: cardData.pricingId,
      productId: cardData.id,
      programType: cardData.programType, // 0 = 23 Days : 1 = 8 Days
      inclusions: cardData.inclusions,
    });
  };

  return (
    <div
      onClick={handleProductDetails}
      className=" transition-all duration-300 h-full border border-darkGray bg-white w-[350px] px-12 py-5 rounded-md shadow-md flex flex-col"
    >
      <p className="text-2xl w-full text-center">
        {cardData.programType == 0
          ? "23 Days (Standard)"
          : "8 Days (Fast Track)"}
      </p>
      <div className="w-full flex pb-5 justify-center items-center px-5 border-b -mt-3">
        <div className="w-1/2 text-center">
          <div className="text-4xl font-Poppins font-bold">
            <p>{cardData.pricing.price} </p>
            <p className="text-sm -mt-4">{cardData.pricing.currency}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex  justify-start items-start py-5 flex-grow">
        <div className="text-xs flex flex-col">
          {InclusionsList.length > 0 &&
            InclusionsList.map((list, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>
                  <EvaIcon
                    id="check-icon"
                    name="checkmark-circle-2-outline"
                    fill="#4B4B4B"
                    width={20}
                    height={20}
                  />
                </span>
                <p className="m-2">{list}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex gap-5 py-5 justify-center items-center px-2 font-semibold">
        <button
          className={`${ProgramTitle === 1 ? "bg-[#08474b]" : "bg-[#0c225c]"} text-white w-full py-2 rounded-lg`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
export default PricingCard;
