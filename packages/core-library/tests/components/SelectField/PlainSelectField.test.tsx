import { fireEvent, render, screen } from "../../common";
import { PlainSelectFieldProps } from "../../../components";
import { PlainSelectField } from "../../../components/Textfield/SelectField/PlainSelectField";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("SelectComponent", () => {
  const mockOptions = [
    { label: "option 1", value: true },
    { label: "option 2", value: true },
    { label: "option 3", value: false },
  ];

  it("renders without crashing", () => {
    render(<PlainSelectField options={mockOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders options", () => {
    render(<PlainSelectField options={mockOptions} />);
    expect(screen.getByText("option 1")).toBeInTheDocument();
    expect(screen.getByText("option 2")).toBeInTheDocument();
  });
});
