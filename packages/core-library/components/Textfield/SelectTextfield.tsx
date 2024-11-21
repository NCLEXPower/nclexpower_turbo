import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormHelperText,
  TextFieldProps,
} from "@mui/material";

type SelectOption = {
  label: string;
  value: string | number;
  xvalue?: number;
};

type BaseSelectFieldProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  options: SelectOption[];
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  onBlur?: () => void;
  sx?: TextFieldProps["sx"];
  size?: TextFieldProps["size"];
  variant?: TextFieldProps["variant"];
  placeholder?: TextFieldProps["placeholder"];
  disabled?: boolean;
};

export function SelectField({
  label,
  options,
  helperText,
  error,
  required,
  onChange,
  value,
  placeholder,
  ...rest
}: BaseSelectFieldProps) {
  return (
    <div>
      <TextField
        select
        label={label}
        error={error}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.xvalue ?? option.value} value={option.xvalue ?? option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  );
}

export type ControlledSelectFieldProps = {
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
  shouldUnregister?: boolean;
} & BaseSelectFieldProps;

export function ControlledSelectField({
  control,
  name,
  onChange,
  shouldUnregister,
  ...rest
}: ControlledSelectFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <SelectField
          error={Boolean(error?.message)}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
