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
import { formatCurrency } from "core-library/utils";
import { RadioGroup, Radio, Button } from "core-library/components";

const getBackgroundColor = (
  programTitle: number,
  selectedProduct: number,
  option: number
) => {
  if (programTitle === 0) {
    return option === selectedProduct
      ? { backgroundColor: "#0F2A7126", borderColor: "#0F2A716B" }
      : { backgroundColor: "#fff", borderColor: "#dfdfdf" };
  }
  if (programTitle === 1) {
    return option === selectedProduct
      ? { backgroundColor: "#084A4E26", borderColor: "#084A4E6B" }
      : { backgroundColor: "#fff", borderColor: "#dfdfdf" };
  }
  return { backgroundColor: "#fff", borderColor: "#dfdfdf" };
};

const ProductSelection = ({
  cardData,
  selectedProduct,
  setSelectedProduct,
  handleSelectProduct,
}: ProductSelectionProps) => {
  const handleChange = (programType: number) => {
    setSelectedProduct(programType);
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

  const radioOptions = cardData.map((card, index) => {
    const isSelected = selectedProduct === card.programType;
    const isLast = index === cardData.length - 1;
    const { backgroundColor, borderColor } = getBackgroundColor(
      card.programTitle,
      selectedProduct,
      card.programType
    );
    const formattedPrice = formatCurrency(
      card.pricing?.currency,
      card.pricing?.price
    );

    return {
      Value: card.programType,
      XValue: card.programType,
      Element: (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "1.81rem 1.5rem",
            borderRadius: "1.06rem",
            transition: "all 0.3s",
            boxShadow: "0px 1px 4.2px 0px rgba(0,0,0,0.25)",
            border: `1px solid ${borderColor}`,
            cursor: "pointer",
            backgroundColor,
            mb: !isLast ? 5 : 0,
          }}
          onClick={() => handleChange(Number(card.programType))}
        >
          <Radio
            value={card.programType}
            checked={isSelected}
            color="primary"
            onChange={() => handleChange(Number(card.programType))}
            label=""
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontFamily: "PT Sans, sans-serif",
                fontSize: "1.94rem",
                lineHeight: "108%",
              }}
            >
              {card.programType === 0 ? "Standard" : "Fast Track"}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontFamily: "PT Sans, sans-serif",
                fontSize: "0.94rem",
                lineHeight: "108%",
              }}
            >
              {card.programType === 0
                ? "Twenty Three (23) Days"
                : "Eight (8) Days"}
            </Typography>
          </Box>
          <Typography
            sx={{
              width: "100%",
              textAlign: "right",
              fontWeight: 700,
              fontSize: "2.18rem",
            }}
          >
            {formattedPrice}
          </Typography>
        </Box>
      ),
    };
  });

  return (
    <Box className="w-full xl:w-2/6 flex flex-col justify-between px-8 py-12 text-[#232323] bg-[#F2F2F2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl">
      <Box className="flex flex-col h-full space-y-12">
        <Typography
          variant="h2"
          sx={{
            fontSize: "2.13rem",
            fontweight: 700,
            lineHeight: "108%",
            fontFamily: "PT Sans, sans-serif",
            marginBottom: "1.19rem",
          }}
        >
          Product Selection
        </Typography>
        <RadioGroup
          radio={radioOptions}
          value={selectedProduct}
          onChange={setSelectedProduct}
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
              onClick={handleProductDetails}
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
              onClick={handleProductDetails}
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
