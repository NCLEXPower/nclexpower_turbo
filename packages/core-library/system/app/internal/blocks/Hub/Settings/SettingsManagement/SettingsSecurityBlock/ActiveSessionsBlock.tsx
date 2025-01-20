import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, textSx, titleSx } from "../SettingsStyles";
import React from "react";
import { EvaIcon } from "../../../../../../../../components";
import { ActiveSession } from "../types";

interface ActiveSessionsBlockProps {
  activeSession: ActiveSession[];
}

export const ActiveSessionsBlock: React.FC<ActiveSessionsBlockProps> = ({
  activeSession,
}) => {
  return (
    <Box
      sx={{
        ...blockSx,
        flexGrow: 1,
        "@media (min-width: 1200px)": {
          flexGrow: 0,
          width: "410px",
        },
      }}
    >
      <Box sx={boxHeaderSx}>
        <Typography
          component="h4"
          sx={{
            ...titleSx,
            fontSize: "20px",
          }}
        >
          Active Sessions
        </Typography>
      </Box>

      <Box sx={{ padding: "20px", paddingBottom: 0 }}>
        {activeSession.length ? (
          activeSession.map((item, i) => {
            const { device, location, lastActive, icon } = item;
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "20px",
                  minHeight: "90px",
                  paddingY: "10px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #0F2A7180",
                  ...(i === activeSession.length - 1 && {
                    borderBottom: "none",
                  }),
                }}
              >
                <Box>{icon}</Box>
                <Box sx={{ marginRight: "auto" }}>
                  <Typography
                    sx={{
                      ...textSx,
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    {device}
                  </Typography>
                  <Typography
                    sx={{
                      ...textSx,
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#3333334D",
                    }}
                  >
                    {location} • {lastActive}
                  </Typography>
                </Box>
                <EvaIcon name="more-vertical" style={{ alignSelf: "center" }} />
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{
              ...textSx,
            }}
          >
            No Active Sessions
          </Typography>
        )}
      </Box>
    </Box>
  );
};
