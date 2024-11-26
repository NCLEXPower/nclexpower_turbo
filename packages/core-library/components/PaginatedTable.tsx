import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import { parse } from "date-fns";
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CellProps,
  Column,
  FilterValue,
  HeaderProps,
  Hooks,
  IdType,
  Row,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { PaginationData } from "../types/types";
import { useResolution } from "../hooks";
import { AdditionalFiltersMenu } from "./table/AdditionalFiltersMenu";
import { CheckboxCell } from "./Checkbox/CheckboxCell";
import { DefaultColumnFilter } from "./table/filters/DefaultColumnFilter";
import { PaginationControls } from "./PaginationControls";
import { TableContent } from "./TableContent";
import {
  TableContentMobile,
  TableContentMobileFiltersConfig,
} from "./table/TableContentMobile";
import { FilterLabel, SortByValue } from "./table/types";
import React from "react";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  noDataText: string;
  noDataFoundText: string;
  additionalFilterColumn?: string;
  additionalFilterValues?: {
    label: string;
    value: boolean | number | string;
  }[];
  filterLabels?: FilterLabel[];
  labelPrefix?: string;
  filters?: FilterValue;
  sortBy?: SortByValue[];
  isLoading?: boolean;
  hiddenColumns?: string[];
  paginationData?: PaginationData;
  mobileFiltersConfig: TableContentMobileFiltersConfig<T>;
  downloadLabel?: string;
  downloadHidden?: boolean;
  downloadLoading?: boolean;
  downloadDisabled?: boolean;
  renderMobileRow?(row: Row<T>): React.ReactNode;
  onClearFilters?(): void;
  onRowClick?(row: Row<T>): void;
  onRowSelect?(row: Row<T>[]): void;
  onPageChange?(page: number): void;
  onSortChange?(sort: SortByValue[]): void;
  onFilterChange?(filters: FilterValue): void;
  onDownloadClicked?(): void;
}

const DefaultHeader: React.FC<HeaderProps<{}>> = ({ column }) => (
  <>{column.id.startsWith("_") ? null : column.id}</>
);
const defaultColumn: Partial<Column> = {
  Filter: DefaultColumnFilter,
  Header: DefaultHeader,
  minWidth: 250,
  width: 252,
  maxWidth: 300,
};

const hooks = [
  useColumnOrder,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useResizeColumns,
  useRowSelect,
];

