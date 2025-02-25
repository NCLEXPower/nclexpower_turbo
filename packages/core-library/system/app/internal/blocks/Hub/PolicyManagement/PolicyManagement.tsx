import { Box, ListItemButton } from "@mui/material";
import { Button, CustomPopover, InformationTitle } from "../../../../../../components";
import React, { useMemo } from "react";
import {
  usePaginatedTable,
  PaginatedTable,
  DateRangeColumnFilter,
  DefaultColumnFilter,
} from "../../../../../../components/table";
import { Column, FilterProps, FilterValue } from "react-table";
import { formatDate } from "../../../../../../core";
import { PolicyMockData, TableColumns } from "./constant";
import { GridMoreVertIcon } from "@mui/x-data-grid";

export const PolicyManagement: React.FC = () => {
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
          Header: "Section Title",
          accessor: "sectionTitle",
          Filter: (props: FilterProps<{}>) =>
            DefaultColumnFilter({
              ...props,
              filterValue: props.column.filterValue,
              onChange: updateFilters,
              labelPrefix: "sectionTitle",
            }),
        },
        {
          id: "dateReceived",
          Header: "Date Received",
          accessor: (row: TableColumns) =>
            formatDate(row.dateReceived, "yyyy-MM-dd HH:mm:ss"),
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
          id: "actions",
          Header: "Actions",
          Cell: ({ row }: { row: { original: TableColumns } }) => (
            <CustomPopover
              data-testid="popover-dropdown"
              open
              withIcon={true}
              label="Actions"
              iconButton={<GridMoreVertIcon fontSize="small" />}
            >
              <ListItemButton
                sx={{ color: "black" }}
              >
                Edit
              </ListItemButton>
              <ListItemButton
                sx={{ color: "black" }}
              >
                Delete
              </ListItemButton>
            </CustomPopover>
          ),
        },
      ] as Column<TableColumns>[],
    []
  );

  return (
    <Box>
      <InformationTitle
        text='Policy Management'
        lineWidth={6}
        lineHeight={35}
        lineColor='#6A5ACD'
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: 'text.primary', fontWeight: 'bold' }}
      />
      <PaginatedTable
        columns={columns}
        data={PolicyMockData}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["title"],
          menuFilters: ["dateReceived", "sectionTitle"],
        }}
      />
    </Box>
  )
};

