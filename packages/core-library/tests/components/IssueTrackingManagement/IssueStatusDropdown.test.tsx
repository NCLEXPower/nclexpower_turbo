import { render } from "@testing-library/react";
import { screen, userEvent, waitFor } from "../../common";
import { IssueStatusDropdown } from "../../../system/app/internal/blocks/Hub/IssueTrackingManagement/IssueStatusDropdown";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

describe("IssueStatusDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders IssueStatusDropdown and displays the selected status", () => {
    const selectedStatus = 1;
    const setSelectedStatus = jest.fn();
    const statusOptions = [0, 1, 2];
  
    render(
      <IssueStatusDropdown
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statusOptions={statusOptions}
      />
    );
  
    expect(screen.getByText("In Review")).toBeInTheDocument();
  });

  test("updates selectedStatus when option is changed", async () => {
    const setSelectedStatusMock = jest.fn();
    const initialStatus = 1;
    const statusOptions = [0, 1, 2];
  
    render(
      <IssueStatusDropdown
        selectedStatus={initialStatus}
        setSelectedStatus={setSelectedStatusMock}
        statusOptions={statusOptions}
      />
    );
  
    const selectElement = screen.getByRole("combobox");
    await userEvent.click(selectElement);
  
    const optionElement = await screen.findByRole("option", { name: /Resolved/i });
    await userEvent.click(optionElement);
  
    await waitFor(() => {
      expect(setSelectedStatusMock).toHaveBeenCalledWith("Resolved");
    });
  });
});