import { render, screen } from "../common";
import { Link } from "../../components";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(() => ({
    pathname: "/test",
    push: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Link Component", () => {
  it("renders a naked external link as <a>", () => {
    render(
      <Link href="https://example.com" naked>
        External Naked Link
      </Link>
    );

    const link = screen.getByRole("link", { name: /external naked link/i });

    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