export function PaginatedTable<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const {
    columns,
    additionalFilterColumn = "",
    additionalFilterValues,
    filterLabels,
    noDataFoundText,
    filters,
    sortBy,
    labelPrefix = "",
    isLoading,
    paginationData,
    noDataText,
    downloadLabel,
    downloadHidden,
    downloadLoading,
    downloadDisabled,
    hiddenColumns = [],
    mobileFiltersConfig,
    renderMobileRow,
    onPageChange,
    onSortChange,
    onFilterChange,
    onRowClick,
    onRowSelect,
    onClearFilters,
    onDownloadClicked,
  } = props;

  const { isMobile } = useResolution();
  const [additionalFilterOpen, setAdditionalFilterOpen] = useState(false);
  const [additionalFilter, setAdditionalFilter] = useState<
    { id: string; value: string | boolean | number }[]
  >([]);
  const additionalFilterMenuButtonRef = useRef<HTMLButtonElement>(null);

  const dateBetweenFilterFn = useMemo(
    () => (rows: Row<T>[], id: IdType<T>[], filterValues: FilterValue) => {
      const startDate = new Date(filterValues[0]);
      const endDate = new Date(filterValues[1]);

      return rows.filter((row) => {
        const time = parse(
          row.values[id[0]],
          "yyyy-MM-dd HH:mm:ss.SS",
          new Date()
        );
        return filterValues.length === 0
          ? rows
          : time >= startDate && time <= endDate;
      });
    },
    []
  );

  const filterTypes = useMemo(
    () => ({ dateBetween: dateBetweenFilterFn }),
    [dateBetweenFilterFn]
  );

  const tableInstance = useTable<T>(
    {
      ...props,
      columns,
      filterTypes,
      defaultColumn: defaultColumn as Partial<Column<T>>,
      initialState: {
        hiddenColumns: [...hiddenColumns, additionalFilterColumn],
        filters: [...filters, ...additionalFilter],
        sortBy: sortBy || [],
      },
    },
    ...hooks,
    (hooks: Hooks<T>) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "_selector",
          disableResizing: true,
          disableGroupBy: true,
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item>
                <CheckboxCell
                  {...getToggleAllPageRowsSelectedProps()}
                  name="document_toggle"
                  title={`${
                    getToggleAllPageRowsSelectedProps().checked
                      ? "Unselect"
                      : "Select"
                  } all document on this page`}
                />
              </Grid>
              {!!additionalFilterValues?.length && (
                <Grid item>
                  <IconButton
                    onClick={() => {}}
                    ref={additionalFilterMenuButtonRef}
                    data-testid="additional-filter-button"
                    title="Filter list"
                  >
                    <KeyboardArrowDown
                      fontSize="medium"
                      sx={{ color: "common.black" }}
                    />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ),
          Cell: ({ row }: CellProps<T>) => {
            return (
              <CheckboxCell
                {...row.getToggleRowSelectedProps()}
                name="document_toggle"
                title={`${row.getToggleRowSelectedProps().checked ? "Unselect" : "Select"}`}
              />
            );
          },
          minWidth: 73,
          width: 73,
          maxWidth: 73,
        },
        ...columns,
        {
          id: "_actions",
          disableResizing: true,
          disableGroupBy: true,
          Header: () => (
            <Box width={400} display="flex" justifyContent="flex-end">
              <PaginationControls<T>
                instance={tableInstance}
                labelPrefix={labelPrefix}
                paginationData={paginationData}
                onChangePage={onPageChange}
              />
            </Box>
          ),
          Cell: ({ row }: CellProps<T>) => (
            <div>{row.original.actions as ReactNode}</div>
          ),
          minWidth: 300,
          width: 400,
          maxWidth: 450,
        },
      ]);
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        const selectionGroupHeader = headerGroups[0].headers[0];
        selectionGroupHeader.canResize = false;
      });
    }
  );
  useEffect(() => {
    onSortChange && onSortChange(tableInstance.state.sortBy);
  }, [tableInstance.state.sortBy]);

  useEffect(() => {
    onRowSelect && onRowSelect(tableInstance.selectedFlatRows);
  }, [onRowSelect, tableInstance.selectedFlatRows]);

  useEffect(() => {
    if (!filters.length) {
    }
  }, [filters.length]);

  return (
    <>
      {isMobile && renderMobileRow ? (
        <TableContentMobile
          noDataText={noDataText}
          noDataFoundText={noDataFoundText}
          tableInstance={tableInstance}
          filterLabels={filterLabels}
          filters={filters}
          labelPrefix={labelPrefix}
          isLoading={isLoading}
          onRowClicked={onRowClick}
          onSearchClicked={handleSearchClick}
          renderRow={renderMobileRow}
          filtersConfig={mobileFiltersConfig}
          onFiltersCleared={handleClearFilters}
          downloadLabel={downloadLabel}
          downloadHidden={downloadHidden}
          downloadLoading={downloadLoading}
          downloadDisabled={downloadDisabled}
          onDownloadClicked={onDownloadClicked}
          paginationData={paginationData}
          onPageChange={onPageChange}
        />
      ) : (
        <TableContent
          noDataText={noDataText}
          noDataFoundText={noDataFoundText}
          tableInstance={tableInstance}
          filterLabels={filterLabels}
          filters={filters}
          labelPrefix={labelPrefix}
          isLoading={isLoading}
          downloadLabel={downloadLabel}
          downloadHidden={downloadHidden}
          downloadLoading={downloadLoading}
          downloadDisabled={downloadDisabled}
          onFiltersCleared={handleClearFilters}
          onDownloadClicked={onDownloadClicked}
          onRowClicked={onRowClick}
          onSearchClicked={handleSearchClick}
        />
      )}
      {additionalFilterColumn && (
        <AdditionalFiltersMenu
          anchorEl={additionalFilterMenuButtonRef?.current}
          open={additionalFilterOpen}
          onClosed={handleAdditionalFilterClose}
          onFilterSelected={handleAdditionalFilterSelect}
          values={additionalFilterValues || []}
          selectedValues={additionalFilter}
          labelPrefix={labelPrefix}
        />
      )}
    </>
  );

  function handleSearchClick() {
    tableInstance.setAllFilters([...filters, ...additionalFilter]);
    onFilterChange && onFilterChange([...filters, ...additionalFilter]);
  }

  function handleAdditionalFilterClick() {
    setAdditionalFilterOpen(true);
  }

  function handleAdditionalFilterClose() {
    setAdditionalFilterOpen(false);
  }

  function handleAdditionalFilterSelect(value?: string) {
    setAdditionalFilterOpen(false);

    if (!value) {
      setAdditionalFilter([]);
      tableInstance.setAllFilters(filters);
      onFilterChange && onFilterChange(filters);
      return;
    }

    setAdditionalFilter([{ id: additionalFilterColumn, value }]);
    tableInstance.setAllFilters([
      ...filters,
      { id: additionalFilterColumn, value },
    ]);
    onFilterChange &&
      onFilterChange([...filters, { id: additionalFilterColumn, value }]);
  }

  function handleClearFilters() {
    tableInstance.setAllFilters([]);
    onClearFilters && onClearFilters();
  }
}
