import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FilterProps } from "react-table";

interface Props extends FilterProps<{}> {
  options: string[];
  filterValue: string;
  labelPrefix: string;
}

export const SelectColumnFilter: React.FC<Props> = ({
  column: { id },
  onChange,
  filterValue = "",
  labelPrefix = "",
  options = [],
}) => {
  const [value, setValue] = useState(filterValue);

  return (
    <Select
      fullWidth
      displayEmpty
      value={value}
      onChange={handleChange}
      sx={{
        color: (theme) =>
          value ? "common.black" : theme.palette.appColors.essential[300],
      }}
      renderValue={(value) => value || `${labelPrefix}select_${id}`}
      IconComponent={() => (
        <Tune
          sx={{ color: (theme) => theme.palette.common.black, margin: 3 }}
        />
      )}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      }}
      data-testid="table-select-filter-input"
    >
      <MenuItem
        value=""
        sx={{
          marginX: 2,
          paddingY: 0,
          "&.Mui-selected": {
            backgroundColor: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <Box py={2}>Select all</Box>
      </MenuItem>
      {options.map((option, i) => (
        <MenuItem
          key={i}
          value={option}
          sx={{
            mx: 2,
            py: 0,
            "&.Mui-selected": {
              backgroundColor: "primary.light",
              color: "primary.main",
            },
          }}
        >
          <Box
            py={2}
            minWidth={250}
            sx={{
              borderTopWidth: 1,
              borderTopStyle: "solid",
              borderTopColor: "grey.A400",
            }}
          >
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item> {option}</Grid>
              <Grid item pt={1}>
                <KeyboardArrowDown fontSize="medium" />
              </Grid>
            </Grid>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );

  function handleChange({ target: { value = "" } }: SelectChangeEvent<string>) {
    setValue(value);
    onChange({ id, value });
  }
};
