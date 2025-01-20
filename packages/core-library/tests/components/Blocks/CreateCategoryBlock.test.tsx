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

jest.mock('@mui/x-data-grid', () => ({
  ...jest.requireActual('@mui/x-data-grid'),
}));

describe("CreateCategoryBlock", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category block", async () => {
    render(<CreateCategoryBlock />);

    const categoryBlock = screen.getByTestId('category-block')
    expect(categoryBlock).toBeInTheDocument()
  });

});