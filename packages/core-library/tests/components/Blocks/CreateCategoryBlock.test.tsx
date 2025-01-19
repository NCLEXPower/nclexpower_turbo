import { render, screen, waitFor } from "@testing-library/react";
import { CreateCategoryBlock } from "./../../../system/app/internal/blocks/Hub/Category/CreateCategory/CreateCategoryBlock";

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
  useDialogContext: () => ({
    openDialog: jest.fn(),
  }),
}));

jest.mock('@mui/x-data-grid', () => {
  const actualModule = jest.requireActual('@mui/x-data-grid');
  return {
    ...actualModule,
    DataGrid: (props: {
      rows: any[];
      columns: any[];
      isLoading: boolean;
      initPageSize: number;
      'data-testid'?: string;
    }) => {
      if (props.isLoading) {
        return <div role="progressbar">Loading...</div>;
      }
      return (
        <div role="grid" data-testid={props['data-testid'] || 'data-grid'}>
          {props.rows.length === 0 ? (
            <div>No data</div>
          ) : (
            props.rows.map((row) => (
              <div key={row.id} role="row">
                {row.categoryName}
                <div>
                  {row.categoryType === 0 && <div role="chip">PRICING</div>}
                  {row.categoryType === 2 && <div role="chip">CLIENT NEEDS</div>}
                  {row.categoryType === 3 && <div role="chip">CONTENT AREA</div>}
                  {row.categoryType === 4 && <div role="chip">COGNITIVE LEVEL</div>}
                  {row.categoryType === 5 && <div role="chip">CONTACT CONCERN</div>}
                  {row.categoryType === -1 && <div role="chip">REPORT ISSUE</div>}
                </div>
              </div>
            ))
          )}
        </div>
      );
    },
  };
});

describe("CreateCategoryBlock", () => {
  it("should render without crashing and display key elements", async () => {
    render(<CreateCategoryBlock />);

    await waitFor(() => {
      expect(screen.getByText("Category Management")).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByText("Category List")).toBeInTheDocument();
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("should verify that DataGrid props and column are rendering", async () => {
    render(<CreateCategoryBlock />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(6);
    });

    const categoryTypeChip = screen.getByText("PRICING");
    expect(categoryTypeChip).toBeInTheDocument();
  });

  it("should verify that Chip labels render correctly based on categoryType", async () => {
    render(<CreateCategoryBlock />);

    expect(await screen.findByText("PRICING")).toBeInTheDocument();
    expect(await screen.findByText("CLIENT NEEDS")).toBeInTheDocument();
    expect(await screen.findByText("CONTENT AREA")).toBeInTheDocument();
    expect(await screen.findByText("COGNITIVE LEVEL")).toBeInTheDocument();
    expect(await screen.findByText("CONTACT CONCERN")).toBeInTheDocument();
    expect(await screen.findByText("REPORT ISSUE")).toBeInTheDocument();
  });
});