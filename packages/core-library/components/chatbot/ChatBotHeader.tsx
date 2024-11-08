import { Close } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChatBotLogo } from "./ChatBotLogo";
import React from "react";

interface Props {
  onClose(): void;
}

export const ChatBotHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <Stack
      width="100%"
      height={64}
      p={4}
      pr={2}
      bgcolor="#0c225c"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      color="primary.contrastText"
      data-testid="chatbot-header"
    >
      <Typography
        id="chatbot-title"
        className="visually-hidden"
        variant="h1"
        tabIndex={-1}
      >
        NCLEXPower Virtual Assistant
      </Typography>
      <ChatBotLogo width={90} height={40} />
      <Box>
        <IconButton
          data-testid="close-btn"
          aria-label="virtual-assistant-close"
          size="small"
          color="inherit"
          onClick={onClose}
          LinkComponent="button"
        >
          <Close aria-hidden="true" />
          <Typography className="visually-hidden">Close</Typography>
        </IconButton>
      </Box>
    </Stack>
  );
};
