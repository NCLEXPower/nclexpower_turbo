import React from "react";
import { Box, keyframes, styled } from "@mui/material";

const jumpingDots = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-6px); }
  50% { transform: translateY(0); }
  100% { transform: translateY(0); }
`;

const RootBox = styled(Box)(({ theme }) => ({
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "4px",
}));

const Dot = styled("div")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[500],
  marginLeft: "4px",
  animation: `${jumpingDots} 1.8s infinite both`,
}));

export const ChatBotMessageLoader: React.FC = () => {
  return (
    <RootBox data-testid="chatbot-message-loader" aria-hidden="true">
      <Dot sx={{ animationDelay: "0.2s" }} />
      <Dot sx={{ animationDelay: "0.4s" }} />
      <Dot sx={{ animationDelay: "0.6s" }} />
    </RootBox>
  );
};
