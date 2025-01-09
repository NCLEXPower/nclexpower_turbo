/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  DialogProps,
  Grid,
  MenuItem,
  OutlinedInputProps,
  Select,
  Typography,
} from "@mui/material";
import { FocusEvent, useMemo, useState } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import { Input } from "../Input";
import { InputLoader } from "../InputLoader";
import { DEFAULT_PHONE_COUNTRY_CODE, PHONE_CODES } from "../../types/constant";
import { CmsTooltip } from "../../types/common";
import { ErrorTooltip } from "../ErrorTooltip";
import { Tooltip } from "../Tooltip";
import { FieldError } from "./FieldError";
import { theme } from "../../contents/theme/theme";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  label?: string | JSX.Element;
  color?: OutlinedInputProps["color"];
  type?: OutlinedInputProps["type"];
  startAdornment?: OutlinedInputProps["startAdornment"];
  placeholder?: OutlinedInputProps["placeholder"];
  tooltip?: CmsTooltip;
  errorTooltip?: CmsTooltip;
  countryCode: string;
  isLoading?: boolean;
  onFocus?: OutlinedInputProps["onFocus"];
  onBlur?: OutlinedInputProps["onBlur"];
  sx?: DialogProps["sx"];
  onCountryCodeChanged(code: string): void;
}

export const PhoneField = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    render={({ formState: _, ...controllerProps }) => (
      <PhoneFieldComponent {...controllerProps} {...props} />
    )}
  />
);

interface ComponentProps<T extends FieldValues>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
  defaultValue?: number;
}

const PhoneFieldComponent = <T extends object>({
  label,
  tooltip,
  field: rawField,
  fieldState,
  errorTooltip,
  onFocus,
  onBlur,
  defaultValue,
  countryCode,
  onCountryCodeChanged,
  placeholder,
  isLoading,
}: ComponentProps<T>) => {
  const field = { ...rawField, inputRef: rawField?.ref, ref: undefined };
  const [isFocused, setIsFocus] = useState(false);
  const keys = fieldState?.error?.types
    ? Object.keys(fieldState.error.types)
    : [];
  const showErrorTooltip =
    isFocused &&
    (keys?.includes("required") && keys.includes("min")
      ? keys.length > 2
      : keys.length > 1);

  const phoneCodes = useMemo(() => {
    const data = PHONE_CODES ?? [];
    const defaultCode = data.find(
      (pc) => pc.code === DEFAULT_PHONE_COUNTRY_CODE
    );
    const otherCodes = data
      .filter((pc) => pc.code !== DEFAULT_PHONE_COUNTRY_CODE)
      .sort((a, b) => a.code.localeCompare(b.code));

    return defaultCode ? [defaultCode, ...otherCodes] : otherCodes;
  }, [PHONE_CODES]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {fieldState?.error?.message && (
          <Typography sx={{fontSize: 15}} color="error">
            {fieldState.error.message}
          </Typography>
        )}
      </Grid>

      <Grid item>
        {isLoading ? (
          <InputLoader />
        ) : (
          <ErrorTooltip open={showErrorTooltip} tooltip={errorTooltip}>
            <Grid container spacing={4}>
              <Grid item xs={5}>
                <Select
                  data-testid="phone-code-select"
                  fullWidth
                  style={{
                    borderRadius: "5px",
                    padding: "15px",
                  }}
                  inputProps={{ shrink: "false" }}
                  MenuProps={{ sx: { maxHeight: "300px", width: "100%" } }}
                  color="primary"
                  IconComponent={KeyboardArrowDown}
                  onChange={({ target }) => onCountryCodeChanged(target.value)}
                  value={countryCode}
                >
                  {phoneCodes.map((pc) => (
                    <MenuItem key={pc.code} value={pc.code}>
                      {`${pc.dial_code} (${pc.code})`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={7}>
                <NumberFormat
                  data-testid="phone-field"
                  customInput={Input}
                  name={field.name}
                  error={!!fieldState?.error?.message}
                  onChange={field.onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  value={field.value as string}
                  decimalSeparator="."
                  displayType="input"
                  type="text"
                  style={{
                    borderRadius: "5px",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-input:focus": {
                      borderRadius: "5px",
                      padding: "15px",
                    },
                  }}
                  thousandSeparator={false}
                  allowNegative={true}
                  isNumericString={true}
                  decimalScale={0}
                  fixedDecimalScale={true}
                ></NumberFormat>
              </Grid>
            </Grid>
          </ErrorTooltip>
        )}
      </Grid>

      {tooltip?.text && (
        <Grid item>
          <Tooltip header={tooltip.header} html={tooltip.html} underlinedText>
            {tooltip.text}
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );

  function handleFocus(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setIsFocus(true);
    onFocus && onFocus(e);
  }

  function handleBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setIsFocus(false);
    onBlur && onBlur(e);
  }
};

