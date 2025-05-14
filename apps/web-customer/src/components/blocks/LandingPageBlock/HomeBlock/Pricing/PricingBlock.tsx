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

interface Props {
  url?: string;
}

export const PricingBlock: React.FC<Props> = ({ url }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<ProductCardType>(
    {} as ProductCardType
  );

  const handleClickOpen = (items: any) => {
    setSelectedItems(items);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItems({} as ProductCardType);
  };

  const [nurseType, setNurseType] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<ProductListResponse[]>();
  const [, setEncryptedProduct] = useEncryptItem();
  const { dataSource, isLoading, isError } = useDataSource({ url });
  const products: ProductListResponse[] =
    dataSource.result?.data && isProductList(dataSource.result?.data)
      ? dataSource.result.data
      : [];
  const router = useRouter();

  const handleSelectProduct = async (product: SelectedProductType) => {
    const key = config.value.SECRET_KEY;
    const encyptedData = Encryption(
      JSON.stringify({ ...product }),
      key ?? "no-secret-key"
    );
    setEncryptedProduct(encyptedData);
    await router.push({
      pathname: "/account/registration",
    });
  };

  const filterItems = (keyword: number) => {
    if (nurseType === keyword) return;
    const filtered = products?.filter((item) => item.programTitle === keyword);
    setNurseType(keyword);
    setFilteredItems(filtered);
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
    <section
      id="pricing"
      className="pt-20 pb-40 h-fit bg-[#fafafa] flex items-center justify-center"
    >
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center px-10 text-center">
          <h2 className="lg:text-5xl text-4xl font-bold font-ptSans mb-8">
            Pricing
          </h2>
          <p className="font-bold font-ptSans text-2xl text-[#282828] leading-9 -mt-1">
            For RNs and PNs, choose between our 8-day (Fast Track) or 23-day
            (Standard) program.
          </p>
          <p className="font-ptSansNarrow -mt-1">
            Both programs allow up to 6 months access to the system.
          </p>
        </div>

        <div className="pt-10">
          <div className="flex lg:gap-5 gap-2 flex-wrap justify-center px-20">
            {PriceButtonDetails.length > 0 &&
              PriceButtonDetails.map((nurseItem, index) => {
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
                    <p className="font-bold text-5xl font-Poppins">
                      {nurseItem.acronym} <span className="font-normal">|</span>
                    </p>
                    <p className="font-ptSansNarrow text-2xl">
                      {nurseItem.label}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
        <div className="w-full px-10 flex flex-col gap-5 mt-8 items-start justify-center">
          <div className="flex gap-5 w-full justify-center self-center flex-wrap">
            <ComponentState
              data={dataSource}
              isError={isError}
              isLoading={isLoading}
            >
              {filteredItems &&
                filteredItems.length > 0 &&
                filteredItems.slice(0, 2).map((item, index) => (
                  <div
                    className={`cursor-pointer border-2 border-transparent transition-all duration-300 ${nurseType == 1 ? "hover:border-[#08474b] hover:border-2 hover:scale-105 rounded-lg " : "hover:border-[#0c225c] hover:border-2 hover:scale-105 rounded-lg "}`}
                    key={index}
                  >
                    <PricingCard
                      cardData={item as unknown as ProductCardType}
                      handleSelectProduct={handleSelectProduct}
                    />
                  </div>
                ))}
            </ComponentState>
          </div>
        </div>

        {filteredItems && filteredItems.length > 0 && (
          <div>
            <PricingModal
              handleClickOpen={() => handleClickOpen(filteredItems.slice(0, 2))}
              handleClose={handleClose}
              open={open}
              handleSelectProduct={handleSelectProduct}
              cardData={selectedItems}
            />
          </div>
        )}
      </div>
    </section>
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
