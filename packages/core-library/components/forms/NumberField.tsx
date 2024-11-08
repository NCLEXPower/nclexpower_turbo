import { Grid, OutlinedInputProps, Typography } from "@mui/material";
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
import NumberFormat, { NumberFormatPropsBase } from "react-number-format";
import { Input } from "../Input";
import { InputLoader } from "../InputLoader";
import { TextWithBoldedFirstWord } from "../TextWithBoldedFirstWord";
import { CmsTooltip } from "../../types/common";
import { ErrorTooltip } from "../ErrorTooltip";
import { Tooltip } from "../Tooltip";
import { FieldError } from "./FieldError";

interface Props<T extends object> {
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
  isLoading?: boolean;
  decimalScale?: number;
  allowLeadingZeros?: boolean;
  thousandSeparator?: boolean;
  format?: string;
  mask?: string | string[];
  onFocus?: OutlinedInputProps["onFocus"];
  onBlur?: OutlinedInputProps["onBlur"];
  onEnter?(): void;
  prefix?: string;
  suffix?: string;
  showErrorBelowLabel?: boolean;
  hideLabel?: boolean;
  asStringValue?: boolean;
  isAllowed?: NumberFormatPropsBase<T>["isAllowed"];
  allowEmpty?: boolean;
  boldLabelFirstWord?: boolean;
  fixedDecimalScale?: boolean;
  "data-testid"?: string;
}

export const NumberField = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    render={({ formState: _, ...controllerProps }) => (
      <NumberFieldComponent {...controllerProps} {...props} />
    )}
  />
);

interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
  defaultValue?: number;
}

const NumberFieldComponent = <T extends object>({
  label,
  tooltip,
  field: rawField,
  fieldState,
  errorTooltip,
  defaultValue,
  placeholder,
  isLoading,
  decimalScale,
  allowLeadingZeros,
  thousandSeparator,
  format,
  mask,
  onFocus,
  onBlur,
  onEnter,
  showErrorBelowLabel,
  prefix,
  suffix,
  allowEmpty,
  hideLabel = false,
  asStringValue = true,
  isAllowed,
  boldLabelFirstWord,
  fixedDecimalScale,
  ...props
}: ComponentProps<T>) => {
  const field = { ...rawField, inputRef: rawField?.ref, ref: undefined };
  const [isFocused, setIsFocus] = useState(false);
  const showErrorTooltip =
    !hideLabel &&
    isFocused &&
    fieldState?.error?.types &&
    Object.keys(fieldState.error.types).length > 1;
  const hideError = (allowEmpty && field.value === "") || field.value === null;

  return (
    <Grid container spacing={2} direction="column">
      {!hideLabel && (
        <Grid item>
          {fieldState?.error?.message ? (
            showErrorBelowLabel ? (
              <>
                <Typography
                  component="label"
                  htmlFor={field?.name}
                  display="flex"
                >
                  {renderlabel()}
                </Typography>
                {!hideError && (
                  <FieldError messageKey={fieldState.error.message} />
                )}
              </>
            ) : (
              !hideError && <FieldError messageKey={fieldState.error.message} />
            )
          ) : (
            <Typography component="label" htmlFor={field?.name} display="flex">
              {renderlabel()}
            </Typography>
          )}
        </Grid>
      )}

      <Grid item>
        {isLoading ? (
          <InputLoader />
        ) : (
          <ErrorTooltip open={showErrorTooltip} tooltip={errorTooltip}>
            <NumberFormat
              customInput={Input}
              inputProps={{
                id: field?.name,
                "data-testid": props?.["data-testid"] ?? field?.name,
              }}
              value={String(field.value)}
              name={field.name}
              onValueChange={(values) => {
                console.log("Values changed:", values);
                if (field?.onChange) {
                  field.onChange(
                    asStringValue ? values.value : values.floatValue
                  );
                }
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              decimalScale={decimalScale}
              thousandSeparator={thousandSeparator}
              allowNegative={false}
              defaultValue={defaultValue}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
              allowLeadingZeros={allowLeadingZeros}
              onKeyDown={(e: React.KeyboardEvent) =>
                e.key === "Enter" && onEnter && onEnter()
              }
              format={format}
              mask={mask}
              isAllowed={isAllowed}
              fixedDecimalScale={fixedDecimalScale}
            />
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

  function renderlabel() {
    if (label) {
      return boldLabelFirstWord && typeof label === "string" ? (
        <TextWithBoldedFirstWord text={label} />
      ) : (
        label
      );
    }

    return "[[label_name]]";
  }
};
