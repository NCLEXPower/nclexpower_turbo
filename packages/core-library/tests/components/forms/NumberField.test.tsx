import { render, screen } from "../../common";
import { useForm } from "react-hook-form";
import { NumberField } from "../../../components/forms/NumberField";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const MockForm = ({ onSubmit }: any) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { floatValue: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberField name="floatValue" control={control} label="Number Field" />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("NumberFieldComponent", () => {
  it("renders the input field with the correct label", () => {
    render(<MockForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Number Field")).toBeInTheDocument();
  });
});
