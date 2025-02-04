/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { render, screen, fireEvent, waitFor } from "../../../../../../common";
import { CreateCATSimulator } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";
import { useForm } from "react-hook-form";
import { useSelectfieldOptions } from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions",
  () => ({
    useSelectfieldOptions: jest.fn(),
  })
);

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  TextField: ({ name, placeholder }: { name: string; placeholder: string }) => (
    <input data-testid={`text-field-${name}`} placeholder={placeholder} />
  ),
  ComponentLoader: () => <div data-testid="component-loader" />,
  GenericSelectField: ({
    name,
    onChange,
    value,
  }: {
    name: string;
    onChange: (e: string) => void;
    value: string;
  }) => (
    <select
      data-testid={`select-field-${name}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select an option</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </select>
  ),
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
  EvaIcon: () => <span data-testid="eva-icon" />,
}));

describe("CreateCATSimulator", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (cb: any) => (e: React.SyntheticEvent) => {
        e.preventDefault();
        cb();
      },
      setValue: jest.fn(),
    });

    (useSelectfieldOptions as jest.Mock).mockReturnValue({
      cleanedContentArea: ["Option 1", "Option 2"],
    });
  });

  it("should render the component correctly", () => {
    render(<CreateCATSimulator section="CAT" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Create CAT item")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByText("Content Area Coverage*:")).toBeInTheDocument();
    expect(screen.getByText("Add New")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should call onSubmit when the Create button is clicked", async () => {
    render(<CreateCATSimulator section="CAT" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("should add a new content area coverage input when 'Add New' button is clicked", () => {
    render(<CreateCATSimulator section="CAT" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Add New"));

    const selectFields = screen.getAllByTestId(/^select-field-/);
    expect(selectFields).toHaveLength(2);
  });

  it("should update content area coverage list when a value is selected", () => {
    render(<CreateCATSimulator section="CAT" onSubmit={mockOnSubmit} />);

    const selectField = screen.getByTestId(
      "select-field-contentAreaCoverage.0"
    ) as HTMLSelectElement;
    fireEvent.change(selectField, { target: { value: "Option 1" } });

    expect(selectField.value).toBe("Option 1");
  });

  it("should render the loader if contentLoader prop is true", () => {
    render(
      <CreateCATSimulator
        section="CAT"
        contentLoader={true}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId("component-loader")).toBeInTheDocument();
  });
});
