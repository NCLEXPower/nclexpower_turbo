import React from "react";
import { Chip as MUIChip, ChipProps } from "@mui/material";

interface Props extends ChipProps {
  label?: string;
  onDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Chip: React.FC<Props> = ({
  label,
  onDelete,
  onMouseDown,
  deleteIcon,
  ...rest
}) => {
  return (
    <MUIChip
      label={label}
      onDelete={onDelete}
      onMouseDown={onMouseDown}
      deleteIcon={deleteIcon}
      {...rest}
    />
  );
};

export default Chip;
