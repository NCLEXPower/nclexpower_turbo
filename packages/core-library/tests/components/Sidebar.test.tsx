import { screen, render, fireEvent, waitFor } from "../common";
import { Sidebar } from "../../components";
import { MenuItems } from "../../api/types";
import { usePathname } from "next/navigation";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockMenu: Array<MenuItems> = [
  {
    id: "1",
    label: "Home",
    path: "/",
    icon: "home_icon",
    menuId: "menu1",
    parentId: "",
    children: [],
  },
  {
    id: "2",
    label: "About",
    path: "/about",
    icon: "about_icon",
    menuId: "menu2",
    parentId: "",
    children: [],
  },
  {
    id: "3",
    label: "Contact Us",
    path: "/contact",
    icon: "contact_icon",
    menuId: "menu3",
    parentId: "",
    children: [],
  },
];

describe("Sidebar Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/home");
  });

  it("renders Sidebar correctly", () => {
    render(
      <Sidebar
        menu={mockMenu}
        variant="persistent"
        open={true}
        setOpen={jest.fn()}
        isAuthenticated={true}
      />
    );

    expect(screen.getByAltText("NCLEXLogo")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("calls setOpen when IconButton is clicked", async () => {
    const mockSetOpen = jest.fn();
    render(
      <Sidebar
        menu={mockMenu}
        variant="persistent"
        open={true}
        setOpen={mockSetOpen}
        isAuthenticated={true}
      />
    );

    const iconButton = screen.getByLabelText("toggle-sidebar");
    fireEvent.click(iconButton);

    await waitFor(() => expect(mockSetOpen).toHaveBeenCalled);
  });
});
