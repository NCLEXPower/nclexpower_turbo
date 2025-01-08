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
import { PriceButtonDetails, PricingDetails } from "@/constants/constants";
import { DetailedPopUp } from "./PricingComponent/DetailedPopUp";
import { EvaIcon } from "core-library/components";
import PricingContent from "./PricingComponent/PricingContent";
import { SelectPriceDetails } from "./PricingComponent/SelectPriceDetails";

interface Props {
  url?: string;
}

interface ContentProp {
  details: {
    price: number;
    currency: string;
    productType: string;
    duration: string;
    inclusions: Array<{
      label: string;
    }>;
  };
}

function isProductList(
  data: Record<string, any>
): data is ProductListResponse[] {
  return (
    Array.isArray(data) &&
    data.every((item) => item && typeof item.id === "string")
  );
}

export const PricingBlock: React.FC<Props> = ({ url }) => {
  const [nurseType, setNurseType] = useState<number>(1);
  const [selectView, setSelectView] = useState<string | null>();
  const [filteredItems, setFilteredItems] = useState<ProductListResponse[]>();
  const [, setEncryptedProduct] = useEncryptItem();
  const { dataSource } = useDataSource({ url });
  const products: ProductListResponse[] =
    dataSource.result?.data && isProductList(dataSource.result?.data)
      ? dataSource.result.data
      : [];
  const router = useRouter();
  const handleSelectProduct = (product: SelectedProductType) => {
    const key = config.value.SECRET_KEY;
    const encyptedData = Encryption(
      JSON.stringify({ ...product }),
      key ?? "no-secret-key"
    );
    setEncryptedProduct(encyptedData);
    router.push({
      pathname: "/order-summary",
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

  return (
    <>
      {selectView != null && (
        <SelectPriceDetails onClick={() => setSelectView(null)} />
      )}
      <div
        id="pricing"
        className="pt-20 pb-40 h-fit bg-[#fafafa] flex items-center justify-center"
      >
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center px-10 text-center">
            <p className="lg:text-4xl text-3xl font-bold">Pricing</p>
            <p className="font-bold -mt-1">
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
                PriceButtonDetails.map((nurseItem, index) => (
                  <button
                    key={index}
                    className={`max-h-20 ${nurseType === nurseItem.value ? `w-80 ${nurseType ? "bg-[#08474b]" : "bg-[#0c225c]"}` : "w-72 saturate-0 hover:scale-95 bg-slate-700"} whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-2xl flex items-center leading-4 px-5 text-left gap-2`}
                    onClick={() => filterItems(nurseItem.value)}
                  >
                    <p className="font-bold text-3xl">
                      {nurseItem.acronym} <span className="font-normal">|</span>
                    </p>
                    <p>{nurseItem.label}</p>
                  </button>
                ))}
            </div>
          </div>
          <div className="w-full px-10 flex flex-col gap-5 mt-8 items-start justify-center">
            <div className="flex gap-5 w-full justify-center self-center flex-wrap">
              {filteredItems && filteredItems.length > 0 ? (
                filteredItems.slice(0, 2).map((item, index) => (
                  <div
                    className={`cursor-pointer border-2 border-transparent transition-all duration-300 ${nurseType == 1 ? "hover:border-[#08474b] hover:border-2 hover:scale-105 rounded-lg hover:-mt-2" : "hover:border-[#0c225c] hover:border-2 rounded-lg hover:-mt-2"}`}
                    key={index}
                  >
                    <PricingCard
                      cardData={item as unknown as ProductCardType}
                      handleSelectProduct={handleSelectProduct}
                    />
                    <div className="flex justify-center">
                      <p
                        onClick={() => setSelectView(item.productName)}
                        className="text-center mt-1 font-ptSansNarrow text-darkGray underline"
                      >
                        View more details
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={`bg-gradient-to-tr ${nurseType === 0 ? "from-[#334f9d] to-[#0c225c] text-white" : "from-[#31898f] to-[#08474b] text-white"} rounded-md shadow-md px-5 py-8 text-lg w-full text-center  font-semibold max-w-[750px]`}
                >
                  <p>Programs unavailable, please reload the page</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
