import React from "react";
import { Typography, Container, Stack } from "@mui/material";
import {
  DateField,
  GenericSelectField,
  MultipleSelectField,
  CustomTooltip,
} from "../../../../../../components";
import { CountryMockData, TimezoneMockData } from "./ComingSoonMock";
import { SwitchButton } from "../../../../../../components/Button/SwitchButton";
import { Control } from "react-hook-form";
import { ContentDateType } from "./validation";
import LiveCountdown from "./LiveCountDown";

type ComingSoonProps = {
  control: Control<ContentDateType>;
  isSwitchOn: boolean;
  isActive?: boolean;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mappedCountries: Array<{
    countryKey: string;
    countryName: string;
    daysRemaining: number;
    timezones: {
      selectedTimezone: string;
      daysRemaining: number;
      hoursRemaining: number;
    }[];
  }>;
};

const ComingSoonManagement = ({
  control,
  isSwitchOn,
  onSwitchChange,
  isActive,
  mappedCountries,
}: ComingSoonProps) => {
  return (
    <Stack direction="row">
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
            >
              Go Live Date:
            </Typography>
            <div className="flex flex-row items-center">
              <DateField
                name="goLiveDate"
                control={control}
                placeholder="DD - MM - YYYY"
                disabled={!isSwitchOn || isActive}
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
                    onChange={onSwitchChange}
                    disabled={isActive}
                    sx={{ flexShrink: 0 }}
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
              disabled={isActive}
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
              name="countryKey"
              options={CountryMockData}
              disabled={isActive}
              multiple
            />
          </Container>
          <LiveCountdown mappedCountries={mappedCountries} />
        </Container>
      </Container>
    </Stack>
  );
};

export default ComingSoonManagement;
