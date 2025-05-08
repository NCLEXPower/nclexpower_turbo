import { Box } from "@mui/material";

import React from "react";

interface TestsTakenProps {
  programTitle: string;
  programSubtitleOne: string;
  programSubtitleTwo: string;
  programDay: string;
  programSection: string;
}

export const TestsTaken: React.FC<TestsTakenProps> = ({
  programTitle,
  programSubtitleOne,
  programSubtitleTwo,
  programDay,
  programSection,
}) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            fontSize: "clamp(1.2rem, 1.5vw, 1.4rem)",
            fontFamily: "PT Sans Narrow",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 23, 63, 1)",
            color: "white",
            width: "100%",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          {programTitle}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            height: "90%",
            position: "relative",
            borderTop: "5px",
          }}
        >
          <Box sx={{ paddingTop: 4 }}>
            <Box
              sx={{
                fontSize: "clamp(5rem, 5vw, 6rem)",
                fontFamily: "Rajdhani",
                fontWeight: "bold",
                background:
                  "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {programDay}
            </Box>
            <Box
              sx={{
                color: "rgba(154, 154, 154, 1)",
                textAlign: "center",
                fontFamily: "PT Sans Narrow",
                fontWeight: "bold",
              }}
            >
              {programSubtitleOne}
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "2px",
              height: "75%",
              bgcolor: "darkblue",
              right: "48%",
              top: "12%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                bgcolor: "white",
                border: "2px solid darkblue",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box sx={{ paddingTop: 4 }}>
            <Box
              sx={{
                fontSize: "clamp(5rem, 5vw, 6rem)",
                fontFamily: "Rajdhani",
                fontWeight: "bold",
                background:
                  "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {programSection}
            </Box>
            <Box
              sx={{
                color: "rgba(154, 154, 154, 1)",
                textAlign: "center",
                fontFamily: "PT Sans Narrow",
                fontWeight: "bold",
              }}
            >
              {programSubtitleTwo}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: "rgba(0, 23, 63, 1)",
            pb: 2,
            fontFamily: "PT Sans Narrow",
            fontWeight: "bold",
            fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
          }}
        >
          Number of Tests Taken
        </Box>
      </Box>
    </React.Fragment>
  );
};
