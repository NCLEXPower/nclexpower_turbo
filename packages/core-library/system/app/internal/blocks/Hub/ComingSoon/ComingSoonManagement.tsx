import React, { useState } from "react";
import { Typography, Container, Stack } from "@mui/material";
import {
  DateField,
  GenericSelectField,
  MultipleSelectField,
} from "../../../../../../components";
import { CountryMockData, TimezoneMockData } from "./ComingSoonMock";
import { SwitchButton } from "../../../../../../components/Button/SwitchButton";
import { ContentDateType } from "./validation";
import { Control } from "react-hook-form";

type ComingSoonProps = {
  control: Control<ContentDateType>;
};

const ComingSoonManagement = ({ control }: ComingSoonProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <Stack direction={"row"}>
      <Container sx={{ width: 600 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#3B0086" }}
        >
          Coming Soon Management
        </Typography>
        <Container
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#3B0086",
            backgroundColor: "rgba(59, 0, 134, 0.05)",
            padding: "2rem",
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <Container>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#3B0086",
                marginTop: "1rem",
                opacity: isSwitchOn ? 1 : 0.5,
              }}
              children={"Go Live Date:"}
            />
            <div className="flex flex-row items-center">
              <DateField
                name="schedule"
                control={control}
                placeholder="DD - MM - YYYY"
                disabled={!isSwitchOn}
              />
              <div>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px",
                    color: "#3B0086",
                    paddingLeft: "10px",
                  }}
                >
                  Enable Clock
                </Typography>
                <div className="flex flex-row items-center justify-between pr-10">
                  <SwitchButton
                    checked={isSwitchOn}
                    onChange={() => setIsSwitchOn((prev) => !prev)}
                    sx={{
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      marginLeft: 1,
                      fontWeight: "bold",
                      width: "30px",
                      textAlign: "right",
                    }}
                  >
                    {isSwitchOn ? "ON" : "OFF"}
                  </Typography>
                </div>
              </div>
            </div>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#3B0086",
                marginTop: "1rem",
              }}
            >
              Select Timezone:
            </Typography>
            <GenericSelectField
              options={TimezoneMockData}
              name="timeZone"
              control={control}
              placeholder="Select Timezone:"
              style={{
                backgroundColor: "#FFF",
                borderRadius: "8px",
                borderColor: "#3B0086",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              variant="outlined"
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#3B0086",
                marginTop: "1rem",
              }}
            >
              Included Countries:
            </Typography>
            <MultipleSelectField
              sx={{
                borderRadius: "8px",
                width: "100%",
                backgroundColor: "#FFF",
                border: "1px solid #3B0086",
                marginTop: 2,
              }}
              control={control}
              name="selectedCountriesTimezones"
              options={CountryMockData}
              multiple
            />
          </Container>
          <div
            className="flex flex-end"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#3B0086",
                marginLeft: "1rem",
              }}
            >
              Live Countdown of Selected Countries :
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "10px",
                color: "#3B0086",
                marginRight: "2rem",
              }}
            >
              Days : Hours : Minutes : Seconds
            </Typography>
          </div>
        </Container>
      </Container>
    </Stack>
  );
};

export default ComingSoonManagement;
