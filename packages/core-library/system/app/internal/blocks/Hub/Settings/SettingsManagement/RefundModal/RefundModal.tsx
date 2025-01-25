import { Box, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { textSx } from "../SettingsStyles";
import { Button, EvaIcon } from "../../../../../../../../components";
import { circleSx, modalBoxSx } from "./RefundModalStyles";
import { RefundPolicyBlock } from "./RefundPolicyBlock";
import { RefundPaymentBlock } from "./RefundPaymentBlock";

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
}

export const RefundModal: React.FC<RefundModalProps> = ({ open, onClose }) => {
  const [isPolicy, setIsPolicy] = useState<boolean>(true);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const togglePage = () => {
    setIsPolicy((prev) => !prev);
    scrollableRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxSx}>
        <Box
          sx={{
            backgroundColor: "#0F2A71",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: "30px",
            color: "#FFF",
          }}
        >
          <Typography sx={{ ...textSx, fontSize: "32px", fontWeight: 700 }}>
            Refund Request
          </Typography>
          <Button
            onClick={onClose}
            variant="text"
            sx={{
              minWidth: "unset",
              border: "none",
              padding: 0,
              "&:hover": {
                bgcolor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <EvaIcon name="close" width={30} height={30} fill="#FFF" />
          </Button>
        </Box>
        <Box
          ref={scrollableRef}
          sx={{
            paddingX: {
              xs: "10px",
              sm: "30px",
              md: "50px",
            },
            paddingTop: "50px",
            paddingBottom: 0,
            overflowY: "auto",
            height: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingX: "20px",
              paddingBottom: "40px",
            }}
          >
            <Box sx={circleSx}>1</Box>
            <Typography sx={{ ...textSx, color: "#333333", fontWeight: 700 }}>
              Refund Policy
            </Typography>
            <Box
              sx={{
                height: "2px",
                width: "100%",
                maxWidth: "100px",
                backgroundColor: isPolicy ? "#3333334D" : "#333333",
              }}
            />
            <Box
              sx={{
                ...circleSx,
                ...(isPolicy && {
                  backgroundColor: "#0F2A711A",
                  color: "#3333334D",
                }),
              }}
            >
              2
            </Box>
            <Typography
              sx={{
                ...textSx,
                color: isPolicy ? "#3333334D" : "#333333",
                fontWeight: 700,
              }}
            >
              Refund Payment
            </Typography>
          </Box>
          {isPolicy ? (
            <RefundPolicyBlock closeModal={onClose} nextPage={togglePage} />
          ) : (
            <RefundPaymentBlock backPage={togglePage} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
