import React, { useMemo } from "react";
import {
  usePaginatedTable,
  PaginatedTable,
  DateRangeColumnFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
} from "../../../../packages/core-library/components/table";
import { Column, FilterProps, FilterValue } from "react-table";
import { formatDate } from "core-library";

interface TableColumns extends Record<string, unknown> {
  id: string;
  name: string;
  dateReceived: string;
  type: string;
  isBold: boolean;
  isHighlight: boolean;
  status: string;
}

export default function SamplePage() {
  const {
    pageData,
    selectedRows,
    updateFilters,
    additionalFilters,
    tableProps,
  } = usePaginatedTable<TableColumns>(
    { propertyName: "id" },
    {
      dateReceived: (filter: FilterValue) => ({
        receivedDateFrom: formatDate(filter.value[0]),
        receivedDateTo: formatDate(filter.value[1]),
      }),
    }
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: "test",
          accessor: "name",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
              labelPrefix: "test",
            }),
          filter: "contains",
          minWidth: 250,
          width: 350,
          maxWidth: 500,
        },
        {
          id: "dateReceived",
          Header: "date received",
          accessor: (row: TableColumns) =>
            formatDate(row.dateReceived, "yyyy-MM-dd HH:mm:ss.SSS"),
          Filter: (props: FilterProps<{}>) =>
            DateRangeColumnFilter({
              ...props,
              filterValue: props.column.filterValue ?? [null, null],
              onChange: updateFilters,
              labelPrefix: "",
            }),
          filter: "dateBetween",
        },
        {
          Header: "Type",
          accessor: "type",
          Filter: (props: FilterProps<{}>) =>
            SelectColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
              labelPrefix: "",
              options: [],
            }),
          filter: "equals",
        },
        { Header: "Status", accessor: "status", filter: "equals" },
        { Header: "id", accessor: "id" },
      ] as Column<TableColumns>[],
    []
  );

  return (
    <PaginatedTable
      columns={columns}
      data={[]}
      noDataText="No data found"
      noDataFoundText="No data found"
      mobileFiltersConfig={{
        alwaysOnFilters: ["name"],
        menuFilters: ["dateReceived", "type"],
      }}
    />
  );
}
