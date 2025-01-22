import React, { useState } from "react";
import { Typography, Container, Stack } from "@mui/material";
import {
  DateField,
  GenericSelectField,
  MultipleSelectField,
} from "../../../../../../components";
import {
  CountryMockData,
  TimezoneMockData,
} from "../ComingSoon/ComingSoonMock";
import { useForm } from "react-hook-form";
import { contentDateSchema, ContentDateType } from "../ComingSoon/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SwitchButton } from "../../../../../../components/Button/SwitchButton";

const ComingSoonSetup = () => {
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control } = form;
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <Stack direction={"row"}>
      <Container>
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
              name="timezones"
              control={control}
              placeholder="Select Timezone:"
              sx={{ width: 300, borderColor: "#3B0086", borderRadius: "8px" }}
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
              sx={{ width: 550, mb: 2 }}
              control={control}
              name="countries"
              label="select countries"
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

export default ComingSoonSetup;
