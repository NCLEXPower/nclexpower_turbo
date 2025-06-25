/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingComponent/PricingCard";
import { ProductCardType } from "core-library/types/global";
import { useDataSource } from "core-library/hooks";
import { ProductListResponse } from "core-library/api/types";
import { PriceButtonDetails } from "@/constants/constants";
import PricingModal from "./PricingComponent/PricingModal";
import { ComponentState } from "core-library/components";
import { Box, Typography, useTheme } from "@mui/material";
import { NurseTypeButton } from "./PricingComponent/NurseTypeButton";

interface Props {
  url?: string;
}

export const PricingBlock: React.FC<Props> = ({ url }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [nurseType, setNurseType] = useState<number>(0);
  const { dataSource, isLoading, isError } = useDataSource({ url });
  const [filteredItems, setFilteredItems] = useState<ProductListResponse[]>();
  const [selectedItems, setSelectedItems] = React.useState<ProductCardType[]>(
    []
  );

  const products: ProductListResponse[] =
    dataSource.result?.data && isProductList(dataSource.result?.data)
      ? dataSource.result.data
      : [];

  const filteredProducts = products.filter(
    (product) => product.programTitle === nurseType
  );

  const filterItems = (keyword: number) => {
    setNurseType(keyword);
    const filtered =
      products && products.filter((item) => item.programTitle === keyword);
    setFilteredItems(filtered);
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilteredItems(products.filter((item) => item.programTitle === 0));
    }
  }, [products]);

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
          {PriceButtonDetails.map((nurseItem) => (
            <NurseTypeButton
              key={nurseItem.value}
              item={nurseItem}
              isSelected={nurseType === nurseItem.value}
              onClick={() => filterItems(nurseItem.value)}
            />
          ))}
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
            {filteredProducts.slice(0, 2).map((product) => (
              <PricingCard
                key={product.id}
                cardData={product}
                handleOpen={handleSelectProduct}
              />
            ))}
          </ComponentState>
        </Box>
        <PricingModal
          handleClose={() => setOpen(false)}
          open={open}
          cardData={selectedItems}
          handleSelectProduct={handleSelectProduct}
        />
      </Box>
    </Box>
  );

  function handleSelectProduct() {
    if (!filteredItems) return;
    const item: ProductCardType[] = filteredItems.slice(0, 2);
    setSelectedItems(item);
    setOpen(true);
  }
};

function isProductList(
  data: Record<string, any>
): data is ProductListResponse[] {
  return (
    Array.isArray(data) &&
    data.every((item) => item && typeof item.id === "string")
  );
}
