import { DrawerLayout } from "../../../components/GenericDrawerLayout/DrawerLayout";
import { render } from "@testing-library/react";
import { screen } from "../../common";
import { useResolution } from "../../../hooks";

const mockMenu = [
  {
    id: "1",
    name: "Home",
    path: "/home",
    label: "Home",
    icon: "home",
    menuId: "1",
    parentId: "0",
    children: [],
  },
  {
    id: "2",
    name: "About",
    path: "/about",
    label: "About",
    icon: "about",
    menuId: "2",
    parentId: "0",
    children: [],
  },
];

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: {
    value: {
      BASEAPP: "wc",
    },
  },
}));

jest.mock("../../../core/router", () => ({
  useRouter: () => ({
    pathname: "/hub",
  }),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  usePaid: () => [true],
  useAccessToken: jest
    .fn()
    .mockReturnValue(["test-access-token", jest.fn(), jest.fn()]),
  useAccountId: jest
    .fn()
    .mockReturnValue(["test-account-id", jest.fn(), jest.fn()]),
}));

jest.mock("../../../hooks", () => ({
  useResolution: jest.fn().mockReturnValue({
    isMobile: false,
  }),
  useIsDesignVisible: jest.fn().mockReturnValue(false),
  useIsMounted: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../components", () => ({
  Sidebar: ({ open }: { open: boolean }) => (
    <div data-testid="mock-sidebar">
      {open ? "Sidebar Open" : "Sidebar Closed"}
    </div>
  ),
}));

jest.mock("../../../components/GenericHeader/Header", () => ({
  Header: () => <div data-testid="mock-header" />,
}));

describe("DrawerLayout", () => {
  beforeEach(() => {
    (useResolution as jest.Mock).mockReturnValue({
      isMobile: false,
    });
  });

  it("closes sidebar on mobile view", () => {
    (useResolution as jest.Mock).mockReturnValue({ isMobile: true });
    render(
      <DrawerLayout isPaid="true" menu={mockMenu} isAuthenticated={true}>
        <div data-testid="mock-content">Content</div>
      </DrawerLayout>
    );

    expect(screen.getByTestId("mock-sidebar")).toHaveTextContent(
      "Sidebar Closed"
    );
  });

  it("opens sidebar when isAuthenticated is true and isMobile is false", () => {
    render(
      <DrawerLayout isPaid="true" menu={mockMenu} isAuthenticated={true}>
        <div>Content</div>
      </DrawerLayout>
    );

    expect(screen.getByTestId("mock-sidebar")).toHaveTextContent(
      "Sidebar Open"
    );
  });

  it("hide the sidebar if not authenticated", () => {
    render(
      <DrawerLayout isPaid="true" menu={mockMenu} isAuthenticated={false}>
        <div>Content</div>
      </DrawerLayout>
    );

    expect(screen.queryByTestId("mock-sidebar")).not.toBeInTheDocument();
  });
});
