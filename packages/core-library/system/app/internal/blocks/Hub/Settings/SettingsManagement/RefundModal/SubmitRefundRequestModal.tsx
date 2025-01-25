import { Box, Modal, Typography } from "@mui/material";
import { Button, EvaIcon } from "../../../../../../../../components";
import { btnSx, modalBoxSx } from "./RefundModalStyles";
import { textSx } from "../SettingsStyles";

interface SubmitRefundRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export const SubmitRefundRequestModal: React.FC<
  SubmitRefundRequestModalProps
> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalBoxSx,
          maxWidth: "900px",
          height: "unset",
          minHeight: "450px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          sx={{
            position: "absolute",
            top: "10px",
            right: "15px",
            minWidth: "unset",
            "&:hover": {
              bgcolor: "transparent",
              boxShadow: "none",
            },
          }}
          onClick={onClose}
        >
          <EvaIcon name="close-outline" width={40} height={40} fill="#333333" />
        </Button>
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
                fontSize: "32px",
                marginBottom: "30px",
              }}
            >
              Are you sure to cancel your subscription?
            </Typography>
            <Typography sx={{ ...textSx, color: "#33333380" }}>
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
          <Button sx={{ ...btnSx, border: "none", bgcolor: "#FF0000" }}>
            Continue
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
