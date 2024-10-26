import { render } from "@testing-library/react";
import { DialogContextModal } from "../../components/Dialog/DialogContextModal";
import { delConType } from "../../components";

describe("DialogContextModal", () => {
  test("renders CategoryDialogFormBlock when dialogFormType is 'category_form'", () => {
    const { container } = render(
      <DialogContextModal dialogFormType="category_form" />
    );
    expect(
      container.querySelector("CategoryDialogFormBlock")
    ).toBeInTheDocument();
  });

  it("renders ProductDialogBlock when dialogFormType is 'select_pricing'", () => {
    const { container } = render(
      <DialogContextModal dialogFormType="select_pricing" />
    );
    expect(container.querySelector("ProductDialogBlock")).toBeInTheDocument();
  });

  it("renders DeleteConfirmationBlock with data", () => {
    const mockData: delConType = {
      id: 1,
      text: "test",
    };
    const { container } = render(
      <DialogContextModal dialogFormType="delete-modal" data={mockData} />
    );
    expect(
      container.querySelector("DeleteConfirmationBlock")
    ).toBeInTheDocument();
  });

  it("returns null for unknown dialogFormType", () => {
    const { container } = render(
      <DialogContextModal dialogFormType="unknown_type" />
    );
    expect(container.firstChild).toBeNull();
  });
});
