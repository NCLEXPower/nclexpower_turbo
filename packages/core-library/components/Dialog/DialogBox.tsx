/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface Props extends DialogProps {
  handleClose: () => void;
  loading?: boolean;
  header?: string;
  hideCloseButton?: boolean;
  maxWidth?: DialogProps["maxWidth"];
  borderRadius?: string;
  overflowContent?: string;
  ContentHeight?: string;
}

export const DialogBox: React.FC<React.PropsWithChildren<Props>> = ({
  handleClose,
  loading,
  header,
  children,
  open,
  hideCloseButton,
  maxWidth = "md",
  borderRadius = "0px",
  overflowContent = "auto",
  ContentHeight = "250px",
  ...props
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      sx={{
        overflowY: overflowContent,
        zIndex: 1301,
        "& .MuiDialog-paper": {
          height: ContentHeight,
          maxHeight: "550px",
          borderRadius: borderRadius,
          overflowY: overflowContent,
        },
      }}
      {...props}
    >
      <DialogTitle
        component={header ? "h4" : "div"}
        sx={{
          px: { xs: 6, sm: 12 },
          pt: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 8 },
          textAlign: "center",
        }}
      >
        {!hideCloseButton && (
          <Box
            data-testid="close_button_container"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <IconButton
              color="primary"
              size="small"
              sx={{ height: 32, width: 32, fontSize: 32 }}
              disabled={loading}
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          </Box>
        )}
        <Typography
          align="center"
          variant="h4"
          component="span"
          fontWeight="bold"
        >
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 6, sm: 12 },
          pb: { xs: 6, sm: 12 },
          overflowY: overflowContent,
          height: "500px",
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
