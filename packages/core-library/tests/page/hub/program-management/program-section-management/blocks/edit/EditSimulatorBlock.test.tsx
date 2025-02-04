import { render, screen } from "@testing-library/react";
import { EditSimulatorBlock } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditSimulator/EditSimulatorBlock";
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
    })),
  }));

jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn()
}));

jest.mock("../../../../../../../components", () => ({
  ComponentLoader: () => <div>Loading...</div>,
}));

jest.mock("../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditSimulator/EditSimulatorField", () => ({
  EditSimulatorField: jest.fn(() => <div>Edit Simulator Field</div>),
}));

describe("EditSimulatorBlock", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {

    mockOnSubmit.mockClear();
    (useAtom as jest.Mock).mockReturnValue([1]);
  });

  it("renders loading component when contentLoader is true", () => {
    render(<EditSimulatorBlock contentLoader={true} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders EditSimulatorField when contentLoader is false", () => {
    render(<EditSimulatorBlock contentLoader={false} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Edit Simulator Field")).toBeInTheDocument();
  });
});
