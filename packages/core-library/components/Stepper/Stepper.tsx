import {
  StepIconProps,
  Box,
  StepperProps,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

const StepIcon: React.FC<StepIconProps> = ({ active, completed }) => {
  return (
    <Box
      sx={{
        borderRadius: "100%",
        backgroundColor: (theme) =>
          active ? "#0F2A71" :
            completed ? theme.palette.success.main : "#0F2A71"
        ,
        width: [15, 20],
        height: [15, 20],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {completed && (
        <CheckIcon sx={{ color: "#fff", width: ["0.4em", "0.6em"] }} />
      )}
    </Box>
  );
};

type AppStepperProps = {
  activeStep: number;
  sx?: StepperProps["sx"];
  steps: string[];
  stepContent?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  labelStyle?: React.CSSProperties;
  alternativeLabel?: boolean;
};

export const Stepper: React.FC<AppStepperProps> = ({
  activeStep,
  sx = {},
  steps = [],
  orientation = "horizontal",
  stepContent,
  labelStyle,
  alternativeLabel = true,
}) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          pl: 3,
        }}
      >
        <MuiStepper
          activeStep={activeStep}
          alternativeLabel={alternativeLabel}
          orientation={orientation}
          sx={{ width: "100%", px: 0, }}
        >
          {steps.map((label, i) => (
            <Step
              key={label}
              completed={activeStep > i}
              active={i === activeStep}
            >
              <StepLabel StepIconComponent={StepIcon}>
                <Box sx={{ mx: "auto" }}>
                  <Typography
                    fontWeight={activeStep === i ? "bold" : "normal"}
                    fontSize="1rem"
                    display="flex"
                    alignItems="center"
                    style={{ ...labelStyle }}
                  >
                    {label}
                  </Typography>
                </Box>
              </StepLabel>
              {stepContent ? (
                <StepContent>
                  {stepContent}
                </StepContent>
              ) : null}
            </Step>
          ))}
        </MuiStepper>
      </Box>

    </React.Fragment>

  );
};
