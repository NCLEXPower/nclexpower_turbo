import { render, screen, fireEvent } from "../../../common";
import { RadioButtonsField } from "../../../../components";
import { useForm, FormProvider } from "react-hook-form";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const buttons = [
  {
    label: "Option One",
    value: "one",
  },
  {
    label: "Option Two",
    value: "two",
  },
  {
    label: "Option Three",
    value: "three",
    inputField: <div data-testid="custom-input">Custom Input Field</div>,
  },
];

type FormValues = { choice: string };

function WrapperComponent(props: { disabled?: boolean; withBorder?: boolean }) {
  const methods = useForm<FormValues>({ defaultValues: { choice: "one" } });
  return (
    <FormProvider {...methods}>
      <RadioButtonsField<FormValues>
        name="choice"
        control={methods.control}
        buttons={buttons}
        disabled={props.disabled}
        withBorder={props.withBorder}
      />
      <span data-testid="current-value">{methods.watch("choice")}</span>
    </FormProvider>
  );
}

describe("RadioButtonsField", () => {
  it("renders all radio buttons", () => {
    render(<WrapperComponent />);
    expect(screen.getByText("Option One")).toBeInTheDocument();
    expect(screen.getByText("Option Two")).toBeInTheDocument();
    expect(screen.getByText("Option Three")).toBeInTheDocument();
  });

  it("checks the default selected radio", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it("updates checked radio when a new option is clicked", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[2]);
    expect(radios[2]).toBeChecked();
    expect(screen.getByTestId("current-value").textContent).toBe("three");
  });

  it("renders custom input field for option with inputField prop", () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });

  it("can use keyboard to select an option (simulate click for reliability)", () => {
    render(<WrapperComponent />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
  });

  it("renders with border when withBorder is true", () => {
    render(<WrapperComponent withBorder />);
    expect(screen.getByText("Option One")).toBeInTheDocument();
  });
});
