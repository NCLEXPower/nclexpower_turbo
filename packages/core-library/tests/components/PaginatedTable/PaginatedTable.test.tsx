import { Column } from "react-table";
import { PaginatedTable } from "../../../components/table";
import { useResolution } from "../../../hooks";
import { render, screen } from "../../common";
import { formatDate } from "../../../core";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useResolution: jest.fn(),
  useApiCallback: jest.fn().mockReturnValue({
    loading: false,
    result: { data: {} },
    error: undefined,
  }),
  useApi: jest.fn().mockReturnValue({
    loading: false,
    result: { data: {} },
    error: undefined,
  }),
  useSessionStorage: jest
    .fn()
    .mockImplementation(() => [undefined, jest.fn(), jest.fn()]),
}));

type DataMockType = {
  name: string;
  dateReceived: string;
  type: string;
  status: string;
  id: number;
};

const mockColumns = [
  {
    Header: "test",
    accessor: "name",
    Filter: (props) => (
      <input
        value={props.column.filterValue || ""}
        onChange={(e) => props.column.setFilter(e.target.value)}
      />
    ),
    filter: "contains",
    minWidth: 250,
    width: 350,
    maxWidth: 500,
  },
  {
    id: "dateReceived",
    Header: "date received",
    accessor: (row) => formatDate(row.dateReceived, "yyyy-MM-dd HH:mm:ss.SSS"),
    Filter: (props) => (
      <input
        value={props.column.filterValue || ""}
        onChange={(e) => props.column.setFilter(e.target.value)}
      />
    ),
    filter: "dateBetween",
  },
  {
    Header: "Type",
    accessor: "type",
    Filter: (props) => (
      <select
        value={props.column.filterValue || ""}
        onChange={(e) => props.column.setFilter(e.target.value)}
      >
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
      </select>
    ),
    filter: "equals",
  },
  { Header: "Status", accessor: "status", filter: "equals" },
  { Header: "id", accessor: "id" },
] as Column<DataMockType>[];

const mockData: DataMockType[] = [
  {
    name: "John Doe",
    dateReceived: "2024-01-01T12:00:00.000Z",
    type: "type1",
    status: "active",
    id: 1,
  },
  {
    name: "Jane Smith",
    dateReceived: "2024-01-02T12:00:00.000Z",
    type: "type2",
    status: "inactive",
    id: 2,
  },
  {
    name: "Sam Brown",
    dateReceived: "2024-01-03T12:00:00.000Z",
    type: "type1",
    status: "active",
    id: 3,
  },
];

describe("Paginated Table", () => {
  it("should render the PaginatedTable in web view", () => {
    (useResolution as jest.Mock).mockReturnValue({ isMobile: false });

    const { getByTestId } = render(
      <PaginatedTable
        columns={[]}
        data={[]}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["name"],
          menuFilters: ["dateReceived", "type"],
        }}
      />
    );

    expect(getByTestId("web-table-id")).toBeInTheDocument();
  });

  it("should display No data found when the data is null", () => {
    const { getByText } = render(
      <PaginatedTable
        columns={[]}
        data={[]}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["name"],
          menuFilters: ["dateReceived", "type"],
        }}
      />
    );

    expect(getByText("No data found")).toBeInTheDocument();
  });

  it("should not display No data found when the data is null", () => {
    const { queryByText } = render(
      <PaginatedTable
        columns={mockColumns}
        data={mockData}
        noDataText="No data found"
        noDataFoundText="No data found"
        mobileFiltersConfig={{
          alwaysOnFilters: ["name"],
          menuFilters: ["dateReceived", "type"],
        }}
      />
    );

    expect(queryByText("No data found")).not.toBeInTheDocument();
  });
});
