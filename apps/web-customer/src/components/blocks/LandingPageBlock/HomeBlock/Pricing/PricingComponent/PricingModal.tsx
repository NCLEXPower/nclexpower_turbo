import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { PricingModalProps, ProductCardType } from "core-library/types/global";
import ProductInformation from "./ProductInformation";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PricingModal({
  handleClickOpen,
  handleClose,
  handleSelectProduct,
  open,
  cardData,
}: PricingModalProps) {
  console.log("cardData Pring Modal", cardData);

  return (
    <div className="py-6">
      <p
        className="text-base font-normal cursor-pointer underline text-[#717171]"
        onClick={() => handleClickOpen(cardData)}
      >
        View more details
      </p>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="min-h-screen">
          <ProductInformation
            cardData={cardData}
            onClose={handleClose}
            handleSelectProduct={handleSelectProduct}
          />
        </div>
      </Dialog>
    </div>
  );
}
