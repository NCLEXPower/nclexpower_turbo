/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen } from "../../../../../../common";
import { useForm } from "react-hook-form";
import { CreateVideo } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
  Controller: jest.fn(({ defaultValue, render }) =>
    render({
      field: {
        onChange: jest.fn(),
        value: defaultValue,
        onBlur: jest.fn(),
        ref: null,
      },
      fieldState: { error: undefined },
    })
  ),
}));

describe("CreateVideo Component", () => {
  const mockOnSubmit = jest.fn();
  let mockUseFormReturn: any;

  beforeEach(() => {
    mockUseFormReturn = {
      register: jest.fn(),
      handleSubmit: jest.fn((callback) => (e: any) => {
        e.preventDefault();
        callback(mockUseFormReturn.getValues());
      }),
      control: {},
      setValue: jest.fn(),
      getValues: jest.fn(() => ({
        title: "",
        video: null,
      })),
      formState: { errors: {} },
      watch: jest.fn(),
    };

    (useForm as jest.Mock).mockReturnValue(mockUseFormReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with initial state", () => {
    render(<CreateVideo onSubmit={mockOnSubmit} section="Test Section" />);

    expect(screen.getByText("Create Test Section item")).toBeInTheDocument();
    expect(screen.getByText("Upload Video")).toBeInTheDocument();
  });

  it("displays placeholder images when no files are uploaded", () => {
    render(<CreateVideo onSubmit={mockOnSubmit} section="Test Section" />);
    const placeholderImage = screen.getByTestId("placeholder");
    expect(placeholderImage).toBeInTheDocument();
  });
});
