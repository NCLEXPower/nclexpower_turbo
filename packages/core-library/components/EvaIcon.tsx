/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useTheme } from "@mui/material";
import * as eva from "eva-icons";
import { CSSProperties, useEffect } from "react";

interface Props {
  id?: string;
  name: string;
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  ariaHidden?: boolean;
}

export const EvaIcon: React.FC<Props> = ({
  id,
  name,
  fill,
  width,
  height,
  className,
  style,
  ariaHidden = false,
}) => {
  const theme = useTheme();

  useEffect(() => {
    eva.replace();
  }, []);

  const sanitizedName = name.replace(/[^a-zA-Z0-9-]/g, "");
  const fillColor = fill === "#FF0000" ? theme.palette.primary.main : fill;

  return (
    <i
      id={id}
      data-eva={sanitizedName}
      data-eva-fill={fillColor}
      data-eva-height={height}
      data-eva-width={width}
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    />
  );
};
