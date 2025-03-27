/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
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

  it("resets form after submission", async () => {
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

    expect(screen.getByPlaceholderText(/Enter title/i)).toHaveValue("");
  });

  it("renders ComponentLoader when contentLoader is true", () => {
    render(<CreateVideo onSubmit={mockOnSubmit} contentLoader={true} />);
    expect(screen.getByTestId("component-loader")).toBeInTheDocument();
  });

  it("renders ReactPlayer with correct video URL", async () => {
    mockUseFormReturn.getValues = jest.fn(() => ({
      link: [new File([""], "test-video.mp4", { type: "video/mp4" })],
    }));

    render(<CreateVideo onSubmit={mockOnSubmit} />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-react-player")).toBeInTheDocument();
    });
  });

  it("calls handleFileChange when uploading video file", async () => {
    render(<CreateVideo onSubmit={mockOnSubmit} />);
    const file = new File([""], "test-video.mp4", { type: "video/mp4" });

    const uploadButton = screen.getByLabelText("Upload Video");
    fireEvent.change(uploadButton, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith("link", [file], { shouldValidate: true });
    });
  });

});
