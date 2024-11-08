import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormHelperText,
  TextFieldProps,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export type SelectOption = {
  label: string;
  value: string | number;
  xvalue?: number;
  categoryName?: string;
};

type BaseSelectFieldProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  options: SelectOption[];
  onChange?: (value: string[]) => void;
  value?: string[];
  onBlur?: () => void;
  sx?: TextFieldProps["sx"];
  size?: TextFieldProps["size"];
  variant?: TextFieldProps["variant"];
  placeholder?: TextFieldProps["placeholder"];
  multiple?: boolean;
  "data-testid"?: string;
};

export function MultipleSelect({
  label,
  options,
  helperText,
  error,
  required,
  onChange,
  value = [],
  placeholder,
  multiple = false,
  ...rest
}: BaseSelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string[];
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleDelete = (valueToRemove: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const newValues = value.filter((val) => val !== valueToRemove);
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
      <TextField
        select
        label={label}
        error={error}
        value={multiple ? value : value[0] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        SelectProps={{
          multiple,
          renderValue: (selected: unknown) => {
            if (!Array.isArray(selected)) {
              return selected as string;
            }

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selected.map((val) => (
                  <Chip
                    key={val}
                    label={
                      options.find((opt) => opt.value === val)?.label || val
                    }
                    variant="filled"
                    size="medium"
                    color="info"
                    onDelete={(event) => handleDelete(val, event)}
                    onMouseDown={(e) => e.stopPropagation()}
                    deleteIcon={<CancelIcon aria-label="delete" />}
                    sx={{ borderRadius: 0, border: "1px solid #ccc" }}
                  />
                ))}
              </Box>
            );
          },
        }}
        data-testid={rest["data-testid"] || `${value}-field`}
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem key={`${option.value}-${index}`} value={option.value}>
            {option.label || option.categoryName}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export type MultipleSelectFieldProps = {
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
  shouldUnregister?: boolean;
} & BaseSelectFieldProps;

export function MultipleSelectField({
  control,
  name,
  onChange: CustomOnChange,
  shouldUnregister,
  value: CustomValue,
  ...rest
}: MultipleSelectFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <MultipleSelect
          error={Boolean(error?.message)}
          helperText={error?.message}
          onChange={(event) => {
            onChange(event);
            if (CustomOnChange) {
              CustomOnChange(event);
            }
          }}
          onBlur={onBlur}
          value={CustomValue ? CustomValue : value || []}
          {...rest}
        />
      )}
    />
  );
}
