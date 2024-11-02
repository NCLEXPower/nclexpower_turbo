/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React, { ReactNode } from "react";
import { AccordionSummary } from "@mui/material";
import { styled } from "@mui/material";

interface HeaderProps {
    headerBackgroundColor?: string;
    headerHeight?: string;
    accordionRadius?: string;
  }
  
interface CustomAccordionSummaryProps extends HeaderProps { 
    expanded: boolean;
    onToggle: (event: React.SyntheticEvent, newExpanded: boolean) => void;
    children: ReactNode;
  }

const StyledAccordionSummary = styled(AccordionSummary, {
    shouldForwardProp: (prop) => prop !== "expanded" && prop !== "accordionRadius",
  })<{
    expanded: boolean;
    headerBackgroundColor: string;
    headerHeight: string;
    accordionRadius?: string;
  }>(
    ({ expanded, headerBackgroundColor, headerHeight, accordionRadius }) => ({
      background: headerBackgroundColor,
      paddingLeft: 0,
      paddingRight: 0,
      height: headerHeight,
      borderTopLeftRadius: expanded ? accordionRadius || "0" : accordionRadius || "0",
      borderTopRightRadius: expanded ? accordionRadius || "0" : accordionRadius || "0",
      borderRadius: expanded ? `${accordionRadius || "0"} ${accordionRadius || "0"} 0 0` : accordionRadius || "0",
      border: "none",
    })
  );

export const CustomAccordionSummary: React.FC<React.PropsWithChildren<CustomAccordionSummaryProps>> = ({
    expanded,
    children,
    headerBackgroundColor = "linear-gradient(to right, #0F2A71, #181E2F)",
    headerHeight = "162px",
    accordionRadius = "0px"
}) => {
    return (
      <StyledAccordionSummary
        expanded={expanded}
        style={{ cursor: "default"}}
        headerBackgroundColor={headerBackgroundColor}
        headerHeight={headerHeight}
        accordionRadius={accordionRadius}
      >
        {children}
      </StyledAccordionSummary>
    );
};