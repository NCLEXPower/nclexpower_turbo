import { Box, Typography } from "@mui/material";
import { Button } from "../../../../../../../../../../../components";
import { textSx } from "../../../../SettingsStyles";
import { btnSx } from "../../../RefundModalStyles";
import { refundCardData, refundPaymentData } from "../../../constants";
import { SubmitRefundRequestModal } from "../../../SubmitRefundRequestModal";
import { useModal } from "../../../../../../../../../../../hooks";
import { PaymentGrid } from "./RefundPaymentGrid";

interface RefundPaymentBlockProps {
  previousStep(values: {}): void;
  previous: () => void;
}
export const RefundPaymentBlock: React.FC<RefundPaymentBlockProps> = ({
  previousStep,
  previous,
}) => {
  const openModal = () => open();
  const { open, close, props } = useModal();

  const prevPage = () => {
    previousStep({});
    previous();
  };

  return (
    <Box data-testid="payment-block">
      <SubmitRefundRequestModal open={props.isOpen} onClose={close} />
      <Button
        variant="outlined"
        onClick={prevPage}
        sx={{ ...btnSx, marginY: "40px", minWidth: "150px" }}
      >
        Back
      </Button>
      <Typography
        component="h3"
        sx={{
          ...textSx,
          fontWeight: 700,
          fontSize: "38px",
          paddingLeft: "20px",
        }}
      >
        Refund Payment
      </Typography>

      <PaymentGrid
        paymentValues={refundPaymentData}
        refundCardData={refundCardData}
      />

      <Button
        sx={{
          ...btnSx,
          bgcolor: "#FF0000",
          border: "none",
          minWidth: "230px",
          marginLeft: "auto",
          marginRight: {
            xs: "auto",
            sm: "10px",
          },
        }}
        onClick={openModal}
      >
        Submit Request
      </Button>
    </Box>
  );
};
