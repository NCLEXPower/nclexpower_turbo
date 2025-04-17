import { KeyboardArrowDown } from "@mui/icons-material";
import {
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  Paper,
  Popper,
  PopperProps,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  labelPrefix?: string;
  anchorEl: PopperProps["anchorEl"];
  values: { label: string; value: boolean | number | string }[];
  selectedValues: { id: string; value: string | boolean | number }[];
  onClosed(): void;
  onFilterSelected(
    value?: boolean | number | string | null,
    desc?: boolean
  ): void;
}

export const AdditionalFiltersMenu: React.FC<Props> = ({
  open,
  values,
  anchorEl,
  selectedValues,
  labelPrefix = "",
  onClosed,
  onFilterSelected,
}) => {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      paperRef.current?.focus();
    }
  }, [open]);

  return (
    <Popper
      open={open}
      role="menu"
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      disablePortal
      popperOptions={{ strategy: "absolute" }}
      modifiers={[
        {
          name: "whole-page",
          fn: () => {},
          enabled: true,
          phase: "main",
          options: {
            altAxis: true,
            altBoundary: true,
            tether: true,
            offset: "0px, 0px, 0px, 0px",
            overflow: "hidden",
          },
        },
      ]}
      style={{ zIndex: 1 }}
      onKeyDown={(e: React.KeyboardEvent) => e.code === "Escape" && onClosed()}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
          <Paper
            sx={{
              height: { xs: "100vh", md: "auto" },
              boxShadow: (theme) => ({ xs: "unset", md: theme.shadows[5] }),
            }}
          >
            <ClickAwayListener onClickAway={onClosed}>
              <Grid
                container
                width={{ xs: "100vw", md: "auto" }}
                maxWidth={{ xs: "100vw", md: 250 }}
                py={2}
                mt={{ xs: 4.5, md: 2 }}
              >
                <Grid item xs={12} sx={infoRowStyle}>
                  <Grid
                    container
                    alignItems="center"
                    ref={paperRef}
                    tabIndex={0}
                    onClick={() => onFilterSelected()}
                    onKeyDown={(e) => e.code === "Enter" && onFilterSelected()}
                    bgcolor={
                      isNoneSelected()
                        ? "appColors.support80.transparentLight"
                        : "transparent"
                    }
                  >
                    <Grid item>
                      <Typography
                        variant="body2"
                        ml={8}
                        color={isNoneSelected() ? "primary" : "inherit"}
                      >
                        Select all
                      </Typography>
                    </Grid>
                    <Grid item pt={2}>
                      <KeyboardArrowDown
                        fontSize="medium"
                        sx={{
                          color: isNoneSelected()
                            ? "appColors.primary"
                            : "common.black",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {values.map((value, index) => (
                  <Grid key={index} container xs={12} alignItems="center">
                    <Grid item xs={12} px={8}>
                      <Divider />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      tabIndex={0}
                      sx={infoRowStyle}
                      onClick={() => onFilterSelected(value.value)}
                      onKeyDown={(e) =>
                        e.code === "Enter" && onFilterSelected(value.value)
                      }
                      bgcolor={
                        isSelected(value)
                          ? "appColors.support80.transparentLight"
                          : "transparent"
                      }
                    >
                      <Grid container alignItems="center">
                        <Grid item>
                          <Typography
                            variant="body2"
                            ml={8}
                            color={isSelected(value) ? "primary" : "inherit"}
                          >
                            test
                          </Typography>
                        </Grid>
                        <Grid item pt={2}>
                          <KeyboardArrowDown
                            fontSize="medium"
                            sx={{
                              color: isSelected(value)
                                ? "appColors.primary"
                                : "common.black",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  function isSelected(value: Props["values"][number]) {
    return selectedValues.some((v) => v.value === value.value);
  }

  function isNoneSelected() {
    return !values.some(isSelected);
  }
};

const infoRowStyle: SxProps<Theme> = {
  px: 1,
  py: 2,
  cursor: "pointer",
  "&:hover": { backgroundColor: "appColors.support80.transparentLight" },
};
