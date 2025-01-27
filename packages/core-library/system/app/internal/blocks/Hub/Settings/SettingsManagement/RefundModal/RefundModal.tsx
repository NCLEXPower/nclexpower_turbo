import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { textSx } from "../SettingsStyles";
import { Button, EvaIcon } from "../../../../../../../../components";
import { modalBoxSx } from "./RefundModalStyles";
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
            data-testid="close-btn"
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
          {render}
        </Box>
      </Box>
    </Modal>
  );
};
