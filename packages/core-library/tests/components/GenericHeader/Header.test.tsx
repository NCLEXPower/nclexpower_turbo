import { fireEvent, render, screen, waitFor } from "../../common";
import { Header, Props } from "../../../components/GenericHeader/Header";
import { useRouter } from "../../../core";
import { useResolution } from "../../../hooks";
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
  logout: jest.fn(),
  isArxenius: false,
  path: "",
  isMobile: false,
  handleNavigate: jest.fn(),
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
    const mockHandleNavigate = jest.fn();

    render(<Header {...DEFAULT_PROPS} handleNavigate={mockHandleNavigate} />);

    fireEvent.click(screen.getByTestId("menu-item-Home"));
    expect(mockHandleNavigate).toHaveBeenCalledWith("/");

    fireEvent.click(screen.getByTestId("menu-item-Login"));
    expect(mockHandleNavigate).toHaveBeenCalledWith("/login");

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should render AccountMenu when authenticated", () => {
    render(<Header {...DEFAULT_PROPS} isAuthenticated={true} />);
    expect(screen.getByTestId("account-menu-button")).toBeInTheDocument();
  });

  it("handles logout click", async () => {
    render(
      <Header {...DEFAULT_PROPS} isAuthenticated={true} logout={mockFn} />
    );
    fireEvent.click(screen.getByTestId("account-menu-button"));

    await waitFor(() => {
      expect(screen.getByTestId("logout-button")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("logout-button"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("should not render header when hidden is true", () => {
    render(<Header {...DEFAULT_PROPS} hidden={true} />);
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });
});
