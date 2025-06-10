import React from "react";
import { Typography, Container, Stack, CircularProgress } from "@mui/material";
import {
  DateField,
  GenericSelectField,
  MultipleSelectField,
} from "../../../../../../components";
import { TimezoneMockData } from "./ComingSoonMock";
import { SwitchButton } from "../../../../../../components/Button/SwitchButton";
import { Control } from "react-hook-form";
import { ContentDateType } from "./validation";
import LiveCountdown from "./LiveCountDown";
import { MappedCountry } from "./types";

interface CountryOption {
  value: string;
  label: string;
}

type ComingSoonProps = {
  control: Control<ContentDateType>;
  isSwitchOn: boolean;
  isActive?: boolean;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mappedCountries: MappedCountry[];
  isCountdownEnabled: boolean;
  onCountdownToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  countriesList: CountryOption[];
  isCountriesLoading: boolean;
};

const ComingSoonManagement = ({
  control,
  isSwitchOn,
  onSwitchChange,
  isActive,
  mappedCountries,
  isCountdownEnabled,
  onCountdownToggle,
  countriesList,
  isCountriesLoading,
}: ComingSoonProps) => {
  if (isCountriesLoading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <CircularProgress size={40} sx={{ color: "#3B0086" }} />
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Container sx={{ width: 600 }}>
        <div className="flex pr-5 items-end">
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#3B0086",
              paddingBottom: "3px",
            }}
          >
            Coming Soon Management
          </Typography>
          <div className="flex flex-col justify-end pl-10 ">
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "10px",
                color: "#3B0086",
                paddingLeft: "10px",
              }}
            >
              Enable CountDown
            </Typography>
            <SwitchButton
              checked={isCountdownEnabled}
              onChange={onCountdownToggle}
              disabled={isActive}
              sx={{ flexShrink: 0 }}
            />
          </div>
        </div>

        {isCountdownEnabled ? (
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
                options={countriesList}
                disabled={isActive}
                multiple
              />
            </Container>
            <LiveCountdown mappedCountries={mappedCountries} />
          </Container>
        ) : (
          <Container
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: "#3B0086",
              backgroundColor: "rgba(59, 0, 134, 0.05)",
              padding: "2rem",
              width: "100%",
              height: "50%",
              borderRadius: "15px",
            }}
          >
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
              options={countriesList}
              disabled={isActive}
              multiple
            />
          </Container>
        )}
      </Container>
    </Stack>
  );
};

export default ComingSoonManagement;
