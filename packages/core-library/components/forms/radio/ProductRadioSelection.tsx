import { Grid, RadioGroup } from "@mui/material";
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
  bgColor: string;
  formattedPrice: string;
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
  bgColor: string;
  formattedPrice: string;
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
  bgColor,
  formattedPrice,
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
        bgColor={bgColor}
        formattedPrice={formattedPrice}
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
    bgColor,
    formattedPrice,
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
      {options.map(({ option }, idx) => (
        <Fragment key={option.productType}>
          <div
            className={`flex items-center justify-between w-full px-6 py-3 rounded-2xl transition-all duration-300 shadow-[0px_1px_4.2px_0px_rgba(0,0,0,0.25)] border cursor-pointer ${bgColor}`}
            onClick={() => !disabled && onChange(option.productType)}
            tabIndex={0}
            role="button"
            aria-pressed={value === option.productType}
            style={{ outline: "none" }}
          >
            <div className="flex items-center justify-center w-full">
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
              <div className="w-full font-ptSans flex flex-col items-start justify-start">
                <h1 className="text-xl font-ptSans lg:text-3xl font-bold -mb-4 pt-2">
                  {option.productType === 0 ? "Standard" : "Fast Track"}
                </h1>
                <p className="text-sm font-ptSans font-normal">
                  {option.productType === 0
                    ? "Twenty Three (23) Days"
                    : "Eight (8) Days"}
                </p>
              </div>
            </div>
            <div className="w-full mx-auto text-right font-bold text-2xl lg:text-[35px]">
              {formattedPrice}
            </div>
          </div>
        </Fragment>
      ))}
    </RadioGroup>
  );
});
