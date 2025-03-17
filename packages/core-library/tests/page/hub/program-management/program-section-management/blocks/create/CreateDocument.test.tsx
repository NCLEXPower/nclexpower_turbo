import { render, fireEvent, waitFor } from "../../../../../../common";
import { CreateDocument } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFileUpload } from "../../../../../../../hooks";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: jest.fn(),
}));

jest.mock("../../../../../../../hooks", () => ({
  useFileUpload: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
    TextField: ({ name, placeholder }: { name: string; placeholder: string }) => (
        <input data-testid={`text-field-${name}`} placeholder={placeholder} />
      ),
  ComponentLoader: jest.fn(() => <div>Loading...</div>),
}));

jest.mock("../../../../../../common", () => {
  const testingLibrary = jest.requireActual("@testing-library/react");

  return {
    render: jest.fn((ui) => {
      return testingLibrary.render(ui);
    }),
    screen: testingLibrary.screen,
    fireEvent: testingLibrary.fireEvent,
    waitFor: testingLibrary.waitFor,
  };
});

describe("CreateDocument", () => {
  const mockUseForm = useForm as jest.Mock;
  const mockYupResolver = yupResolver as jest.Mock;
  const mockUseFileUpload = useFileUpload as jest.Mock;
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockUseForm.mockReturnValue({
      control: {},
      handleSubmit: (fn: Function) => fn,
      watch: jest.fn(),
      setValue: jest.fn(),
      reset: jest.fn(),
    });
    mockYupResolver.mockReturnValue({});
    mockUseFileUpload.mockReturnValue({
      handleFileChange: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when contentLoader is true", () => {
    const { getByText } = render(
      <CreateDocument
        section="test"
        contentLoader={true}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
