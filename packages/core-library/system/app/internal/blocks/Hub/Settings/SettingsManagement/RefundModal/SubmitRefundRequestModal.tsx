import { Box, Typography } from "@mui/material";
import { Button, DialogBox, EvaIcon } from "../../../../../../../../components";
import { btnSx, submitDialogBoxSx } from "./RefundModalStyles";
import { textSx } from "../SettingsStyles";

interface SubmitRefundRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export const SubmitRefundRequestModal: React.FC<
  SubmitRefundRequestModalProps
> = ({ open, onClose }) => {
  return (
    <DialogBox open={open} handleClose={onClose} sx={submitDialogBoxSx}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <EvaIcon
          name="alert-circle-outline"
          fill="#FF3333"
          width={100}
          height={100}
        />
        <Box sx={{ maxWidth: "600px" }}>
          <Typography
            sx={{
              ...textSx,
              fontWeight: 700,
              fontSize: "clamp(28px,2vw,32px)",
              marginBottom: "30px",
            }}
          >
            Are you sure to cancel your subscription?
          </Typography>
          <Typography
            sx={{
              ...textSx,
              color: "#33333380",
              fontSize: "clamp(15px,3vw,20px)",
            }}
          >
            If you wish to cancel your subscription, confirm your decision by
            clicking 'Continue' to process your refund payment
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "40px",
        }}
      >
        <Button sx={{ ...btnSx }} onClick={onClose}>
          Cancel
        </Button>
        <Button sx={{ ...btnSx, border: "none", bgcolor: "#FF3333" }}>
          Continue
        </Button>
      </Box>
    </DialogBox>
  );
};
