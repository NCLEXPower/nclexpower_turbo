import { render, screen, waitFor, fireEvent } from "../../../../../../common";
import { useForm } from "react-hook-form";
import { CreateVideo } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";
import { Suspense } from "react";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-player", () => () => <div data-testid="mock-react-player" />);

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

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => {
    return <img {...props} />;
  },
}));

describe("CreateVideo Component", () => {
  const mockOnSubmit = jest.fn();
  let mockUseFormReturn: any;
  const mockSetValue = jest.fn();

  beforeEach(() => {
    mockUseFormReturn = {
      register: jest.fn(),
      handleSubmit: jest.fn((callback) => (e: any) => {
        e.preventDefault();
        callback(mockUseFormReturn.getValues());
      }),
      control: {},
      setValue: mockSetValue,
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

  it("renders the component with initial state", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <CreateVideo onSubmit={mockOnSubmit} section="Test Section" />
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByText("Create Test Section item")).toBeInTheDocument();
    });

    expect(screen.getByText("Upload Video")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<CreateVideo onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter title/i), {
      target: { value: "Test Video" },
    });

    const createVideoButton =
      screen.queryByTestId("create-video") ||
      screen.queryByRole("button", { name: /create/i });

    if (!createVideoButton) {
      throw new Error("Create video button not found.");
    }

    fireEvent.click(createVideoButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
