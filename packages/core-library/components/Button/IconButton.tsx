/**
 * Property of the Arxon Solutions, LLC.
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
  disabled?: boolean;
  sx?: SxProps;
  disableRipple?: boolean;
}

export const IconButton: React.FC<React.PropsWithChildren<Props>> = ({
  size,
  ariaLabel,
  onClick,
  edge,
  children,
  className,
  disabled,
  sx,
  disableRipple,
}) => {
  return (
    <MuiIconButton
      aria-label={ariaLabel}
      size={size}
      onClick={onClick}
      edge={edge}
      className={className}
      sx={{ "&:focus": { outline: "none !important" }, ...sx }}
      disabled={disabled}
      disableRipple={disableRipple}
    >
      {children}
    </MuiIconButton>
  );
};
