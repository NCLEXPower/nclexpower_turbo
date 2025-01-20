import { Box, Typography } from "@mui/material";
import { progressTaken } from "./DashboardMock";
import { useResolution } from "core-library/hooks";
import React from "react";

export const TestsTaken: React.FC = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          pt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            height: "90%",
            position: "relative",
          }}
        >
          {progressTaken.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  fontSize: "clamp(1.2rem, 1.5vw, 1.4rem)",
                  fontFamily: "PT Sans Narrow",
                  fontWeight: "bold",
                  color: "rgba(0, 23, 63, 1)",
                }}
              >
                {item.programTitle}
              </Box>
              <Box>
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
                  {item.programDay}
                </Box>
                <Box
                  sx={{
                    color: "rgba(154, 154, 154, 1)",
                    textAlign: "center",
                    fontFamily: "PT Sans Narrow",
                    fontWeight: "bold",
                  }}
                >
                  {item.programSubTitle}
                </Box>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              position: "absolute",
              width: "2.3px",
              height: "57%",
              bgcolor: "darkblue",
              right: "50%",
              top: "30%",
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
          Numbers of Tests Taken
        </Box>
      </Box>
    </React.Fragment>
  );
};
