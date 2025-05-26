import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Divider } from "@mui/material";
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
import { formatPrice } from "core-library/utils";
import {
  ProductRadioSelectionField,
  ProductRadioOption,
  Button,
} from "core-library/components";

const ProductSelection = ({
  cardData,
  selectedProduct,
  setSelectedProduct,
  handleSelectProduct,
}: ProductSelectionProps) => {
  const options: ProductRadioOption[] = cardData.map(
    (card: ProductCardType) => {
      const bgColor =
        card.programType === selectedProduct
          ? card.programTitle === 0
            ? "#0F2A7126"
            : "#084A4E26"
          : "bg-white";

      const formattedPrice = formatPrice(
        card.pricing?.price,
        card.pricing?.currency
      );
      return {
        option: {
          productValue: card.productName,
          productType: card.programType,
          ...card,
        },
        value: card.programType,
        bgColor,
        formattedPrice,
      };
    }
  );

  const { control, watch } = useForm({
    defaultValues: { product: selectedProduct },
  });

  const watchedProduct = watch("product");
  useEffect(() => {
    setSelectedProduct(watchedProduct);
  }, [watchedProduct, setSelectedProduct]);

  const handleProductDetails = (isTrial: boolean = false) => {
    const selectedCard = cardData.find(
      (card: ProductCardType) => card.programType === watchedProduct
    );
    if (!selectedCard) return;
    handleSelectProduct(
      {
        amount: selectedCard.pricing.price,
        currency: selectedCard.pricing.currency,
        productName: selectedCard.productName,
        productDescription: selectedCard.productDescription,
        programTitle: selectedCard.programTitle,
        pricingId: selectedCard.pricingId,
        productId: selectedCard.id,
        programType: selectedCard.programType,
        inclusions: selectedCard.inclusions,
      },
      isTrial
    );
  };

  return (
    <Box className="w-full xl:w-2/6 flex flex-col justify-between px-8 py-12 text-[#232323] bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl">
      <Box className="flex flex-col h-full">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "PT Sans, sans-serif",
            fontSize: "2.13rem",
            fontWeight: 700,
            color: "#232323",
            lineHeight: "108%",
            marginBottom: "1.19rem",
          }}
        >
          Product Selection
        </Typography>
        <ProductRadioSelectionField
          name="product"
          control={control}
          options={options}
          ariaLabelledby="product-selection"
        />
        <Typography
          sx={{
            fontFamily: "PT Sans, sans-serif",
            fontSize: "1.13rem",
            color: "#8A8A8A",
            fontWeight: 400,
            lineHeight: "2.25rem",
            marginTop: "9px",
          }}
        >
          Both programs allow up to 6 months access to the system.
        </Typography>
        <Divider sx={{ borderColor: "#8A8A8A" }} />

        <Box className="h-full flex flex-col justify-end px-8">
          <Box className="relative w-full flex flex-col items-end">
            <Box className="relative flex flex-col items-end w-full -bottom-6 z-10">
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
            </Box>

            <Button
              sx={{
                color: "#fff",
                backgroundColor:
                  cardData[0].programTitle === 0 ? "#0F2A71" : "#084A4E",
                borderRadius: "12.66px",
                width: "100%",
                zIndex: 20,
                fontSize: "1.25rem",
                lineHeight: "45px",
                fontWeight: "bold",
                py: 3,
              }}
              onClick={() => handleProductDetails()}
            >
              Buy Product
            </Button>

            <Divider
              sx={{
                borderColor: "#8A8A8A",
                width: "100%",
                color: "rgba(138,138,138,0.67)",
                fontSize: "14px",
                margin: "1rem 0",
              }}
            >
              or
            </Divider>
            <Button
              sx={{
                color: "#fff",
                backgroundColor:
                  cardData[0].programTitle === 0 ? "#3456af" : "#138d94",
                borderRadius: "0.75rem",
                width: "100%",
                zIndex: 20,
                fontSize: "1.25rem",
                lineHeight: "45px",
                fontWeight: "bold",
                py: 3,
              }}
              onClick={() => handleProductDetails(true)}
            >
              Start Free Trial
            </Button>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#8A8A8A",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Free trial allow up to 24 hours access to the system with limited
            contents.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductSelection;
