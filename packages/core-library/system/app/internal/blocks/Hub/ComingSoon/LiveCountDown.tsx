import React from "react";
import { Typography, Box } from "@mui/material";
import { CustomTooltip } from "../../../../../../components";
import { MappedCountry } from "./types";

type LiveCountdownProps = {
  mappedCountries: MappedCountry[];
};

const LiveCountdown: React.FC<LiveCountdownProps> = ({ mappedCountries }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: "1rem",
          ml: "1rem",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontSize: "1rem", color: "#3B0086" }}
        >
          Live Countdown of Selected Countries:
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          ml: 2,
          maxHeight: 128,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {mappedCountries.map((country) => (
          <CustomTooltip
            key={country.countryName}
            placement="bottom"
            arrow
            title={
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#3B0086",
                    }}
                  >
                    Timezones
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#3B0086",
                    }}
                  >
                    Days Remaining
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  {country.timezones.map((tz) => (
                    <Box
                      key={tz.selectedTimezone}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ fontSize: "14px", color: "#3B0086" }}>
                        {tz.selectedTimezone}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B0086" }}>
                        {tz.daysRemaining} Days
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#fff",
                  color: "#3B0086",
                  fontSize: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  minWidth: "350px",
                },
              },
              arrow: {
                sx: { display: "none" },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFF",
                px: 3,
                py: 2,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  color: "#3B0086",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                {country.countryKey}
              </Typography>
              <Typography
                sx={{
                  color: "#3B0086",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                [ {country.daysRemaining} Days ]
              </Typography>
            </Box>
          </CustomTooltip>
        ))}
      </Box>
    </>
  );
};

export default LiveCountdown;
