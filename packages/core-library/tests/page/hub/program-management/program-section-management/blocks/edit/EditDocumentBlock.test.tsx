import { render, screen, fireEvent, waitFor, renderHook, act } from "../../../../../../common";
import { EditDocumentBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentBlock";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { EditDocumentField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentField";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: () => <div>Loading...</div>,
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentField",
  () => ({
    EditDocumentField: jest.fn(() => <div>Edit Document Field</div>),
  })
);

describe("EditDocumentBlock", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    (useAtom as jest.Mock).mockReturnValue([1]);
  });

  it("renders loading component when contentLoader is true", () => {
    render(<EditDocumentBlock contentLoader={true} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders EditDocumentField when contentLoader is false", () => {
    render(<EditDocumentBlock contentLoader={false} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Edit Document Field")).toBeInTheDocument();
  });

  it("calls onSubmit with the correct values", async () => {
    const { getByText } = render(
      <EditDocumentBlock contentLoader={false} onSubmit={mockOnSubmit} />
    );

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("sets default values correctly", () => {
    const defaultValues = { title: "Test Title", link: [] };
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => fn,
      watch: () => defaultValues,
      setValue: jest.fn(),
    });

    render(
      <EditDocumentBlock contentLoader={false} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
  });

  it("normalizes link value correctly", () => {
    const { result } = renderHook(() => useForm());
    const { setValue } = result.current;

    act(() => {
      setValue("link", ["link1", "link2"]);
    });

    expect(result.current.watch("link")).toEqual(["link2"]);
  });

  it("renders EditDocumentField with correct props", () => {
    const { getByText } = render(
      <EditDocumentBlock
        contentLoader={false}
        onSubmit={mockOnSubmit}
        isLoading={true}
        section="test-section"
      />
    );

    expect(screen.getByText("Edit Document Field")).toBeInTheDocument();
    expect(EditDocumentField).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: true,
        section: "test-section",
      }),
      {}
    );
  });
});
