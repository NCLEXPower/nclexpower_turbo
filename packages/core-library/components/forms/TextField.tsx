import {
  FormHelperText,
  Grid,
  OutlinedInputProps,
  Typography,
} from "@mui/material";
import { FocusEvent, useState } from "react";
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
import { ErrorTooltip } from "../ErrorTooltip";
import { Tooltip } from "../Tooltip";
import { CmsTooltip } from "../../types/common";
import { Input } from "../Input";
import { InputLoader } from "../InputLoader";
import { zxcvbn } from "@zxcvbn-ts/core";
import React from "react";
import { PasswordStrengthMeter } from "../Textfield/PasswordStrengthMeter";
import { DialogProps } from "@mui/material/Dialog";
import { EvaIcon } from "../EvaIcon";

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  label?: string | JSX.Element | null;
  icon?: React.ReactNode;
  color?: OutlinedInputProps["color"];
  type?: OutlinedInputProps["type"];
  startAdornment?: OutlinedInputProps["startAdornment"];
  placeholder?: OutlinedInputProps["placeholder"];
  tooltip?: CmsTooltip;
  errorTooltip?: CmsTooltip;
  isLoading?: boolean;
  errorTooltipDisabled?: boolean;
  "data-testid"?: string;
  onFocus?: OutlinedInputProps["onFocus"];
  onBlur?: OutlinedInputProps["onBlur"];
  onEnter?(): void;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  isregister?: boolean;
  sx?: DialogProps["sx"];
  inputProps?: OutlinedInputProps["inputProps"];
  endAdornment?: OutlinedInputProps["endAdornment"];
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ formState: _, ...controllerProps }) => (
      <TextFieldComponent {...controllerProps} {...props} />
    )}
  />
);
interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
}

export const TextFieldComponent = <T extends object>({
  label,
  tooltip,
  field: rawField,
  fieldState,
  errorTooltip,
  onFocus,
  onBlur,
  onEnter,
  isLoading,
  errorTooltipDisabled,
  ...props
}: ComponentProps<T>) => {
  const field = { ...rawField, inputRef: rawField?.ref, ref: undefined };
  const [isFocused, setIsFocus] = useState(false);
  const showErrorTooltip =
    !errorTooltipDisabled &&
    isFocused &&
    fieldState?.error?.types &&
    Object.keys(fieldState.error.types).length > 1;

  const result = props.isregister
    ? zxcvbn(field.value == undefined ? "" : field.value)
    : zxcvbn("");

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {fieldState?.error?.message ? (
          <FormHelperText error>{fieldState?.error?.message}</FormHelperText>
        ) : (
          label !== null && (
            <Typography component="label" htmlFor={field?.name} display="flex">
              {label ?? ""}
            </Typography>
          )
        )}
      </Grid>
      <Grid item>
        <ErrorTooltip open={showErrorTooltip} tooltip={errorTooltip}>
          {isLoading ? (
            <InputLoader />
          ) : (
            <React.Fragment>
              <div className="relative">
                <Input
                  {...props}
                  {...field}
                  id={field?.name}
                  data-testid={props["data-testid"] || `${field.name}-field`}
                  error={!!fieldState?.error?.message}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={field?.value ?? ""}
                  onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
                  sx={{
                    height: {
                      xs: "clamp(1px, 10.466vw, 110px)",
                      md: "clamp(1px, 2.917vw, 112px)",

                    },
                    borderRadius: "5px",
                    "& .MuiInputBase-input": {
                      height: {
                        xs: "clamp(1px, 10.466vw, 110px)",
                        md: "clamp(1px, 2.917vw, 112px)",

                      },
                      fontSize: {
                        xs: "clamp(1px, 3.72092vw, 36px)",
                        md: "clamp(1px, 0.9375vw, 36px)"
                      },
                      padding: {
                        xs: "0 clamp(1px,3.48837vw,30px)",
                        md: "0 clamp(1px,0.78125vw,30px)"
                      }
                    },
                  }}
                />
                {props.icon && props.icon}
                {props.isregister && <PasswordStrengthMeter result={result} />}
              </div>
            </React.Fragment>
          )}
        </ErrorTooltip>
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
    onFocus?.(e);
  }

  function handleBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setIsFocus(false);
    onBlur?.(e);
  }
};
