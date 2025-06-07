import { Grid, RadioGroup, Box, Typography, Divider } from "@mui/material";
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
import { Radio } from "./Radio";

export interface ProductRadioSelectionProps {
  productValue: string;
  productType: number;
  [key: string]: any;
}

export interface ProductRadioOption {
  option: ProductRadioSelectionProps;
  label?: string | JSX.Element;
  value: number;
  bgColor: string;
  formattedPrice: string;
}

interface ProductRadioSelectionFieldProps<T extends object> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  options: ProductRadioOption[];
  disabled?: boolean;
  valueParser?: (
    value: string
  ) => UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  ariaLabelledby?: string;
  groupClassName?: string;
}

type ProductRadioSelectionComponentProps = {
  onChange(value: any): void;
  options: ProductRadioOption[];
  disabled?: boolean;
  valueParser?: (value: string) => any;
  ariaLabelledby?: string;
  groupClassName?: string;
  value?: any;
  name?: string;
};

export const ProductRadioSelectionField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  options,
  disabled,
  valueParser,
  ariaLabelledby,
  groupClassName,
}: ProductRadioSelectionFieldProps<T>) => (
  <Controller<T>
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <ProductRadioSelectionComponent
        options={options}
        disabled={disabled}
        valueParser={valueParser}
        ariaLabelledby={ariaLabelledby}
        groupClassName={groupClassName}
        {...field}
      />
    )}
  />
);

const ProductRadioSelectionComponent = forwardRef(function Component(
  {
    options,
    onChange,
    value,
    disabled,
    valueParser,
    ariaLabelledby = "product-selection",
    groupClassName = "space-y-3",
    ...props
  }: ProductRadioSelectionComponentProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <RadioGroup
      aria-labelledby={ariaLabelledby}
      onChange={(_, v) => onChange(valueParser ? valueParser(v) : Number(v))}
      ref={ref}
      value={value ?? ""}
      className={groupClassName}
      {...props}
    >
      {options.map(({ option, bgColor, formattedPrice }, idx) => (
        <Fragment key={option.productType}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "1.81rem 1.5rem",
              borderRadius: "1.06rem",
              transition: "all 0.3s",
              boxShadow: "0px 1px 4.2px 0px rgba(0,0,0,0.25)",
              // border: `1px solid ${borderColor}`,
              cursor: "pointer",
              backgroundColor: bgColor,
              mb: idx !== options.length - 1 ? 5 : 0,
            }}
            onClick={() => !disabled && onChange(option.productType)}
            tabIndex={0}
            role="button"
            aria-pressed={value === option.productType}
            style={{ outline: "none" }}
          >
            <Radio
              value={option.productType}
              checked={value === option.productType}
              className="hidden"
              disabled={disabled}
              inputProps={{
                "aria-label":
                  option.productValue ?? `Product ${option.productType}`,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontFamily: "PT Sans, sans-serif",
                  fontSize: "1.94rem",
                  lineHeight: "108%",
                  color: "#232323",
                }}
              >
                {option.productType === 0 ? "Standard" : "Fast Track"}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontFamily: "PT Sans, sans-serif",
                  fontSize: "0.94rem",
                  lineHeight: "108%",
                }}
              >
                {option.productType === 0
                  ? "Twenty Three (23) Days"
                  : "Eight (8) Days"}
              </Typography>
            </Box>
            <Typography
              sx={{
                width: "100%",
                textAlign: "right",
                fontWeight: 700,
                fontSize: "2.18rem",
              }}
            >
              {formattedPrice}
            </Typography>
          </Box>
        </Fragment>
      ))}
    </RadioGroup>
  );
});
