import { render, screen } from "../../../../../../common";
import { EditDocumentBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentBlock";
import { useAtom } from "jotai";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../contexts", () => ({
  useBusinessQueryContext: jest.fn(() => ({
    businessQueryGetSectionsByType: jest.fn(() => ({
      data: [
        {
          sectionId: "123",
          sectionType: "simulator",
          sectionTitle: "Sample Section",
          sectionData: [
            {
              sectionDataId: "456",
              title: "Simulator Section",
              contentArea: "Sample Content",
              guided: "true",
              unguided: "false",
              practice: "true",
            },
          ],
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
  })),
}));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: () => <div>Loading...</div>,
}));

jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: () => ({}),
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
