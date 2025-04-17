import { fireEvent, screen, waitFor } from "../../common";
import { render } from "@testing-library/react";
import { CreateCategoryBlock } from "./../../../system/app/internal/blocks/Hub/Category/CreateCategory/CreateCategoryBlock";
import { useBusinessQueryContext, useDialogContext } from "../../../contexts";

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(),
  useDialogContext: jest.fn(),
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

describe("CreateCategoryBlock", () => {
  const mockRefetch = jest.fn();
  const mockMutateAsync = jest.fn();
  const mockOpenDialog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useBusinessQueryContext as jest.Mock).mockReturnValue({
      businessQuerySelectAllCategories: jest.fn().mockReturnValue({
        data: [
          { id: "1", categoryName: "Test Category", categoryDescription: "Description for Test Category", categoryType: 0 },
          { id: "2", categoryName: "Test Category 2", categoryDescription: "Description for Test Category 2", categoryType: 2 },
          { id: "3", categoryName: "Test Category 3", categoryDescription: "Description for Test Category 3", categoryType: 3 },
          { id: "4", categoryName: "Test Category 4", categoryDescription: "Description for Test Category 4", categoryType: 4 },
          { id: "5", categoryName: "Test Category 5", categoryDescription: "Description for Test Category 5", categoryType: 5 },
          { id: "6", categoryName: "Test Category 6", categoryDescription: "Description for Test Category 6", categoryType: -1 },
        ],
        isLoading: false,
        refetch: mockRefetch,
      }),
      businessQueryDeleteCategory: jest.fn().mockReturnValue({ mutateAsync: mockMutateAsync }),
    });

    (useDialogContext as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
    });
  });

  it("should render the category block", async () => {
    render(<CreateCategoryBlock />);

    const categoryBlock = screen.getByTestId("category-block");
    expect(categoryBlock).toBeInTheDocument();
  });

  it("should render rows with category names, descriptions, and types", async () => {
    render(<CreateCategoryBlock />);

    const categoryTypes = [
      "PRICING",
      "REPORT ISSUE",
      "CLIENT NEEDS",
      "CONTENT AREA",
      "COGNITIVE LEVEL",
      "CONTACT CONCERN",
    ];

    const firstRowCategoryName = screen.getByTestId("cell-1-categoryName");
    expect(firstRowCategoryName).toHaveTextContent("Test Category");

    const firstRowCategoryDescription = screen.getByTestId("cell-1-categoryDescription");
    expect(firstRowCategoryDescription).toHaveTextContent("Description for Test Category");

    const firstRowCategoryType = screen.getByTestId("cell-1-categoryType");
    expect(firstRowCategoryType).toHaveTextContent(categoryTypes[0]); 
  });

  it("should call openDialog when the Create button is clicked", async () => {
    render(<CreateCategoryBlock />);

    const createButton = screen.getByRole("button", { name: /create/i });
    fireEvent.click(createButton);

    expect(mockOpenDialog).toHaveBeenCalledWith("category_form", "Category Form");
  });

  it("should call mutateAsync and refetch when Delete is clicked", async () => {
    render(<CreateCategoryBlock />);

    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith("1");
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});