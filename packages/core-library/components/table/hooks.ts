import { useState } from "react";
import { FilterValue, Row } from "react-table";
import { SortByValue, PaginatedTableParams } from "./types";

export const usePaginatedTable = <T extends object>(
  defaultPageData: Partial<Omit<PaginatedTableParams, "propertyName">> & {
    propertyName: keyof T;
  },
  filterModifiers: {
    [P in keyof T]?: (filter: FilterValue) => Record<string, unknown>;
  }
) => {
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);
  const [additionalFilters, setAdditionalFilters] = useState<FilterValue>([]);
  const [sortBy, setSortBy] = useState<SortByValue[]>([
    { desc: true, id: defaultPageData.propertyName.toString() },
  ]);
  const [pageData, setPageData] = useState<PaginatedTableParams>({
    ascending: false,
    pageNumber: 1,
    pageSize: 8,
    ...defaultPageData,
    propertyName: defaultPageData.propertyName.toString(),
  });

  return {
    pageData,
    selectedRows,
    additionalFilters,
    updateFilters: (filterValue: FilterValue) =>
      setFilters((currFilters) => {
        const currentFilterIndex =
          currFilters?.findIndex(
            (filter: FilterValue) => filter.id === filterValue.id
          ) ?? -1;

        if (currentFilterIndex === -1 && filterValue.value) {
          return [...currFilters, filterValue];
        }

        if (filterValue.value) {
          return currFilters.map((filter: FilterValue, idx: number) =>
            idx === currentFilterIndex ? filterValue : filter
          );
        }

        return currFilters.filter(
          (_: FilterValue, idx: number) => idx !== currentFilterIndex
        );
      }),
    tableProps: {
      filters,
      sortBy,
      onFilterChange: (newFilters: FilterValue) => {
        const filterValues = newFilters.reduce(
          (
            prev: Record<string, unknown>,
            curr: FilterValue
          ): Record<string, unknown> => {
            const customFilterValue = filterModifiers[curr["id"] as keyof T];
            return customFilterValue
              ? { ...prev, ...customFilterValue(curr) }
              : { ...prev, [curr["id"]]: curr.value };
          },
          {}
        );

        setPageData((state) => ({ ...state, pageNumber: 1 }));
        setAdditionalFilters(filterValues);
      },
      onSortChange: (sort: SortByValue[]) => {
        setSortBy(sort);
        if (
          sort.length &&
          (sort[0]?.desc !== sortBy[0]?.desc || sort[0]?.id !== sortBy[0]?.id)
        ) {
          setPageData({
            ...pageData,
            ascending: !sort[0].desc,
            propertyName: sort[0].id,
          });
        }
      },
      onClearFilters: () => {
        setFilters([]);
        setAdditionalFilters([]);
      },
      onPageChange: (pageNumber: number) =>
        setPageData({ ...pageData, pageNumber }),
      onRowSelect: (rows: Row<T>[]) => setSelectedRows(rows),
    },
  };
};
