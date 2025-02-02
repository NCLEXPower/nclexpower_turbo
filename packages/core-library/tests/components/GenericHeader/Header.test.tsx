import { fireEvent, render, screen, waitFor, userEvent } from "../../common";
import { Header, Props } from "../../../components/GenericHeader/Header";
import { useRouter } from "../../../core";
import { useResolution } from "../../../hooks";
import { NavigationType } from "../../../types/navigation";
import { MenuItems } from "../../../api/types";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useResolution", () => ({
  useResolution: jest.fn().mockReturnValue({ isMobile: false }),
}));

const DEFAULT_PROPS: Props = {
  isAuthenticated: false,
  hidden: false,
  menu: [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
  ] as MenuItems[],
  drawerButton: <button>Drawer</button>,
  onLogout: jest.fn(),
  drawerHeader: {},
  headerLinkSx: {},
  loginButtonSx: {},
};

describe("Header", () => {
  const mockFn = jest.fn();
  const mockUseResolution = useResolution as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseResolution.mockReturnValue({ isMobile: false });
    mockUseRouter.mockReturnValue({ push: mockFn });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render header with menu items", () => {
    render(<Header {...DEFAULT_PROPS} />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-Home")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-Login")).toBeInTheDocument();
  });

  it("should navigates to the correct path when menu item is clicked", () => {
    render(<Header {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByTestId("menu-item-Home"));
    expect(mockFn).toHaveBeenCalledWith({ pathname: "/" });

    fireEvent.click(screen.getByTestId("menu-item-Login"));
    expect(mockFn).toHaveBeenCalledWith({ pathname: "/login" });
  });

  it("should render AccountMenu when authenticated", () => {
    render(<Header {...DEFAULT_PROPS} isAuthenticated={true} />);
    expect(screen.getByTestId("account-menu-button")).toBeInTheDocument();
  });

  it("should not render header when hidden is true", () => {
    render(<Header {...DEFAULT_PROPS} hidden={true} />);
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });
});
