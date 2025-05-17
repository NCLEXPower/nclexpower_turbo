import { render, screen, waitFor } from "../../common";
import { IssueTrackingManagementBlock } from "../../../system/app/internal/blocks";

const openMock = jest.fn();

jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));

jest.mock("../../../hooks", () => ({
  useApi: jest.fn(() => ({
    result: {
      data: [
        {
          id: "1",
          refNo: "REF123",
          message: "System not working",
          createdAt: "2024-01-01T00:00:00Z",
          status: 1,
          email: "test@example.com",
        },
      ],
    },
    loading: false,
  })),
  useColumns: jest.fn(({ columns }) => ({ columns })),
  useModal: jest.fn(() => ({
    open: openMock,
    close: jest.fn(),
    props: {
      isOpen: false,
      context: null,
    },
  })),
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
  formatDate: jest.fn((date: Date) => "January 1, 2024"),
}));

jest.mock("../../../components", () => {
  const actual = jest.requireActual("../../../components");

  return {
    ...actual,
    DataGrid: jest.fn(
      ({ rows, columns, isLoading, "data-testid": dataTestId }) => (
        <div data-testid={dataTestId || "data-grid"}>
          {isLoading ? (
            <div>Loading...</div>
          ) : rows.length === 0 ? (
            <div>No data</div>
          ) : (
            <div>
              {rows.map((row: any, index: number) => (
                <div key={row.id} data-testid={`row-${index}`}>
                  {columns.map((col: any) => {
                    const value = row[col.field];
                    return (
                      <div key={col.field}>
                        {col.renderCell
                          ? col.renderCell({ row, value })
                          : String(value)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    ),
  };
});

beforeEach(() => {
  openMock.mockClear();
});

describe("IssueTrackingManagementBlock", () => {
  it("renders correctly and shows loaded issues", async () => {
    render(<IssueTrackingManagementBlock />);

    await waitFor(() => {
      expect(screen.getByText("REF123")).toBeInTheDocument();
      expect(screen.getByText("System not working")).toBeInTheDocument();
      expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
    });

    expect(screen.getByText("Total: 1 Concerns")).toBeInTheDocument();
  });

  it("opens the modal when reference cell is clicked", async () => {
    render(<IssueTrackingManagementBlock />);

    const refCell = await screen.findByTestId("reference-cell-REF123");
    refCell.click();

    expect(openMock).toHaveBeenCalledWith({
      id: "1",
      reference: "REF123",
      description: "System not working",
      dateCreated: "2024-01-01T00:00:00Z",
      status: 1,
      email: "test@example.com",
    });
  });
});
