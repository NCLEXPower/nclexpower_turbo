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
      className=" transition-all duration-300  h-full border border-darkGray bg-white md:w-[clamp(1px,28.646vw,1100px)] px-md-4 px-5 py-md-3 py-4 rounded-lg shadow-md flex flex-col"
    >
      <div className="w-full flex pb-md-4 pb-5 justify-center items-center border-b ">
        <div className=" text-center">
          <p className="text-[clamp(1px,5.5814vw,56px)] md:text-[clamp(1px,1.458331vw,56px)] pt-sans-regular w-full text-center">
            {cardData.programType == 0
              ? "23 Days (Standard)"
              : "8 Days (Fast Track)"}
          </p>
          <h2 className="text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] font-Poppins font-bold">
            ${cardData.pricing.price} <br />
          </h2>
          <p className="text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] pt-sans-bold  !m-[0]">{cardData.pricing.currency}</p>
        </div>
      </div>
      <div className="w-full flex  justify-start items-start  py-4  flex-grow">
        <div className="text-[clamp(1px,3.72092vw,20px)] md:text-[clamp(1px,1.041665vw,40px)] pt-sans-narrow-regular flex flex-col">
          {InclusionsList.length > 0 &&
            InclusionsList.map((list, index) => (
              <div key={index} className="flex items-start ">
                <span className="md:mt-1 mt-[clamp(1px,0.6vw,14px)]  me-2">
                  <EvaIcon
                    id="check-icon"
                    name="checkmark-circle-2-outline"
                    fill="#4B4B4B"
                    className="!w-[clamp(1px,4.187vw,36px)] md:!w-[clamp(1px,1.042vw,40px)] !h-[clamp(1px,4.187vw,36px)] md:!h-[clamp(1px,1.042vw,40px)]"
                  />
                </span>
                <p className="mx-2 mx-md-1 !my-0 !mb-2">{list}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex  py-4 pt-md-0 justify-center items-center px-3 px-md-0 pt-sans-narrow-bold text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)]">
        <button
          className={`${ProgramTitle === 1 ? "bg-[#08474b]" : "bg-[#0c225c]"} text-white w-full py-[clamp(1px,2.842vw,24px)] md:py-[clamp(1px,0.75304vw,24px)] rounded-lg`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
export default PricingCard;
