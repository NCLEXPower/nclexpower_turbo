import { Grid, RadioGroup } from "@mui/material";
import { RadioProps } from "@mui/material/Radio";
import { ForwardedRef, forwardRef, Fragment } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import { RadioButton } from "./RadioButton";

export interface RadioButtonFieldOption {
  inputField?: JSX.Element;
  label: string | JSX.Element;
  value: any;
}

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  disabled?: boolean;
  buttons: RadioButtonFieldOption[];
  withBorder?: boolean;
  valueParser?: (
    value: string
  ) => UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
}

type ComponentProps = Pick<
  RadioProps,
  "checked" | "disabled" | "color" | "inputProps"
> &
  Partial<Omit<ControllerRenderProps<any, string>, "onChange">> & {
    onChange(value: any): void;
    buttons: RadioButtonFieldOption[];
    withBorder?: boolean;
    valueParser?: (value: string) => any;
    value?: any;
    name?: string;
  };

export const RadioButtonsField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  buttons,
  disabled,
  valueParser,
  withBorder,
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <RadioButtonsComponent
        disabled={disabled}
        withBorder={withBorder}
        valueParser={valueParser}
        buttons={buttons}
        {...field}
      />
    )}
  />
);

const RadioButtonsComponent = forwardRef(function Component(
  {
    buttons,
    onChange,
    value,
    withBorder = false,
    valueParser,
    ...props
  }: ComponentProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <RadioGroup
      onChange={(_, value) =>
        onChange(valueParser ? valueParser(value) : value)
      }
      ref={ref}
      value={value ?? ""}
      {...props}
    >
      <Grid container spacing={8}>
        {buttons.map(({ inputField, ...button }, index) => (
          <Fragment key={`${button.label}_${index}`}>
            <Grid item xs={12}>
              <RadioButton
                withBorder={withBorder}
                checked={button.value === value}
                {...button}
              />
            </Grid>
            {inputField && (
              <Grid
                item
                xs={12}
                marginLeft={11}
                sx={{
                  position: "relative",
                  paddingLeft: 10,
                  ":before": {
                    content: '""',
                    width: "4px",
                    height: (theme) => `calc(100% - ${theme.spacing(8)})`,
                    backgroundColor: (theme) =>
                      theme.palette.appColors.secondary.transparentLight,
                    position: "absolute",
                    top: "32px",
                    left: 0,
                  },
                }}
              >
                {inputField}
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
    </RadioGroup>
  );
});
