/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { render, screen, fireEvent } from "../../../../../../common";
import { RemoveSection } from "../../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-section-management/blocks/edit/RemoveSection";

jest.mock("../../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("RemoveSection Component", () => {
  const mockCloseModal = jest.fn();
  const mockOnSubmit = jest.fn();
  const sectionId = "123";
  const sectionTitle = "Test Section";

  const setup = (isLoading = false) => {
    render(
      <RemoveSection
        closeModal={mockCloseModal}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        onSubmit={mockOnSubmit}
        isLoading={isLoading}
      />
    );
  };
  it("calls onSubmit when Delete button is clicked", () => {
    setup();
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(sectionId);
  });

  it("calls closeModal when Cancel button is clicked", () => {
    setup();
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
