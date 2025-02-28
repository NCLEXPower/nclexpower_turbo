import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";
import {
  BlueDocument,
  GreenDocument,
  LightBulbBlue,
  LightBulbGreen,
} from "core-library/assets";
import {
  ProductSelectionProps,
  ProductCardType,
} from "core-library/types/global";

const ProductSelection = ({
  cardData,
  selectedProduct,
  setSelectedProduct,
  handleSelectProduct,
}: ProductSelectionProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProduct(Number(event.target.value));
  };

  const handleProductDetails = () => {
    const selectedCard = cardData.find(
      (card: ProductCardType) => card.programType === selectedProduct
    );

    if (!selectedCard) return;

    handleSelectProduct({
      amount: selectedCard.pricing.price,
      currency: selectedCard.pricing.currency,
      productName: selectedCard.productName,
      productDescription: selectedCard.productDescription,
      programTitle: selectedCard.programTitle,
      pricingId: selectedCard.pricingId,
      productId: selectedCard.id,
      programType: selectedCard.programType,
      inclusions: selectedCard.inclusions,
    });
  };

  const getBackgroundColor = (
    programTitle: number,
    selectedProduct: number,
    option: number
  ) => {
    if (programTitle === 0) {
      return option === selectedProduct ? "bg-[#0F2A7126]" : "bg-white";
    }

    if (programTitle === 1) {
      return option === selectedProduct ? "bg-[#084A4E26]" : "bg-white";
    }

    return "bg-white";
  };

  const formatPrice = (card: ProductCardType) => {
    if (!card?.pricing) {
      return "$0";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: card.pricing?.currency || "USD",
      minimumFractionDigits: 0,
    }).format(card.pricing?.price || 0);
  };

  return (
    <div className="w-full md:w-[clamp(1px,25.261vw,970px)] flex flex-col justify-between  text-[#232323] bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[clamp(1px,1.1vw,40px)]">
      <div className="flex flex-col h-full space-y-6  md:!space-y-[clamp(1px,2.5vw,96px)]">
        <div className="md:px-[clamp(1px,2.083331vw,80px)] px-[clamp(1px,4.65116vw,80px)] md:pt-[clamp(1px,2.083331vw,80px)] pt-[clamp(1px,4.65116vw,80px)]">
          <FormControl className="w-full">
            <FormLabel id="product-selection">
              <h2 className="font-Poppins text-[clamp(1px,5.11627vw,48px)] md:text-[clamp(1px,1.25vw,48px)] font-bold md:mb-[clamp(1px,1.25vw,48px)] mb-[clamp(1px,3.48837vw,48px)]">
                Product Selection
              </h2>
            </FormLabel>

            <RadioGroup
              aria-labelledby="product-selection"
              name="product-selection-group"
              value={selectedProduct}
              onChange={handleChange}
              className="space-y-3 w-full"
            >
              {cardData.map((card: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between w-full p-[clamp(1px,3.25581vw,50px)] md:p-[clamp(2px,1.302081vw,50px)] rounded-[clamp(1px,1.8vw,30px)]  md:rounded-[clamp(1px,0.8vw,30px)] transition-all duration-300 shadow-[0px_1px_4.2px_0px_rgba(0,0,0,0.25)] border cursor-pointer ${getBackgroundColor(
                      card.programTitle,
                      selectedProduct,
                      card.programType
                    )}`}
                    onClick={() => setSelectedProduct(card.programType)}
                  >
                    <div className="flex items-center justify-center w-full">
                      <Radio
                        value={card.programType}
                        checked={selectedProduct === card.programType}
                        className="hidden"
                      />
                      <div className="w-full font-ptSans flex flex-col items-start justify-start ms-[clamp(1px,0.520834vw,20px)]">
                        <h1 className="text-[clamp(1px,4.65116vw,48px)]  md:text-[clamp(1px,1.25vw,48px)] font-ptSans font-bold ">
                          {card.programType === 0 ? "Standard" : "Fast Track"}
                        </h1>
                        <p className="md:text-[clamp(1px,0.729165vw,28px)] text-[clamp(1px,2.7907vw,28px)] font-ptSans font-normal  !m-[0]">
                          {card.programType == 0
                            ? "Twenty Three (23) Days"
                            : "Eight (8) Days"}
                        </p>
                      </div>
                    </div>

                    <div className=" text-right font-bold font-Poppins text-[clamp(1px,5.81395vw,70px)] md:text-[clamp(1px,1.822914vw,70px)]">
                      {formatPrice(card)}
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
        <hr className="text-[#BFBFBF] mx-[clamp(1px,2.083331vw,80px)]" />
        <div className="h-full flex flex-col justify-end items-center px-[clamp(1px,4.65116vw,80px)] md:px-[clamp(1px,2.5vw,96px)]">
          <div className="relative w-full flex flex-col items-end">
            <div className="relative flex flex-col items-end w-full -bottom-6 z-10">
              <Image
                src={
                  cardData[0].programTitle === 0 ? BlueDocument : GreenDocument
                }
                alt="Blue Document"
                className="w-[150px] h-[170px] md:w-[clamp(1px,10.625vw,408px)] md:h-[clamp(1px,10.99vw,422px)]"
              />
              <Image
                src={
                  cardData[0].programTitle === 0
                    ? LightBulbBlue
                    : LightBulbGreen
                }
                alt="Light Bulb Blue"
                className="absolute  bottom-[clamp(-110px,-2vw,1px)] xl:bottom-[clamp(-110px,-2.85vw,1px)] right-[clamp(-130px,-3.45vw,1px)] w-[150px] h-[220px] md:w-[clamp(1px,11.823vw,454px)] md:h-[clamp(1px,13.021vw,500px)]"
              />
            </div>
            <button
              className={`text-primary font-Poppins text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] py-[clamp(1px,3.12vw,24px)] md:py-[clamp(1px,0.623vw,24px)] ${cardData[0].programTitle === 0 ? "bg-darkBlue" : "bg-[#084A4E]"} rounded-[clamp(1px,1.5vw,20px)] md:rounded-[clamp(1px,0.5vw,20px)] w-full z-20`}
              onClick={handleProductDetails}
            >
              Get Started
            </button>
          </div>
          <p className="text-[clamp(1px,2.6vw,28px)] md:text-[clamp(1px,0.729165vw,28px)] text-[#8A8A8A] !mb-[clamp(1px,4.65116vw,80px)] md:!mb-[clamp(1px,2.083331vw,80px)]">
            Both programs allow up to 6 months access to the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
