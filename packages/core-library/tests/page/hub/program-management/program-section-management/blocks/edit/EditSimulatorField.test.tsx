/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../../../common";
import { Control } from "react-hook-form";
import { EditSimulatorField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditSimulator/EditSimulatorField";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  TextField: jest.fn(),
  GenericSelectField: jest.fn(),
  ControlledCheckbox: jest.fn(),
  Button: jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
}));

const mockControl = {} as Control<{
  title: string;
  contentArea: string;
  guided: boolean;
  unguided: boolean;
  practice: boolean;
}>;

const mockHandleChange = jest.fn();
const mockOnSave = jest.fn();

describe("EditSimulatorField", () => {
  it("renders the component", () => {
    render(
      <EditSimulatorField
        lists={[]}
        section="Test Section"
        control={mockControl}
        handleChange={mockHandleChange}
        onSave={mockOnSave}
        isLoading={false}
      />
    );

    expect(screen.getByText("Edit Test Section item")).toBeInTheDocument();
    expect(screen.getByText("Title*:")).toBeInTheDocument();
    expect(screen.getByText("Guided*")).toBeInTheDocument();
    expect(screen.getByText("Unguided*")).toBeInTheDocument();
    expect(screen.getByText("Practice*")).toBeInTheDocument();
    expect(screen.getByText("Content Area Coverage* :")).toBeInTheDocument();
  });

  it("calls onSave when the update button is clicked", () => {
    render(
      <EditSimulatorField
        lists={[]}
        section="Test Section"
        control={mockControl}
        handleChange={mockHandleChange}
        onSave={mockOnSave}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByTestId("edit-simulator-save-button"));

    expect(mockOnSave).toHaveBeenCalled();
  });

});
