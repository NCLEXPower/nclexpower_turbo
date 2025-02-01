/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { EditDocumentField } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit-item/EditDocument/EditDocumentField";
import { render, screen, fireEvent } from "../../../../../../common";
import { Control } from "react-hook-form";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../components", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  FileUploadField: ({ triggerLabel, ...props }: any) => (
    <div {...props}>{triggerLabel}</div>
  ),
  TextField: ({ name, ...props }: any) => <input name={name} {...props} />,
}));

jest.mock("../../../../../../../utils/FormatSectionTitles", () => ({
  formatSectionTitle: (section: string) => section || "Default",
}));

describe("EditDocumentField", () => {
  const mockOnSave = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      section: "Test Section",
      control: {} as Control<{ title: string; link: File[] }>,
      linkValue: "",
      onSave: mockOnSave,
      ...props,
    };
    return render(<EditDocumentField {...defaultProps} />);
  };

  it("renders the section title correctly", () => {
    renderComponent({ section: "Document" });
    expect(screen.getByText("Edit Document item")).toBeInTheDocument();
  });

  it("renders input fields and the upload button", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByText("Upload Document")).toBeInTheDocument();
  });

  it("renders the update button and calls onSave when clicked", () => {
    renderComponent();

    const button = screen.getByText("Update");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("renders with provided linkValue", () => {
    renderComponent({ linkValue: "Sample Document" });
    expect(screen.getByText("Sample Document")).toBeInTheDocument();
  });
});
