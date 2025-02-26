import {
  TextField,
  Autocomplete,
  MenuItem,
  Stack,
  InputLabel,
  FormHelperText,
  AutocompleteProps,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Controller, FieldValues } from "react-hook-form";
import { ControlledField } from "../Textfield";

export type SingleOption = {
  label: string | undefined;
  value: string | undefined;
  code: string | undefined;
  name: string | undefined;
};

export type SingleSelectFieldProps = Omit<
  AutocompleteProps<SingleOption, false, false, false>,
  "renderInput"
> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  options: SingleOption[];
  onChange?: (event: React.ChangeEvent<{}>, value: SingleOption | null) => void;
};

export function SingleSelectField({
  label,
  helperText,
  error,
  required,
  options,
  onChange,
  ...rest
}: SingleSelectFieldProps) {
  return (
    <Stack width="100%">
      {label && (
        <InputLabel
          sx={{ textAlign: "start" }}
          error={error}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <Autocomplete
        {...rest}
        options={options}
        getOptionLabel={(option) => option.label ?? option.code ?? ""}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            error={error}
            helperText={helperText}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <MenuItem
            {...props}
            key={option.value ?? option.code}
            selected={selected}
          >
            {option.label ?? option.code}
            {selected ? (
              <CheckIcon
                key={`check-icon-${option.value ?? option.code}`}
                color="info"
              />
            ) : null}
          </MenuItem>
        )}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Stack>
  );
}

export type ControlledSingleSelectFieldProps<T extends FieldValues> =
  ControlledField<T> & SingleSelectFieldProps;

export function SelectSearch<T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  options,
  onChange: origOnChange,
  label,
  helperText,
  error,
  required,
  ...rest
}: ControlledSingleSelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <SingleSelectField
          options={options}
          value={options.find((option) => option.value === value)}
          onChange={(event, newValue) => {
            onChange(newValue?.code || "");
            origOnChange?.(event, newValue);
          }}
          label={label}
          helperText={helperText}
          error={error}
          required={required}
          {...rest}
        />
      )}
    />
  );
}
