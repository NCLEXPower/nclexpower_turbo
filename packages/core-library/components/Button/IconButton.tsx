/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as React from "react";
import { IconButton as MuiIconButton, SxProps } from "@mui/material";

interface Props {
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  edge?: false | "start" | "end";
  className?: string;
  sx?: SxProps;
  disabled?: boolean;
}

export const IconButton: React.FC<React.PropsWithChildren<Props>> = ({
  size,
  ariaLabel,
  onClick,
  edge,
  children,
  className,
  sx,
  disabled
}) => {
  return (
    <MuiIconButton
      aria-label={ariaLabel}
      size={size}
      onClick={onClick}
      edge={edge}
      className={className}
      disabled={disabled}
      sx={{ "&:focus": { outline: "none !important" }, ...sx }}
    >
      {children}
    </MuiIconButton>
  );
};
