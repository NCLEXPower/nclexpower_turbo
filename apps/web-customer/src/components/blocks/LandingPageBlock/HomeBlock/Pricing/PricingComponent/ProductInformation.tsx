import React, { useEffect, useState } from "react";
import ProductSelection from "./ProductSelection";
import PricingDetail from "./PricingDetail";
import { ProductInformationProps } from "core-library/types/global";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";

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
      <ProductDetailsSkeleton
        inclusionsCount={filteredCardData?.inclusions?.features?.length || 5}
      />
    );
  }

  return (
    <div className="w-full min-h-full flex flex-col  p-6  xl:flex-row  xl:gap-24 xl:p-12  ">
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
