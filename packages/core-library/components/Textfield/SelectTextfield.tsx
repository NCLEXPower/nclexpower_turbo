import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormHelperText,
  TextFieldProps,
  SxProps,
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
  listSx?: SxProps;
  SelectProps?: any; // testing this
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
  listSx,
  SelectProps,  // testing this
  ...rest
}: BaseSelectFieldProps) {
  return (
    <div>
      {helperText && (
        <FormHelperText error={error} sx={{ marginBottom: 2 }}>
          {helperText}
        </FormHelperText>
      )}
      <TextField
        select
        label={!value ? label : null}
        error={error}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false }}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={option.xvalue ?? option.value}
            value={option.xvalue ?? option.value}
            sx={{ ...listSx }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
  onChange: parentOnChange,
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
          onChange={(e) => {
            onChange(e), parentOnChange?.(e);
          }}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
