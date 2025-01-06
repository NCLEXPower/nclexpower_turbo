import { render, screen, fireEvent } from "@testing-library/react";
import { ScrollTop } from "../../../components";
import { useScroll } from "../../../core";
import { useCookie } from "../../../hooks/useCookie";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useScroll: jest.fn(),
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

  it("applies different bottom spacing based on cookie consent", () => {
    (useScroll as jest.Mock).mockReturnValue({
      scrollTop: jest.fn(),
      isScrolled: true,
    });

    (useCookie as jest.Mock).mockReturnValue(["accepted"]);

    const { rerender } = render(<ScrollTop />);

    let button = screen.getByRole("button");
    expect(button).toHaveStyle({ bottom: "50px" });

    (useCookie as jest.Mock).mockReturnValue([null]);

    rerender(<ScrollTop />);

    button = screen.getByRole("button");
    expect(button).toHaveStyle({ bottom: "120px" });
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
