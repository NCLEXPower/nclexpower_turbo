import { fireEvent, render, screen } from "@testing-library/react";
import { ControlledSelectField, SelectField } from "../../../components";
import { useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("SelectField", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  it("renders label and options correctly", () => {
    render(<SelectField label="Select Option" options={options} />);

    expect(screen.getByLabelText("Select Option")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("combobox"));

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders options and handles selection", () => {
    const handleChange = jest.fn();
    render(
      <SelectField
        label="Select Option"
        options={options}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.mouseDown(input);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Option 1"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onChange handler when an option is selected", () => {
    const handleChange = jest.fn();
    render(
      <SelectField
        label="Select an option"
        options={options}
        onChange={handleChange}
        value=""
      />
    );

    const selectField = screen.getByLabelText("Select an option");
    fireEvent.mouseDown(selectField);
    fireEvent.click(screen.getByText("Option 1"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("1");
  });
});

describe("ControlledSelectField Component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const TestControlledComponent = ({
    defaultValue = "",
    onSubmit,
    parentOnChange,
  }: {
    defaultValue?: string;
    onSubmit: (data: { select: string }) => void;
    parentOnChange?: jest.Mock;
  }) => {
    const { control, handleSubmit } = useForm({
      defaultValues: { select: defaultValue },
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledSelectField
          control={control}
          name="select"
          label="Controlled Select"
          options={options}
          onChange={parentOnChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  it("renders controlled select field with default value", () => {
    render(<TestControlledComponent defaultValue="2" onSubmit={jest.fn()} />);

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveTextContent("Option 2");
  });
});
