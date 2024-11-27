import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";
import { TableInstance } from "react-table";
import { PaginationData } from "../../types/types";

export function PaginationControls<T extends Record<string, unknown>>({
  instance,
  labelPrefix,
  paginationData,
  onChangePage,
}: PropsWithChildren<{
  instance: TableInstance<T>;
  labelPrefix?: string;
  paginationData?: PaginationData;
  onChangePage?: (page: number) => void;
}>): ReactElement | null {
  const {
    state: { pageIndex },
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = instance;

  const hasPreviousPage = paginationData
    ? paginationData.hasPreviousPage
    : canPreviousPage;
  const hasNextPage = paginationData ? paginationData.hasNextPage : canNextPage;
  const currentPage = paginationData
    ? paginationData.pageNumber
    : pageIndex + 1;
  const pagesCount = paginationData
    ? paginationData.totalPages
    : pageOptions.length;

  if (!pagesCount) {
    return null;
  }

  return (
    <Grid container justifyContent="flex-end" alignItems="center" wrap="nowrap">
      <Grid item pt={1}>
        <Typography variant="body2">{`${currentPage} of ${pagesCount}`}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handlePreviousPageClick}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft
            fontSize="medium"
            sx={{ color: hasPreviousPage ? "#000" : undefined }}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleNextPageClick} disabled={!hasNextPage}>
          <ChevronRight
            fontSize="medium"
            sx={{ color: hasNextPage ? "#000" : undefined }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );

  function handlePreviousPageClick() {
    paginationData && onChangePage
      ? onChangePage(paginationData.pageNumber - 1)
      : previousPage();
  }

  function handleNextPageClick() {
    paginationData && onChangePage
      ? onChangePage(paginationData.pageNumber + 1)
      : nextPage();
  }
}
