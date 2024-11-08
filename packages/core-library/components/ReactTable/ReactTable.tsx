/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Checkbox,
  Switch,
} from '@mui/material';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
  Column,
  OnChangeFn,
  RowSelectionState,
  RowModel,
  getExpandedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { getCommonPinningStyles } from './content/CommonPinningStyle';
import { TablePaginationActions } from './TablePaginationActions';
import { StyledTableRow } from './content/StyledTableRow';
import { CheckBoxColumn } from './constant/CheckBoxColumn';
import { AuthorizedContentsResponseType } from '../../api/types';

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rightPinnedIds?: string[];
  leftPinnedIds?: string[];
  checkBoxSelection?: boolean;
  selectedRows?: (values: RowModel<T>) => void;
  initPageSize?: number;
  isLoading?: boolean;
  expandable?: boolean;
  searchFilter?: boolean;
}

export const ReactTable = <T extends { children?: T[] }>({
  columns,
  data,
  searchFilter = false,
  ...rest
}: Props<T>) => {
  const {
    rightPinnedIds,
    leftPinnedIds,
    checkBoxSelection,
    selectedRows,
    expandable,
    isLoading,
    initPageSize,
  } = rest;

  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showSearchInput, setShowSearchInput] = useState(false);
  const combinedColumns = [...CheckBoxColumn<T>(), ...columns];
  const dataColumns = useMemo(
    () => (!checkBoxSelection ? columns : combinedColumns),
    [columns]
  );

  const table = useReactTable({
    onRowSelectionChange: setRowSelection,
    state: {
      columnPinning: {
        right: rightPinnedIds,
        left: leftPinnedIds,
      },
      rowSelection,
      expanded: expanded,
      globalFilter,
    },
    getSubRows: (row) => ('children' in row ? row.children : []),
    onExpandedChange: setExpanded,
    enableRowSelection: checkBoxSelection,
    columns: dataColumns ?? [],
    keepPinnedRows: true,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  useEffect(() => {
    selectedRows && selectedRows(table.getSelectedRowModel());
  }, [table.getSelectedRowModel()]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box data-testid='react-table' sx={{ position: 'relative' }}>
      {searchFilter && (
        <Box
          sx={{
            position: 'absolute',
            top: -65,
            left: '60%',
            transform: 'translateX(-50%)',
            mb: 2,
          }}
        >
          <input
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setGlobalFilter(e.target.value);
            }}
            placeholder='Search...'
            style={{ padding: '8px', width: '300px' }}
          />
        </Box>
      )}

      <TableContainer>
        <Table sx={{ minWidth: 650, width: '100%', overflow: 'auto' }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <StyledTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  return (
                    <TableCell
                      style={{ ...getCommonPinningStyles(column) }}
                      sx={{ fontWeight: 700 }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? table
                  .getRowModel()
                  .rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
              : table.getRowModel().rows
            ).map((row, index) => (
              <StyledTableRow key={index}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={index}
                    sx={{ border: '1px' }}
                    component='th'
                    scope='row'
                    style={{ ...getCommonPinningStyles(cell.column) }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell variant='head' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        count={table.getFilteredRowModel().rows.length}
        colSpan={3}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
};
