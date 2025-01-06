import { render, screen, fireEvent } from "../../common";
import { ScrollTop } from "../../../components";
import { useScroll } from "../../../core";
import { useCookie } from "../../../hooks/useCookie";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useScroll: jest.fn(),
  useRouter: jest.fn(() => ({
    pathname: "/some-path",
  })),
}));

jest.mock("../../../hooks/useCookie", () => ({
  useCookie: jest.fn(),
}));

describe("ScrollTop Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ScrollTop button when scrolled", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue(["accepted"]);

    render(<ScrollTop />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ display: "flex" });
  });

  it("hides the scroll top button when not scrolled", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: false,
    });

    render(<ScrollTop />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("applies absolute position when forCookieConsent is set to true", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue([null]);

    render(<ScrollTop forCookieConsent />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ position: "absolute", top: "-60px" });
  });

  it("hides the scroll button if forCookieConsent=false and useCookie is null", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue([null]);

    render(<ScrollTop />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("shows scroll button if forCookieConsent=false and useCookie is not null", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue(["accepted"]);

    render(<ScrollTop />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ display: "flex" });
  });

  it("calls scrollTop when button is clicked", () => {
    const mockScrollTop = jest.fn();

    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: mockScrollTop,
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue(["accepted"]);

    render(<ScrollTop />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockScrollTop).toHaveBeenCalledTimes(1);
  });
});
