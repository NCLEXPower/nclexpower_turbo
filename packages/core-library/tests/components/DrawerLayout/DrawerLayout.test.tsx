import { DrawerLayout } from "../../../components/GenericDrawerLayout/DrawerLayout";
import { act, render, screen, fireEvent } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { 
    value: {
      BASEAPP: 'test-app'
    }
  },
}));

jest.mock("../../../core/router", () => ({
  useRouter: () => ({
    pathname: '/test'
  }),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  usePaid: () => [true],
}));

describe("DrawerLayout", () => {
  const mockMenu = [
        { id: "1", name: "Home", path: "/home", label: "Home", icon: "home", menuId: "1", parentId: "0", children: [] },
        { id: "2", name: "About", path: "/about", label: "About", icon: "about", menuId: "2", parentId: "0", children: [] },
  ];

  it("should render the drawer layout with menu items when authenticated", () => {
    act(() => {
      render(
        <DrawerLayout
          isPaid="true"
          menu={mockMenu}
          isAuthenticated={true}
          data-testid="drawer-layout"
        >
          <div>Content</div>
        </DrawerLayout>
      );
    });

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should toggle sidebar when menu button is clicked", () => {
    act(() => {
      render(
        <DrawerLayout
          isPaid="true"
          menu={mockMenu}
          isAuthenticated={true}
          data-testid="drawer-layout"
        >
          <div>Content</div>
        </DrawerLayout>
      );
    });

    const menuButton = screen.getByRole('button', { name: /toggle-sidebar/i });
    act(() => {
      fireEvent.click(menuButton);
    });

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});