import React, { useMemo } from "react";
import {
  usePaginatedTable,
  PaginatedTable,
  DateRangeColumnFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
} from "../../../../../../components/table";
import { Column, FilterProps, FilterValue } from "react-table";
import { formatDate } from "../../../../../../core";

interface TableColumns extends Record<string, unknown> {
  id: string;
  name: string;
  dateReceived: string;
  type: string;
  isBold: boolean;
  isHighlight: boolean;
  status: string;
}

export const AnnouncementManagementLists: React.FC = () => {
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
          Header: "ID",
          accessor: "name",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
              labelPrefix: "test",
            }),
          filter: "contains",
          width: 200,
        },
        {
          id: "dateReceived",
          Header: "Title",
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
        { Header: "Created At", accessor: "status", filter: "equals" },
        { Header: "Actions", accessor: "id" },
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