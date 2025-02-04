import { render, screen } from "../../../../../../common";
import { EditDocumentBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentBlock";
import { useAtom } from "jotai";

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
});
