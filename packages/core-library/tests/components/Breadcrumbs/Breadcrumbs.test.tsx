import { render, screen } from "../../common";
import { useRouter } from "../../../core";
import { BreadCrumbs } from "../../../components";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components/Link", () => ({
  Link: jest.fn(({ children, href }) => <a href={href}>{children}</a>),
}));

describe("BreadCrumbs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUseRouter = useRouter as jest.Mock;

  it("should render the breadcrumbs with correct labels and links for /hub/programs/body-systems", () => {
    mockUseRouter.mockReturnValue({
      pathname: "/hub/programs/body-systems",
    });

    render(<BreadCrumbs />);

    const programsLink = screen.getByText("Programs");
    expect(programsLink).toBeInTheDocument();
    expect(programsLink.closest("a")).toHaveAttribute("href", "/hub/programs");

    const bodySystemsText = screen.getByText("Body Systems");
    expect(bodySystemsText).toBeInTheDocument();
    expect(bodySystemsText.closest("a")).toBeNull();
  });

  it("should not render if there are no segments", () => {
    mockUseRouter.mockReturnValue({ pathname: "/" });

    const { container } = render(<BreadCrumbs />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render if the pathname is just /hub", () => {
    mockUseRouter.mockReturnValue({ pathname: "/hub" });

    const { container } = render(<BreadCrumbs />);
    expect(container.firstChild).toBeNull();
  });
});
