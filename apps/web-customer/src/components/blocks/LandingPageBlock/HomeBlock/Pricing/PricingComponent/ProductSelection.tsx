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
    <div className="w-full xl:w-2/6 flex flex-col justify-between px-8 py-12 text-[#232323] bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl">
      <div className="flex flex-col h-full space-y-12">
        <FormControl className="h-1/2">
          <FormLabel id="product-selection">
            <h2 className="font-ptSans text-xl lg:text-3xl font-bold mb-6">
              Product Selection
            </h2>
          </FormLabel>
          <RadioGroup
            aria-labelledby="product-selection"
            name="product-selection-group"
            value={selectedProduct}
            onChange={handleChange}
            className="space-y-3"
          >
            {cardData.map((card: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between w-full px-6 py-3 rounded-2xl transition-all duration-300 shadow-[0px_1px_4.2px_0px_rgba(0,0,0,0.25)] border cursor-pointer ${getBackgroundColor(
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
                    <div className="w-full font-ptSans flex flex-col items-start justify-start">
                      <h1 className="text-xl font-ptSans lg:text-3xl font-bold -mb-4 pt-2">
                        {card.programType === 0 ? "Standard" : "Fast Track"}
                      </h1>
                      <p className="text-sm font-ptSans font-normal">
                        {card.programType == 0
                          ? "Twenty Three (23) Days"
                          : "Eight (8) Days"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mx-auto text-right font-bold text-2xl lg:text-[35px]">
                    {formatPrice(card)}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>

        <hr className="text-[#BFBFBF]" />
        <div className="h-full flex flex-col justify-end px-12">
          <div className="relative w-full flex flex-col items-end">
            <div className="relative flex flex-col items-end w-full -bottom-6 z-10">
              <Image
                src={
                  cardData[0].programTitle === 0 ? BlueDocument : GreenDocument
                }
                alt="Blue Document"
                className="w-[150px] h-[170px] md:w-[204px] md:h-[211px]"
              />
              <Image
                src={
                  cardData[0].programTitle === 0
                    ? LightBulbBlue
                    : LightBulbGreen
                }
                alt="Light Bulb Blue"
                className="absolute -bottom-14 -right-16 w-[150px] h-[220px] md:w-[227px] md:h-[264px]"
              />
            </div>
            <button
              className={`text-primary py-3 ${cardData[0].programTitle === 0 ? "bg-darkBlue" : "bg-[#084A4E]"} rounded-xl w-full z-20`}
              onClick={handleProductDetails}
            >
              Get Started
            </button>
          </div>
          <p className="text-sm text-[#8A8A8A]">
            Both programs allow up to 6 months access to the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
