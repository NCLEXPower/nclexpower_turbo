import { Tune as TuneIcon } from "@mui/icons-material";
import {
  Box,
  Grid,
  Link,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { FilterValue, Row, TableInstance } from "react-table";
import { ErrorBox } from "../Alert/ErrorBox";
import { ListLoader } from "./ListLoader";
import { PrimaryButton } from "../Button/PrimaryButton";
import { PaginationData } from "../../types/types";
import { TextButton } from "../Button/TextButton";
import { CheckboxCell } from "../Checkbox/CheckboxCell";
import { FiltersMenuMobile } from "./FiltersMenuMobile";
import { PaginationControls } from "../PaginationControls";
import { FilterLabel } from "./types";

export type TableContentMobileFiltersConfig<T> = {
  alwaysOnFilters: (keyof T)[];
  menuFilters?: (keyof T)[];
};

interface Props<T extends Record<string, unknown>> {
  noDataText: string;
  noDataFoundText: string;
  tableInstance: TableInstance<T>;
  filterLabels?: FilterLabel[];
  filters?: FilterValue;
  labelPrefix?: string;
  isLoading?: boolean;
  paginationData?: PaginationData;
  filtersConfig: TableContentMobileFiltersConfig<T>;
  downloadLabel?: string;
  downloadHidden?: boolean;
  downloadLoading?: boolean;
  downloadDisabled?: boolean;
  onDownloadClicked?(): void;
  onRowClicked?(row: Row<T>): void;
  onSearchClicked(): void;
  renderRow(row: Row<T>): React.ReactNode;
  onPageChange?(page: number): void;
  onFiltersCleared(): void;
}

export const TableContentMobile = <T extends Record<string, unknown>>({
  noDataText,
  noDataFoundText,
  tableInstance,
  filterLabels,
  filtersConfig,
  filters,
  labelPrefix,
  isLoading,
  paginationData,
  downloadLabel,
  downloadHidden,
  downloadLoading,
  downloadDisabled,
  renderRow,
  onPageChange,
  onRowClicked,
  onSearchClicked,
  onFiltersCleared,
  onDownloadClicked,
}: Props<T>): JSX.Element => {
  const theme = useTheme();
  const [filtersKey, forceFiltersUpdate] = useReducer((x: number) => x + 1, 0);
  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
  const canDownload =
    !downloadHidden && !downloadDisabled && !!onDownloadClicked;
  const canClearFilters = !!filters.length;

  useEffect(() => {
    tableInstance.headerGroups.forEach((hg) =>
      hg.headers.forEach((col) => {
        if (Array.isArray(filters))
          col.filterValue = filters.find((f) => f.id === col.id)?.value;
      })
    );
  }, [filters, filtersMenuOpen]);

  return (
    <>
      <Table {...tableInstance.getTableProps()}>
        <Grid container spacing={4} mb={4} key={filtersKey}>
          {renderFilters()}
          <Grid item xs={12}>
            <PrimaryButton
              onClick={onSearchClicked}
              disabled={!filters.length}
              fullWidth
              data-testid="search-button"
            >
              Search
            </PrimaryButton>
          </Grid>
        </Grid>
        <Box
          position="sticky"
          top={theme.sizes.mobileHeaderHeight}
          right={0}
          left={0}
          py={4}
          zIndex={1}
          px={theme.sizes.mobileContentPaddingX}
          mx={`-${theme.sizes.mobileContentPaddingX}`}
          bgcolor="background.default"
          borderBottom={`1px solid ${theme.palette.divider}`}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box
            flex={1}
            minHeight={35}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            {canDownload && (
              <PrimaryButton
                onClick={onDownloadClicked}
                loading={downloadLoading}
                sx={actionButtonStyle}
                data-testid="download"
              >
                {downloadLabel}
              </PrimaryButton>
            )}
            {canDownload && (
              <TextButton
                onClick={() => tableInstance.toggleAllRowsSelected(false)}
                sx={actionButtonStyle}
                data-testid="clear-selections"
              >
                Clear
              </TextButton>
            )}
            {canClearFilters && (
              <TextButton
                onClick={handleFiltersClear}
                sx={actionButtonStyle}
                data-testid="clear-filters"
              >
                Clear filters
              </TextButton>
            )}
            {!canDownload && !canClearFilters && (
              <Link
                noWrap
                tabIndex={0}
                component="button"
                variant="body1"
                textAlign="left"
                onClick={handleFiltersMenuOpen}
                display="flex"
                alignItems="center"
                gap={1}
              >
                Filter results <TuneIcon />
              </Link>
            )}
          </Box>
          <PaginationControls<T>
            instance={tableInstance}
            labelPrefix={labelPrefix}
            paginationData={paginationData}
            onChangePage={onPageChange}
          />
        </Box>

        <TableBody {...tableInstance.getTableBodyProps()}>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={tableInstance.visibleColumns.length}>
                <ListLoader loadersCount={4} isFullWidth={true} spacing={4} />
              </TableCell>
            </TableRow>
          )}
          {!tableInstance.page.length && !isLoading && (
            <TableRow data-testid="table-data-not-found-row">
              <TableCell colSpan={tableInstance.visibleColumns.length}>
                <ErrorBox
                  mb={0}
                  label={filters.length ? noDataFoundText : noDataText}
                />
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            tableInstance.page.map((row) => {
              tableInstance.prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  key={row.getRowProps().key}
                  style={{
                    backgroundColor: row.isSelected
                      ? theme.palette.primary.light
                      : row.original.isHighlight
                        ? theme.palette.grey.A100
                        : undefined,
                  }}
                  data-testid="table-row"
                >
                  <TableCell
                    style={{
                      display: "flex",
                      color: row.isSelected
                        ? theme.palette.primary.main
                        : undefined,
                      borderColor: theme.palette.grey.A400,
                    }}
                  >
                    <CheckboxCell
                      {...row.getToggleRowSelectedProps()}
                      sx={{ mr: 3 }}
                    />
                    <Box
                      flex={1}
                      onClick={() => onRowClicked?.(row)}
                      sx={{ cursor: "pointer" }}
                    >
                      {renderRow(row)}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <FiltersMenuMobile
        open={filtersMenuOpen}
        labelPrefix={labelPrefix}
        filters={renderFilters(true)}
        onClosed={handleFiltersMenuClose}
        onFiltersApplied={onSearchClicked}
        onFiltersCleared={onFiltersCleared}
      />
    </>
  );

  function handleFiltersMenuOpen() {
    setFiltersMenuOpen(true);
  }

  function handleFiltersMenuClose() {
    setFiltersMenuOpen(false);
  }

  function renderFilters(withMenuFilters = false) {
    return tableInstance.headerGroups.flatMap((hg) =>
      hg.headers
        .filter(
          (column) =>
            filtersConfig.alwaysOnFilters.includes(column.id) ||
            (withMenuFilters && filtersConfig.menuFilters?.includes(column.id))
        )
        .map((column) => (
          <Grid item xs={12} key={column.getHeaderProps().key}>
            <Typography color="inherit" variant="body1">
              {
                filterLabels?.find(
                  (filterLabel) => filterLabel.id === column.id
                )?.label
              }
            </Typography>
            {column.canFilter ? column.render("Filter") : null}
          </Grid>
        ))
    );
  }

  function handleFiltersClear() {
    onFiltersCleared();
    forceFiltersUpdate();
  }
};

const actionButtonStyle: SxProps<Theme> = {
  py: 2,
  px: 3,
  minWidth: 68,
  minHeight: 35,
  height: 35,
  fontSize: (theme) => theme.typography.caption.fontSize,
  fontWeight: "bold",
};
