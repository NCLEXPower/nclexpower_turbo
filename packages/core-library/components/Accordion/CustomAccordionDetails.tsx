/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React, { ReactNode } from "react";
import { AccordionDetails } from "@mui/material";

interface CustomAccordionDetailsProps {
  expanded: boolean;
  onToggle: (event: React.SyntheticEvent, newExpanded: boolean) => void;
  children: ReactNode;
}

export const CustomAccordionDetails: React.FC<
  React.PropsWithChildren<CustomAccordionDetailsProps>
> = ({ children }) => {
  return <AccordionDetails>{children}</AccordionDetails>;
};
