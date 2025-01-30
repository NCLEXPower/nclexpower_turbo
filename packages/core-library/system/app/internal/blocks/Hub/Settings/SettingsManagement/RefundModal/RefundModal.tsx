import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { DialogBox } from "../../../../../../../../components";
import { dialogBoxSx } from "./RefundModalStyles";
import { useRefundModalSteps } from "./steps/useSteps";

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
}

export const RefundModal: React.FC<RefundModalProps> = ({ open, onClose }) => {
  const { render } = useRefundModalSteps(onClose);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollableRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [render]);

  return (
    <DialogBox
      open={open}
      handleClose={onClose}
      header="Refund Request"
      sx={dialogBoxSx}
    >
      <Box
        ref={scrollableRef}
        sx={{
          paddingX: {
            xs: "10px",
            sm: "30px",
            md: "50px",
          },
          paddingTop: "50px",
          overflowY: "auto",
          height: "100%",
        }}
      >
        {render}
      </Box>
    </DialogBox>
  );
};
