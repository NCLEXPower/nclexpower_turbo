/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../../../common";
import { CreateContentCards } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/create";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockOnSubmit = jest.fn();

describe("CreateContentCards Component", () => {
  const renderComponent = (props = {}) => {
    return render(
      <CreateContentCards
        section="Test Section"
        contentLoader={false}
        onSubmit={mockOnSubmit}
        {...props}
      />
    );
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the component with initial form fields", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter card topic 1")
    ).toBeInTheDocument();
  });

  it("validates required fields on form submission", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
  });

  it("allows adding topics", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Add Topic/i }));
    expect(
      screen.getByPlaceholderText("Enter card topic 2")
    ).toBeInTheDocument();
  });

  it("allows adding card faces", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Add Card/i }));

    const cardFaces = screen.getAllByText(/Card Face \d*/i);
    expect(cardFaces).toHaveLength(2);
  });
});
