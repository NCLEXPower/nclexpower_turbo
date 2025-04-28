/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { RemoveProgramDialogContent } from "../../../../../../system/app/internal/blocks/Hub/ProgramManagement/program-management-list/components/RemoveProgramDialogContent";
import { render, screen, fireEvent } from "../../../../../common";

jest.mock("../../../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const mockOnSubmit = jest.fn();
const mockCloseModal = jest.fn();
const programTitle = "Welcome to the Program";

describe("RemoveProgramDialogContent", () => {
  beforeEach(() => {
    render(
      <RemoveProgramDialogContent
        isLoading={false}
        onSubmit={mockOnSubmit}
        closeModal={mockCloseModal}
        programTitle={programTitle}
      />
    );
  });

  it("should renders correctly with given props", () => {
    expect(screen.getByText("Delete Topic")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Are you sure you want to delete this topic? [${programTitle}]`
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Program Topic")).toBeInTheDocument();
  });

  it("should calls closeModal when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
