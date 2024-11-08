import { render, screen } from "../../common";
import { CountrySelectField } from "../../../components/forms/CountrySelectField";
import { FormProvider, useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-country-flag", () => (props: any) => (
  <img {...props} alt={props.title} />
));
jest.mock("../../../components", () => ({
  InputLoader: () => <div data-testid="input-loader">Loading...</div>,
}));

const CountrySelectFieldTestForm = ({ isLoading, defaultValues }: any) => {
  const methods = useForm<{ country: string }>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <CountrySelectField
        name="country"
        control={methods.control}
        isLoading={isLoading}
        label="Country"
        displayEmpty
      />
    </FormProvider>
  );
};

describe("CountrySelectField", () => {
  const setup = (defaultValues = { country: "" }, isLoading = false) => {
    return render(
      <CountrySelectFieldTestForm
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
    );
  };

  it("renders the CountrySelectField component", () => {
    setup();

    expect(screen.getByText("Country")).toBeInTheDocument();
  });

  it("displays the InputLoader when isLoading is true", () => {
    setup({ country: "" }, true);

    expect(screen.getByTestId("input-loader")).toBeInTheDocument();
  });
});
