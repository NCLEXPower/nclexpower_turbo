/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as React from "react";
import { IconButton as MuiIconButton } from "@mui/material";

interface Props {
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
  onClick: () => void;
  edge?: false | "start" | "end";
};

export const IconButton: React.FC<React.PropsWithChildren<Props>> = ({
  size,
  ariaLabel,
  onClick,
  edge,
  children
}) => {
  return (
    <MuiIconButton aria-label={ariaLabel} size={size} onClick={onClick} edge={edge}>
      {children}
    </MuiIconButton>
  );
};
