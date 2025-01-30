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

interface StepIconNumberProps extends StepIconProps {
  num: number;
}

const StepIconNumber: React.FC<StepIconNumberProps> = ({
  num,
  active,
  completed,
}) => {
  return (
    <Box
      sx={{
        width: {
          xs: "30px",
          sm: "50px",
        },
        height: {
          xs: "30px",
          sm: "50px",
        },
        borderRadius: "100%",
        backgroundColor: completed || active ? "#0F2A71" : "#0F2A711A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: completed || active ? "#FFF" : "#3333334D",
        fontSize: "clamp(12px,2vw,20px)",
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {num}
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
  numberIcon?: boolean;
};

export const Stepper: React.FC<AppStepperProps> = ({
  activeStep,
  sx = {},
  steps = [],
  alternativeLabel = true,
  stepContent,
  orientation = "horizontal",
  labelStyle,
  numberIcon = false,
}) => {
  return (
    <MuiStepper
      activeStep={activeStep}
      alternativeLabel={alternativeLabel}
      sx={{ maxWidth: 600, width: "100%", px: 0, ...sx }}
      orientation={orientation}
    >
      {steps.map((label, i) => (
        <Step
          sx={{ px: 0 }}
          key={label}
          completed={activeStep > i}
          active={i === activeStep}
        >
          <StepLabel
            StepIconComponent={(props) =>
              numberIcon ? (
                <StepIconNumber {...props} num={i + 1} />
              ) : (
                <StepIcon {...props} />
              )
            }
          >
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
  );
};
