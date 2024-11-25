import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { FilterProps } from "react-table";
import { Input } from "../../Input";

export function DefaultColumnFilter<T extends Record<string, unknown>>({
  column: { id },
  onChange,
  filterValue = "",
}: FilterProps<T>) {
  const [value, setValue] = useState(filterValue);

  return (
    <Input
      name={id}
      value={value}
      onChange={handleChange}
      placeholder="Default filter"
      inputProps={{ maxLength: 60 }}
      startAdornment={
        <InputAdornment position="start">
          <Search sx={{ color: "common.black" }} />
        </InputAdornment>
      }
    />
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange({ id, value: event.target.value ?? "" });
  }
}
