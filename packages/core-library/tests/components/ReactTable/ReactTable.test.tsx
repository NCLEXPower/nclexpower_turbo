import { render, screen } from '../../common';
import { ReactTable } from '../../../components';
import { ColumnDef, useReactTable } from '@tanstack/react-table';

jest.mock('../../../config', () => ({
  config: { value: jest.fn() },
}));

jest.mock('../../../core/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../components/ReactTable/TablePaginationActions', () => ({
  TablePaginationActions: jest.fn(() => <div>TablePaginationActions</div>),
}));

jest.mock('@tanstack/react-table', () => ({
  useReactTable: jest.fn(),
  flexRender: jest.fn((value: any) => value),
  getCoreRowModel: jest.fn(),
  getExpandedRowModel: jest.fn(),
  getFilteredRowModel: jest.fn(),
}));

const mockData = [
  { id: 'mock-id-1', contentId: 'Item 1' },
  { id: 'mock-id-2', contentId: 'Item 2' },
  { id: 'mock-id-3', contentId: 'Item 3' },
];

const mockColumns: ColumnDef<any>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
    enablePinning: true,
  },
  {
    id: 'contentId',
    header: 'ContentID',
    accessorKey: 'contentId',
  },
];

describe('ReactTable', () => {
  let tableMock: any;

  beforeEach(() => {
    tableMock = {
      getHeaderGroups: jest.fn(() => [
        {
          id: 'headerGroup-1',
          headers: [
            {
              id: 'id',
              isPlaceholder: false,
              column: {
                columnDef: { header: 'ID' },
                getIsPinned: jest.fn(() => false),
              },
              getContext: jest.fn(),
            },
            {
              id: 'contentId',
              isPlaceholder: false,
              column: {
                columnDef: { header: 'ContentID' },
                getIsPinned: jest.fn(() => false),
              },
              getContext: jest.fn(),
            },
          ],
        },
      ]),
      getFooterGroups: jest.fn(() => []),
      getRowModel: jest.fn(() => ({
        rows: mockData.map((row) => ({
          id: row.id,
          getVisibleCells: jest.fn(() => [
            {
              column: {
                columnDef: { cell: () => row.id },
                getIsPinned: jest.fn(() => false),
              },
              getContext: jest.fn(),
            },
            {
              column: {
                columnDef: { cell: () => row.contentId },
                getIsPinned: jest.fn(() => false),
              },
              getContext: jest.fn(),
            },
          ]),
        })),
      })),
      getSelectedRowModel: jest.fn(() => ({ rows: [] })),
      getFilteredRowModel: jest.fn(() => ({ rows: [] })),
    };

    (useReactTable as jest.Mock).mockReturnValue(tableMock);
  });

  it('Should render the table', () => {
    render(<ReactTable columns={mockColumns} data={mockData} />);

    expect(screen.getByTestId('react-table')).toBeInTheDocument();
  });

  it('renders table with correct headers and data', () => {
    render(<ReactTable columns={mockColumns} data={mockData} />);

    expect(screen.getByText('ContentID')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
  });
});
