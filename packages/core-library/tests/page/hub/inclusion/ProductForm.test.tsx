import { screen, render, fireEvent } from "../../../common";
import { ProductForm } from "../../../../system/app/internal/blocks/Hub/Product/products/ProductForm";

jest.mock("../../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({
    publicRuntimeConfig: { processEnv: {} },
  }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockOnSubmit = jest.fn();

describe('ProductForm', () => {
  it("should render the product form successfully", () => {
    render(
      <ProductForm onSubmit={mockOnSubmit} />
    );
  });

  it('displays validation errors when form fields are empty', async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText(/Create/i));

    expect(await screen.findAllByText(/required/i)).toHaveLength(1);
  });

});
