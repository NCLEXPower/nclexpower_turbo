import { KeyboardArrowDown } from "@mui/icons-material";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FieldError } from "./FieldError";
import { InputLoader } from "../InputLoader";
import { countryByCode } from "../../types/business/country";
import { CmsTooltip } from "../../types/common";
import { Tooltip } from "../Tooltip";
import { COUNTRY_LIST } from "../../types/constant";

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T, object>;
  tooltip?: CmsTooltip;
  isLoading?: boolean;
  label?: string | JSX.Element;
  optional?: boolean;
  displayEmpty?: boolean;
}

export const CountrySelectField = <T extends FieldValues>({
  name,
  control,
  tooltip,
  isLoading,
  label,
  optional,
  displayEmpty,
}: Props<T>) => {
  const codeFromForm = control._getWatch(name);
  const [code, setCode] = useState<string>(codeFromForm);

  const countryList = useMemo<Array<{ name: string; code: string }>>(
    () => [
      ...(
        COUNTRY_LIST.map<{ code: string; name: string }>((country) => ({
          code: country.code,
          name: country.name,
        })) || []
      ).sort((a, b) => (a.name > b.name ? 1 : -1)),
    ],
    [COUNTRY_LIST]
  );

  useEffect(() => {
    codeFromForm === code && setCode(control._getWatch(name));
  }, [codeFromForm]);

  if (isLoading) {
    return <InputLoader />;
  }

  const country = countryByCode(code);

  return (
    <Grid container spacing={2}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { name, onChange, value, ref },
          fieldState: { error },
        }) => (
          <Grid item xs={12} container wrap="nowrap">
            <Grid item container direction="column">
              {label && (
                <Grid item>
                  {error?.message ? (
                    <FieldError messageKey={error.message} />
                  ) : (
                    <Typography component="label" htmlFor={name}>
                      {label ?? "[[label_name]]"}
                    </Typography>
                  )}
                </Grid>
              )}
              <Grid item container flexWrap="nowrap">
                <Grid item flex={1}>
                  <Select
                    key={code}
                    fullWidth
                    id={name}
                    inputRef={ref}
                    data-testid={name}
                    inputProps={{ shrink: "false" }}
                    color="primary"
                    IconComponent={KeyboardArrowDown}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setCode(e.target.value);
                    }}
                    value={code}
                    defaultValue={code}
                    displayEmpty={displayEmpty}
                  >
                    {optional && (
                      <MenuItem value="">
                        <Typography sx={{ height: "26px" }} />
                      </MenuItem>
                    )}
                    {countryList.map((country) => (
                      <MenuItem
                        key={country.code}
                        value={country.code}
                        id={country.code}
                        data-testid={country.code}
                      >
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {country && (
                  <Grid
                    item
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pl={4}
                  >
                    <ReactCountryFlag
                      countryCode={value}
                      svg
                      style={{
                        width: "2em",
                        height: "2em",
                      }}
                      title={country}
                      alt={`${country} flag`}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      ></Controller>
      {tooltip && (
        <Grid item xs={12}>
          <Tooltip header={tooltip?.header} html={tooltip.html} underlinedText>
            {tooltip?.text ?? "[[tooltip]]"}
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};
