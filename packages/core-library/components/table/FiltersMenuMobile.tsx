import { Grid, Grow, Paper, Popper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { BackButton } from "../Button/BackButton";
import { PrimaryButton } from "../Button/PrimaryButton";
import { TextButton } from "../Button/TextButton";

interface Props {
  open: boolean;
  filters: ReactNode[];
  labelPrefix?: string;
  onClosed(): void;
  onFiltersApplied(): void;
  onFiltersCleared(): void;
}

export const FiltersMenuMobile: React.FC<Props> = ({
  open,
  filters,
  labelPrefix,
  onFiltersApplied,
  onFiltersCleared,
  onClosed,
}) => {
  return (
    <Popper
      open={open}
      role="menu"
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
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
          <Paper
            sx={{
              top: 0,
              mt: (theme) => theme.sizes.mobileHeaderHeight,
              pt: 5,
              height: (theme) =>
                `calc(100vh - ${theme.sizes.mobileHeaderHeight})`,
              overflowY: "scroll",
              boxShadow: "unset",
            }}
          >
            <Grid
              container
              width="100vw"
              maxWidth="100vw"
              px={(theme) => theme.sizes.mobileContentPaddingX}
              rowSpacing={12}
            >
              <Grid item xs={12}>
                <BackButton label="Back" onClick={onClosed} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">
                  filters
                </Typography>
              </Grid>
              {filters.map((filter, idx) => (
                <Grid key={idx} item xs={12}>
                  {filter}
                </Grid>
              ))}
              <Grid item xs={12}>
                <PrimaryButton fullWidth onClick={applyFilters}>
                  filters apply
                </PrimaryButton>
              </Grid>
              <Grid item xs={12}>
                <TextButton fullWidth onClick={clearFilters}>
                  clear filter
                </TextButton>
              </Grid>
            </Grid>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  function applyFilters() {
    onFiltersApplied();
    onClosed();
  }

  function clearFilters() {
    onFiltersCleared();
    onClosed();
  }
};
