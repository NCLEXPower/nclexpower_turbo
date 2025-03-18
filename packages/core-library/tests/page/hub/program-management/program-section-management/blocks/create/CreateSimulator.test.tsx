/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent, waitFor } from "../../../../../../common";
import { CreateSimulator } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";
import { useForm } from "react-hook-form";
import { useSelectfieldOptions } from "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock(
  "../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions",
  () => ({
    useSelectfieldOptions: jest.fn(),
  })
);

jest.mock("../../../../../../../components", () => ({
  TextField: (props: any) => (
    <input
      data-testid="text-field"
      placeholder={props.placeholder}
      {...props}
    />
  ),
  ControlledCheckbox: (props: any) => (
    <input data-testid={props.name} type="checkbox" {...props} />
  ),
  GenericSelectField: (props: any) => (
    <select data-testid="content-area" onChange={props.onChange} {...props}>
      {props.options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
  Button: (props: any) => (
    <button onClick={props.onClick} {...props}>
      {props.children}
    </button>
  ),
  ComponentLoader: () => <div data-testid="component-loader" />,
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

describe("CreateSimulator", () => {
  const mockOnSubmit = jest.fn();
  const mockSetValue = jest.fn();

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (cb: any) => (e: any) => {
        e.preventDefault();
        cb();
      },
      setValue: mockSetValue,
    });

    (useSelectfieldOptions as jest.Mock).mockReturnValue({
      cleanedContentArea: ["Option 1", "Option 2"],
    });
  });

  it("should render the component correctly", () => {
    render(<CreateSimulator section="simulator" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Create Simulator item")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByText("Content Area Coverage* :")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should call onSubmit when Create button is clicked", async () => {
    render(<CreateSimulator section="simulator" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("should display loader if contentLoader is true", () => {
    render(
      <CreateSimulator
        section="simulator"
        contentLoader={true}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId("component-loader")).toBeInTheDocument();
  });

  it("should toggle checkboxes correctly", () => {
    render(<CreateSimulator section="simulator" onSubmit={mockOnSubmit} />);

    const guidedCheckbox = screen.getByTestId("guided") as HTMLInputElement;
    const unguidedCheckbox = screen.getByTestId("unguided") as HTMLInputElement;

    fireEvent.click(guidedCheckbox);
    fireEvent.click(unguidedCheckbox);

    expect(guidedCheckbox.checked).toBe(true);
    expect(unguidedCheckbox.checked).toBe(true);
  });
});
