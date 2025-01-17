import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { CoreZigmaLogo } from "../assets";

const messages = [
  "Please wait, we are preparing everything just for you!",
  "Hang tight, we're getting things ready for you.",
  "Almost there! We're getting things set up.",
  "Thanks for your patience, we're almost ready.",
  "Preparing your experience, please hold on.",
];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(getRandomMessage());
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    };

    const timer = setInterval(updateProgress, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        src={CoreZigmaLogo}
        alt="Logo"
      />
      <Typography sx={{ 
        fontSize: "1rem",
        fontWeight: "800",
        mt: 2, 
        mb: 3,
        "@media (max-width: 400px)": {
              fontSize: "12px",
            }}}>
        {message || "Loading..."}
      </Typography>
      <CircularProgress variant="determinate" value={progress} />
    </Box>
  );
};
