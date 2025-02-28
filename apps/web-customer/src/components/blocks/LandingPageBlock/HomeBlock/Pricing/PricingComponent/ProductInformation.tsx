import React, { useEffect, useState } from "react";
import ProductSelection from "./ProductSelection";
import PricingDetail from "./PricingDetail";
import { ProductInformationProps } from "core-library/types/global";
import { ProductDetailSkeletonLoader } from "./ProductDetailSkeletonLoader";

const ProductInformation = ({
  cardData,
  onClose,
  handleSelectProduct,
}: ProductInformationProps) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCardData = Array.isArray(cardData)
    ? cardData.find((card) => card.programType === selectedProduct)
    : cardData;

  if (loading) {
    return (
      <ProductDetailSkeletonLoader
        inclusionsCount={filteredCardData?.inclusions?.features?.length || 5}
      />
    );
  }

  return (
    <div className=" flex flex-col py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)] md:flex-row  justify-between ">
      <PricingDetail filteredCardData={filteredCardData} onClose={onClose} />
      <ProductSelection
        cardData={Array.isArray(cardData) ? cardData : [cardData]}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleSelectProduct={handleSelectProduct}
      />
    </div>
  );
};

export default ProductInformation;
