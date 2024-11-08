import { Select } from "@mui/material";
import { BaseSelectFieldProps, SelectOption } from "../GenericSelectField";

export type PlainSelectFieldProps = BaseSelectFieldProps & {
  options: SelectOption[];
  disabledOptions?: boolean;
};

export const PlainSelectField: React.FC<PlainSelectFieldProps> = ({
  options,
  disabledOptions,
  ...rest
}) => {
  return (
    <Select
      native
      size="small"
      {...rest}
      sx={{
        "& select": {
          height: "5vh", // Adjust the height value as needed
        },
      }}
    >
      <option value="" disabled hidden />
      {options?.length > 0 &&
        options.map((option, i) => {
          if ("groupLabel" in option) {
            const { groupLabel, options } = option;
            return (
              <optgroup key={i} label={groupLabel}>
                {options.map((o, j) => (
                  <option key={j} value={o.value ?? o.branch_id ?? o.id}>
                    {o.value ?? o.branchKey ?? o.label ?? o.categoryName}
                  </option>
                ))}
              </optgroup>
            );
          }
          return (
            <option
              key={i}
              disabled={disabledOptions}
              value={
                option.value ??
                option.branch_id ??
                option.id ??
                option.categoryName
              }
            >
              {option.name ??
                option.branchName ??
                option.label ??
                option.categoryName ??
                `${option.currency} ${option.price}`}
            </option>
          );
        })}
    </Select>
  );
};
