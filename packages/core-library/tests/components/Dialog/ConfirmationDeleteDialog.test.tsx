import { ConfirmationDeleteDialog } from "../../../components";
import { act, render, screen } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("DialogBox", () => {
  const handleClose = jest.fn();
  const handleDelete = jest.fn();
  it("should render the delete dialog without error when open is truthy", () => {
    act(() => {
      render(
        <ConfirmationDeleteDialog
          isOpen={true}
          handleClose={handleClose}
          handleDelete={handleDelete}
          expectedInput="test"
        />
      );
    });
  });
  it("should render the delete dialog with the correct information", () => {
    act(() => {
      render(
        <ConfirmationDeleteDialog
          isOpen={true}
          handleClose={handleClose}
          handleDelete={handleDelete}
          title="test-title"
          description="test-description"
          expectedInput="test-delete"
        />
      );
    });
    expect(screen.getByText("test-title")).toBeTruthy();
    expect(screen.getByText("test-description")).toBeTruthy();
  });

  it("should disable the confirm button loading when loading is true", () => {
    act(() => {
      render(
        <ConfirmationDeleteDialog
          isOpen={true}
          handleClose={handleClose}
          handleDelete={handleDelete}
          expectedInput="delete-title"
          title="test-title"
          description="test-description"
          loading={true}
        />
      );
    });
    expect(screen.getByText("Confirm").closest("button")).toBeDisabled();
  });
});
