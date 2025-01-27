import { Switch, SwitchProps, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import React, { useEffect } from "react";

type SwitchButtonPropsType = {
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  checked: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  sx: SxProps<Theme> | undefined;
  disabled?: boolean;
};

export const SwitchButton: React.FC<SwitchButtonPropsType> = ({
  onChange,
  inputProps,
  sx,
  checked,
  disabled,
}) => {
  return (
    <Switch
      sx={{ ...sx }}
      checked={checked}
      onChange={onChange}
      inputProps={{ ...inputProps }}
      disabled={disabled}
    />
  );
};
