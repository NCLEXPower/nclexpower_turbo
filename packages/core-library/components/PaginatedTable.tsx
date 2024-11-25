import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import { parse } from 'date-fns';
import { PropsWithChildren, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
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
} from 'react-table';
import { PaginationData } from '../types/types';
import { useResolution } from '../hooks';
import { AdditionalFiltersMenu } from './table/AdditionalFiltersMenu';
import { CheckboxCell } from './Checkbox/CheckboxCell';
import { DefaultColumnFilter } from './table/filters/DefaultColumnFilter';
