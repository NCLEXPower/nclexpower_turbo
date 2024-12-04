import React from "react";
import Box from "@mui/material/Box";
import { StepperProps, Typography } from "@mui/material";

type Props = {
  steps: string[];
  activeStep: number;
  onStepChange?: (step: number) => void;
  showButtons?: boolean;
  sx?: StepperProps["sx"];
  icons?: React.ReactNode[];
};

const getStepStyles = (isActive: boolean, isCompleted: boolean) => ({
  activeColor: isActive ? "#0F2A71" : isCompleted ? "#70e000" : "gray",
  fontWeight: isActive ? "bold" : "normal",
  textColor: isActive ? "#0F2A71" : isCompleted ? "#70e000" : "gray",
});

export const ProgressStepper: React.FC<Props> = ({
  steps,
  activeStep,
}) => {
  return (
    <Box className="w-full " sx={{
      borderBox: "box-sizing",
      marginTop: -2
    }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {steps.map((label, index) => {
          const { activeColor, fontWeight, textColor } = getStepStyles(
            activeStep === index,
            activeStep > index
          );

          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                textAlign: "center",
                fontFamily: "PT Sans Narrow",
                fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                color: textColor,
                transition: "color 0.3s ease",
                fontWeight,
              }}
            >
              <Box
                sx={{
                  height: "7px",
                  backgroundColor: activeColor,
                  borderRadius: "1px",
                  marginTop: "0.5rem",
                  transition: "background-color 0.3s ease",
                }}
              />
              <p>{label}</p>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const MobileStepper: React.FC<Props> = ({
  steps,
  activeStep,
  icons = [],
}) => {
  return (
    <Box sx={{
      width: '100%',
      paddingY: 2
    }}>
      <Box
        sx={{
          width: '100%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(15, 42, 113, 0.10)",
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
          paddingX: 4,
          borderRadius: '0.6875rem',
          paddingY: 4,
          gap: 2
        }}
      >
        {steps.map((label, index) => {
          const isActive = activeStep === index;
          const isCompleted = activeStep > index;
          const numStep = index + 1;
          const showLabel = isCompleted || isActive;

          const stepStyle = {
            backgroundColor: isActive
              ? "rgba(15, 42, 113, 0.17)"
              : isCompleted
                ? "rgba(15, 113, 28, 0.19)"
                : "transparent",
            color: isActive
              ? "#0F2A71"
              : isCompleted
                ? "#0F711C"
                : "#495057",
          };

          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                textAlign: "center",
                paddingY: 4,
                fontFamily: "PT Sans",
                borderRadius: '0.6875rem',
                height: "100%",
                ...stepStyle,
                transition: "color 0.3s ease",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "PT Sans",
                  fontSize: '0.75rem',
                  paddingBottom: 2,
                  color: stepStyle.color,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {showLabel && label}
              </Typography>
              <div className="flex items-center justify-center gap-2">
                <Typography
                  className="w-12 px-2 rounded-full border border-darkBlue"
                  sx={{
                    color: stepStyle.color,
                  }}
                >
                  {numStep}
                </Typography>
                {icons[index]}
              </div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};