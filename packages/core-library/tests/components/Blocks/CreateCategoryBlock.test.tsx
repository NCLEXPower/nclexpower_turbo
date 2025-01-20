import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CreateCategoryBlock } from "./../../../system/app/internal/blocks/Hub/Category/CreateCategory/CreateCategoryBlock";
import { useDialogContext } from '../../../contexts';

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: () => ({
    businessQuerySelectAllCategories: jest.fn().mockReturnValue({
      data: [
        { id: "1", categoryName: "Test Category", categoryType: 0 },
        { id: "2", categoryName: "Test Category 2", categoryType: 2 },
        { id: "3", categoryName: "Test Category 3", categoryType: 3 },
        { id: "4", categoryName: "Test Category 4", categoryType: 4 },
        { id: "5", categoryName: "Test Category 5", categoryType: 5 },
        { id: "6", categoryName: "Test Category 6", categoryType: -1 },
      ],
      isLoading: false,
      refetch: jest.fn(),
    }),
    businessQueryDeleteCategory: jest.fn().mockReturnValue({ mutateAsync: jest.fn() }),
  }),
  useDialogContext: jest.fn(() => ({
    openDialog: jest.fn()
  }))
}));

jest.mock("@mui/x-data-grid", () => {
  const actualModule = jest.requireActual("@mui/x-data-grid");
  return {
    ...actualModule,
    DataGrid: (props: {
      rows: any[];
      columns: any[];
      isLoading: boolean;
      initPageSize: number;
    }) => {
      return (
        <div role="grid" data-testid="data-grid">
          {props.rows.map((row) => (
            <div key={row.id} role="row" data-rowid={row.id}>
              {props.columns.map((col) => (
                <div
                  key={col.field}
                  role="cell"
                  data-colid={col.field}
                  data-testid={`cell-${row.id}-${col.field}`}
                >
                  {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  };
});

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
  });
});

describe("CreateCategoryBlock", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category block", async () => {
    render(<CreateCategoryBlock />);

    const categoryBlock = screen.getByTestId('category-block')
    expect(categoryBlock).toBeInTheDocument()
  });

  it("should render rows with category names and types", async () => {
    render(<CreateCategoryBlock />);

    const firstRowCategoryName = screen.getByTestId("cell-1-categoryName");
    expect(firstRowCategoryName).toHaveTextContent("Test Category");

    const firstRowCategoryType = screen.getByTestId("cell-1-categoryType");
    expect(firstRowCategoryType).toHaveTextContent("PRICING");
  });

});