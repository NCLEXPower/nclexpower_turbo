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

describe("CreateCategoryBlock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      expect(rows.length).toBe(7);
    });

    const categoryTypeChip = screen.getByText("PRICING");
    expect(categoryTypeChip).toBeInTheDocument();
  });
});