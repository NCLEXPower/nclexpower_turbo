import React, { useMemo } from "react";
import {
  usePaginatedTable,
  PaginatedTable,
  DateRangeColumnFilter,
  DefaultColumnFilter,
} from "../../../../../../components/table";
import { Column, FilterProps, FilterValue } from "react-table";
import { formatDate } from "../../../../../../core";
import { mockData, TableColumns } from "./constant";

export default function AnnouncementManagementLists() {
  const {
    updateFilters,
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
          Header: "Title",
          accessor: "title",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
              labelPrefix: "Title",
            }),
          filter: "contains",
          minWidth: 250,
          width: 350,
          maxWidth: 500,
        },
        {
          id: "dateReceived",
          Header: "Date Received",
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
          Header: "Content",
          accessor: "content",
        },
        { Header: "ID", accessor: "id" },
      ] as Column<TableColumns>[],
    []
  );

  return (
    <PaginatedTable
      columns={columns}
      data={mockData}
      noDataText="No data found"
      noDataFoundText="No data found"
      mobileFiltersConfig={{
        alwaysOnFilters: ["title"],
        menuFilters: ["dateReceived", "content"],
      }}
    />
  );
}
