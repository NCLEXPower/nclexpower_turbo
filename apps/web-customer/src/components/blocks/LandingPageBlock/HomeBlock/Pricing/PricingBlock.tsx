/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingComponent/PricingCard";
import {
  ProductCardType,
  SelectedProductType,
} from "core-library/types/global";
import { useRouter } from "core-library/core";
import { Encryption } from "core-library/utils/Encryption";
import { config } from "core-library/config";
import { useEncryptItem } from "core-library/contexts/auth/hooks";
import { useDataSource } from "core-library/hooks";
import { ProductListResponse } from "core-library/api/types";
import { PriceButtonDetails } from "@/constants/constants";
import PricingModal from "./PricingComponent/PricingModal";
import { ComponentState } from "core-library/components";
import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  url?: string;
}

export const PricingBlock: React.FC<Props> = ({ url }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<ProductCardType[]>(
    []
  );

  const [nurseType, setNurseType] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<ProductListResponse[]>();
  const [, setEncryptedProduct] = useEncryptItem();
  const { dataSource, isLoading, isError } = useDataSource({ url });
  const products: ProductListResponse[] =
    dataSource.result?.data && isProductList(dataSource.result?.data)
      ? dataSource.result.data
      : [];
  const router = useRouter();

  const handleOpenModal = () => {
    if (!filteredItems) return;
    const item: ProductCardType[] = filteredItems.slice(0, 2);
    setSelectedItems(item);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItems([]);
    setOpen(false);
  };

  const filterItems = (keyword: number) => {
    setNurseType(keyword);
    const filtered =
      products && products.filter((item) => item.programTitle === keyword);
    setFilteredItems(filtered);
  };

  const handleSelectProduct = (product: SelectedProductType) => {
    const key = config.value.SECRET_KEY;
    const encyptedData = Encryption(
      JSON.stringify({ ...product }),
      key ?? "no-secret-key"
    );

    setEncryptedProduct(encyptedData);
    router.push({
      pathname: "/account/registration",
    });
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilteredItems(products.filter((item) => item.programTitle === 0));
    }
  }, [products]);

  useEffect(() => {
    if (router.asPath.includes("#pricing")) {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [router.asPath]);

  return (
    <Box
      id="pricing"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6.94rem 0 4.81px 0",
        height: "fit-content",
        backgroundColor: theme.palette.appColors.incidental["025"],
      }}
    >
      <Box
        sx={{
          maxWidth: theme.sizes.contentWidth,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "3rem",
              marginBottom: "2.2rem",
              fontWeight: 700,
              fontFamily: "PT Sans, sans-serif",
              color: "#232323",
            }}
          >
            Pricing
          </Typography>

          <Typography
            sx={{
              fontSize: "1.5rem",
              lineHeight: "2.25rem",
              color: "#282828",
              fontWeight: 700,
              fontFamily: "PT Sans, sans-serif",
            }}
          >
            For RNs and PNs, choose between our 8-day (Fast Track) or 23-day
            (Standard) program.
          </Typography>
          <Typography
            className="font-ptSansNarrow -mt-1"
            sx={{
              fontFamily: "PT Sans Narrow, sans-serif",
              marginTop: "1.56rem",
              fontWeight: 400,
              fontSize: "1.5rem",
              lineHeight: "2.25rem",
              color: "#202020",
            }}
          >
            Both programs allow up to 6 months access to the system.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "2.62rem 0",
          }}
        >
          {PriceButtonDetails.length > 0 &&
            [...PriceButtonDetails].reverse().map((nurseItem, index) => {
              const isSelected = nurseType === nurseItem.value;
              const buttonClasses = `max-h-20 w-72 ${
                isSelected
                  ? `${nurseType === 1 ? "bg-[#08474b]" : "bg-[#0c225c]"}`
                  : !nurseType && index === 1
                    ? "bg-[#0c225c]"
                    : "bg-[#9a9a9a]"
              } whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-2xl flex items-center leading-4 px-5 text-left gap-2 hover:scale-105`;
              return (
                <button
                  key={index}
                  className={buttonClasses}
                  onClick={() => {
                    filterItems(nurseItem.value);
                  }}
                  aria-label={`Filter by ${nurseItem.label}`}
                >
                  <span className="font-bold text-5xl font-Poppins">
                    {nurseItem.acronym} <span className="font-normal">|</span>
                  </span>
                  <span className="font-ptSansNarrow text-2xl">
                    {nurseItem.label}
                  </span>
                </button>
              );
            })}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1.06rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ComponentState
            data={dataSource}
            isError={isError}
            isLoading={isLoading}
          >
            {filteredItems &&
              filteredItems.length > 0 &&
              filteredItems.slice(0, 2).map((item, index) => (
                <Box
                  className={`cursor-pointer border-2 border-transparent transition-all duration-300 ${nurseType == 1 ? "hover:border-[#08474b] hover:border-2 hover:scale-105 rounded-lg " : "hover:border-[#0c225c] hover:border-2 hover:scale-105 rounded-lg "}`}
                  key={index}
                >
                  <PricingCard
                    cardData={item as unknown as ProductCardType}
                    handleOpen={handleOpenModal}
                  />
                </Box>
              ))}
          </ComponentState>
        </Box>
        {filteredItems && filteredItems.length > 0 && (
          <Box>
            <PricingModal
              handleClose={handleCloseModal}
              open={open}
              handleSelectProduct={handleSelectProduct}
              cardData={selectedItems}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

function isProductList(
  data: Record<string, any>
): data is ProductListResponse[] {
  return (
    Array.isArray(data) &&
    data.every((item) => item && typeof item.id === "string")
  );
}
