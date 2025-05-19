import React from "react";
import { useToolbarSettings } from "core-library/contexts/ToolbarSettingsContext";
import {
  FormControlLabel,
  FormControlLabelProps,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps,
  RadioProps as MuiRadioProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { datatypes } from "core-library";
import { ControlledField } from "core-library/types";
import { Controller, FieldValues } from "react-hook-form";

type Props = Pick<RadioGroupProps, "value" | "sx" | "onBlur"> & {
  radio: datatypes.ParsedChoices[];
  labelProps?: TypographyProps;
  radioContainerProps?: Pick<FormControlLabelProps, "sx">;
  transformValue?: (value: string) => any | undefined;
  getValue?: (value: any) => string;
  onChange?: (...event: any[]) => void;
} & Pick<MuiRadioProps, "color">;

const sx: MuiRadioProps["sx"] = {
  color: "black",
  "&.Mui-checked": {
    color: "black",
  },
};

export type RadioProps = MuiRadioProps &
  Pick<Props, "labelProps" | "radioContainerProps"> & {
    label?: string;
    element?: React.ReactNode;
  };

export const Radio: React.FC<RadioProps> = ({
  value,
  label,
  labelProps,
  color,
  radioContainerProps,
  ...rest
}) => {
  const { textZoomStyle } = useToolbarSettings();
  return (
    <FormControlLabel
      value={value}
      control={<MuiRadio size="small" sx={{ ...(!color && sx) }} {...rest} />}
      label={
        <Typography style={textZoomStyle} {...labelProps}>
          {label}
        </Typography>
      }
      {...radioContainerProps}
    />
  );
};

export const RadioGroup: React.FC<Props> = ({
  radio,
  value,
  onChange,
  labelProps = {},
  radioContainerProps = {},
  color,
  transformValue = (v: string) => v,
  getValue = (value) => value,
  ...rest
}) => {
  const hasCustomElement = radio?.some((item) => !!item.Element);
  if (hasCustomElement) {
    return (
      <div {...rest}>
        {radio?.map((item, i) => (
          <React.Fragment key={i}>{item.Element}</React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <MuiRadioGroup
      name="radio-buttons-group"
      onChange={(e) =>
        onChange?.(transformValue(e.target.value) ?? e.target.value)
      }
      value={getValue(value) ?? ""}
      {...rest}
    >
      {radio?.map((item, i) => (
        <Radio
          key={i}
          value={item.Value}
          label={item.Label}
          labelProps={labelProps}
          color={color}
          {...radioContainerProps}
        />
      ))}
    </MuiRadioGroup>
  );
};

export type ControlledRadioGroupProps<T extends FieldValues> =
  ControlledField<T> & Props;

export function ControlledRadioGroup<T extends FieldValues>({
  control,
  name,
  onChange: origOnChange,
  transformValue = (v: string) => v,
  shouldUnregister,
  ...rest
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <RadioGroup
          {...rest}
          value={value}
          onChange={(event: any) => {
            onChange(transformValue(event) ?? event);
            origOnChange?.(event);
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
}
