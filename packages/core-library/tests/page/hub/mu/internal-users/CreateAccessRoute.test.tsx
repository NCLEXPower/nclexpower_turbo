import { userEvent, screen, waitFor } from "../../../../common";
import { render } from "@testing-library/react";
import { MenuItems } from "../../../../../api/types";
import { CreateAccessRoute } from "../../../../../system/app/internal/blocks/Hub/ManageUser/internal-users/CreateAccessRoute";

jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));

const mockMenu: MenuItems = {
  id: "1",
  parentId: "",
  label: "Dashboard",
  path: "/dashboard",
  icon: "",
  menuId: "menu_d1",
  children: [
    {
      id: "2",
      parentId: "1",
      label: "Analytics",
      path: "/dashboard/analytics",
      icon: "",
      menuId: "menu_d2",
      children: [],
    },
  ],
};

describe("CreateAccessRoute component", () => {
  it("renders a top-level menu label and path", () => {
    render(<CreateAccessRoute menu={mockMenu} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("/dashboard")).toBeInTheDocument();
    expect(screen.getByText("/dashboard/analytics")).toBeInTheDocument();
  });

  it("toggles child visibility when the button is clicked", async () => {
    render(<CreateAccessRoute menu={mockMenu} />);

    expect(
      screen.getByText((content) => content.includes("/dashboard/analytics"))
    ).toBeInTheDocument();

    const toggleBtn = screen.getByRole("button", { name: /dashboard/i });

    userEvent.click(toggleBtn);

    await waitFor(() => {
      expect(
        screen.queryByText((content) =>
          content.includes("/dashboard/analytics")
        )
      ).not.toBeInTheDocument();
    });

    userEvent.click(toggleBtn);

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("/dashboard/analytics"))
      ).toBeInTheDocument();
    });
  });

  it("disables the toggle button if there are no children", () => {
    const noChildrenMenu: MenuItems = {
      id: "3",
      parentId: "",
      label: "Empty",
      path: "/empty",
      icon: "",
      menuId: "menu_empty",
      children: [],
    };

    render(<CreateAccessRoute menu={noChildrenMenu} />);

    const toggleBtn = screen.getByRole("button", { name: "Empty" });
    expect(toggleBtn).toBeDisabled();
  });
});
