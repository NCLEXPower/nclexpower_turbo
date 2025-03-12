/**
 * Property of the NCLEX Power.
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

  useEffect(() => {
    if (router.asPath.includes("#pricing")) {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [router.asPath]);

  return (
    <div
      id="pricing"
      className="py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)] bg-[#fafafa] flex items-center justify-center"
    >
      <div className="container">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center px-[clamp(1px,2.083331vw,80px)] text-center pb-[clamp(.5rem,6.1111vw,1.5rem)] md:pb-0">
            <h2 className="text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] font-Poppins font-bold ">Pricing</h2>
            <p className="font-Sans font-bold text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
              For RNs and PNs, choose between our 8-day (Fast Track) or 23-day
              (Standard) program.
            </p>
            <p className="font-Sans font-normal text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
              Both programs allow up to 6 months access to the system.
            </p>
          </div>

          <div className="py-[clamp(1px,2.083331vw,80px)]">
            <div className="flex lg:gap-5 gap-2 flex-wrap justify-center  ">
              {PriceButtonDetails.length > 0 &&
                PriceButtonDetails.map((nurseItem, index) => {
                  const isSelected = nurseType === nurseItem.value;
                  const isNotSelected =
                    nurseType && nurseType !== nurseItem.value;


                  const buttonClasses = `max-h-20 ${isSelected
                    ? `w-full md:w-[fit-content] ${nurseType ? "bg-[#08474b]" : "bg-[#0c225c]"}`
                    : `w-full md:w-[fit-content] ${index === 0 ? "bg-[#0c225c] " : "bg-slate-700"} ${isNotSelected ? "saturate-0" : ""
                    } hover:scale-95`
                    } whitespace-nowrap flex justify-center transition-all duration-300 text-white px-[clamp(1px,1.5625vw,60px)] py-[clamp(1px,4.65116vw,40px)] md:py-[clamp(1px,1.041665vw,40px)] rounded-lg  flex items-center text-left md:gap-2`;
                  return (
                    <button
                      key={index}
                      className={buttonClasses}
                      onClick={() => {
                        filterItems(nurseItem.value);
                        setNurseType(nurseItem.value);
                      }}
                      aria-label={`Filter by ${nurseItem.label}`}
                    >
                      <h2 className="font-Poppins font-bold text-[clamp(1px,5.86145vw,70px)] md:text-[clamp(1px,2.5vw,96px)] text-white">
                        {nurseItem.acronym} <span className="font-normal">| </span>
                      </h2>
                      <p className="font-Sans font-regular text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] m-0">{nurseItem.label}</p>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="w-full flex flex-col mt-[clamp(1px,2.083331vw,80px)] items-start justify-center">
            <div className="flex w-full justify-center flex-wrap">
              {filteredItems && filteredItems.length > 0 && (
                filteredItems.slice(0, 2).map((item, index) => (
                  <div
                    className={`cursor-pointer border-2 border-transparent mx-[clamp(1px,0.520834vw,20px)] mb-3 md:mb-0 transition-all duration-300 ${nurseType == 1 ? "hover:border-[#08474b] hover:border-2 hover:scale-105 rounded-lg " : "hover:border-[#0c225c] hover:border-2 hover:scale-105 rounded-lg  "}`}
                    key={index}
                  >
                    <ComponentState
                      data={dataSource}
                      isError={isError}
                      // isSuccess={isSuccess}
                      isLoading={isLoading}
                    >
                      <PricingCard
                        cardData={item as unknown as ProductCardType}
                        handleSelectProduct={handleSelectProduct}
                      />
                    </ComponentState>
                  </div>
                ))
              )}
            </div>
          </div>

          {
            filteredItems && filteredItems.length > 0 && (
              <div>
                <PricingModal
                  handleClickOpen={() => handleClickOpen(filteredItems.slice(0, 2))}
                  handleClose={handleClose}
                  open={open}
                  handleSelectProduct={handleSelectProduct}
                  cardData={selectedItems}
                />
              </div>
            )
          }
        </div >
      </div >
    </div >
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
