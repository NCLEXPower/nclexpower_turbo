import { Button, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  onBackToStartClick: () => void;
}

export const ChatBotActions: React.FC<Props> = ({ onBackToStartClick }) => {
  return (
    <Stack
      data-testid="chatbot-actions"
      width="100%"
      height={43}
      direction="row"
      bgcolor="primary.main"
      color="primary.contrastText"
    >
      <Button
        data-testid="back-to-start-btn"
        fullWidth
        variant="text"
        color="inherit"
        href="#chatbot-content"
        onClick={onBackToStartClick}
      >
        <Typography variant="caption" fontWeight="bold" noWrap>
          Back to start
        </Typography>
      </Button>
    </Stack>
  );
};
