import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { PricingModalProps } from "core-library/types/global";
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
  return (
    <div className="pt-5 pt-md-4">
      <p
        className="!m-0 text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] pt-sans-regular cursor-pointer underline text-[#717171]"
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
        <div className="container ">
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
