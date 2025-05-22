import { render, screen, fireEvent } from "../../../common";
import { ProductRadioSelectionField } from "../../../../components";
import { useForm, FormProvider } from "react-hook-form";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const options = [
  {
    option: { productValue: "100", productType: 0 },
    value: 0,
    bgColor: "bg-blue-100",
    formattedPrice: "$100",
  },
  {
    option: { productValue: "200", productType: 1 },
    value: 1,
    bgColor: "bg-green-100",
    formattedPrice: "$200",
  },
];

type FormValues = { selection: number };

function WrapperComponent({ disabled = false }: { disabled?: boolean }) {
  const methods = useForm<FormValues>({ defaultValues: { selection: 0 } });
  return (
    <FormProvider {...methods}>
      <ProductRadioSelectionField<FormValues>
        name="selection"
        control={methods.control}
        options={options}
        bgColor="bg-blue-100"
        formattedPrice="$100"
        disabled={disabled}
      />
      <span data-testid="current-value">{methods.watch("selection")}</span>
    </FormProvider>
  );
}

describe("ProductRadioSelectionField", () => {
  it("renders all radio options", () => {
    render(<WrapperComponent />);
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Fast Track")).toBeInTheDocument();
    expect(screen.getAllByText("$100")).toHaveLength(2);
  });

  it("checks the default radio option", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
  });

  it("updates checked radio when a new option is clicked", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it("disables all radio options when disabled prop is true", () => {
    render(<WrapperComponent disabled />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeDisabled();
    expect(radios[1]).toBeDisabled();
  });

  it("sets correct aria attributes", () => {
    render(<WrapperComponent />);
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toHaveAttribute("aria-labelledby");
  });

  it("updates form value when a radio is selected", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(screen.getByTestId("current-value").textContent).toBe("1");
  });
});
