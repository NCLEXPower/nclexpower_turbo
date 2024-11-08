import { fireEvent, render, screen } from "../../common";
import { MultipleSelectField, SelectOption } from "../../../components";
import { useForm } from "react-hook-form";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const options: SelectOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

type SelectWithFormProps = {
  value?: string[];
  onChange?: () => void;
};
const SelectWithForm: React.FC<SelectWithFormProps> = ({ value = [] }) => {
  const { control } = useForm({
    defaultValues: { myField: value },
  });

  return (
    <MultipleSelectField
      name="myField"
      control={control}
      label="My Field"
      options={options}
      multiple
      data-testid="myField-field"
    />
  );
};

describe("MultipleSelectField Component", () => {
  it("renders the MultipleSelectField component", () => {
    const { getByTestId } = render(<SelectWithForm />);
    expect(getByTestId("myField-field")).toBeInTheDocument();
  });

  it("updates value when multiple options are selected", () => {
    const { getByLabelText, getByText, getAllByText } = render(
      <SelectWithForm />
    );

    fireEvent.mouseDown(getByLabelText("My Field"));

    fireEvent.click(getByText("Option 1"));
    fireEvent.click(getByText("Option 2"));

    const option1Elements = getAllByText("Option 1");
    const option2Elements = getAllByText("Option 2");

    expect(option1Elements.length).toBeGreaterThan(0);
    expect(option2Elements.length).toBeGreaterThan(0);
  });

  it("renders chips correctly and stops propagation", () => {
    const handleDelete = jest.fn();
    const stopPropagation = jest.fn();

    render(
      <Chip
        label="Test Chip"
        onDelete={(event) => {
          stopPropagation();
          handleDelete("testValue", event);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        deleteIcon={<CancelIcon aria-label="delete" />}
      />
    );

    const deleteIcon = screen.getByLabelText("delete");

    fireEvent.click(deleteIcon);

    expect(stopPropagation).toHaveBeenCalled();
    expect(handleDelete).toHaveBeenCalledWith("testValue", expect.any(Object));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("removes data when delete icon is clicked", () => {
    const onChange = jest.fn();

    const { getByText, queryByText } = render(
      <SelectWithForm value={["option1"]} onChange={onChange} />
    );

    expect(getByText("Option 1")).toBeInTheDocument();

    const deleteIcon = getByText("Option 1")
      .closest("div")
      ?.querySelector('[aria-label="delete"]');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon!);

    expect(queryByText("Option 1")).not.toBeInTheDocument();
  });
});
