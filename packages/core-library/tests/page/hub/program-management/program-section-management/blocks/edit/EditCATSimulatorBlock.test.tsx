import { render, screen } from "@testing-library/react";
import { EditCATSimulatorBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditCATSimulator/EditCATSimulatorBlock";
import { useAtom } from "jotai";

jest.mock("../../../../../../../config", () => ({
    config: { value: jest.fn() },
  }));
  
  jest.mock("../../../../../../../core/router", () => ({
    useRouter: jest.fn(),
  }));

  jest.mock("../../../../../../../contexts", () => ({
    useBusinessQueryContext: jest.fn(() => ({
      businessQueryGetRegularQuestionDDCategory: jest.fn(() => ({
        data: [],
      })),
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
  atom: jest.fn()
}));

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: () => <div>Loading...</div>,
}));

jest.mock("../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditCATSimulator/EditCATSimulatorField", () => ({
    EditCATSimulatorField: jest.fn(() => <div>Edit CAT Simulator Field</div>),
}));

describe("EditCATSimulatorBlock", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {

    mockOnSubmit.mockClear();
    (useAtom as jest.Mock).mockReturnValue([1]);
  });

  it("renders loading component when contentLoader is true", () => {
    render(<EditCATSimulatorBlock contentLoader={true} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders EditSimulatorField when contentLoader is false", () => {
    render(<EditCATSimulatorBlock contentLoader={false} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Edit CAT Simulator Field")).toBeInTheDocument();
  });
});
