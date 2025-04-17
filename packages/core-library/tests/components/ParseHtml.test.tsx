import { ParsedHtml } from "../../components";
import { act, render, screen } from "../common";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ParsedHtml", () => {
  it("should render parsed html", () => {
    act(() => {
      render(<ParsedHtml html="<div>parsed Html</div>" />);
    });
    expect(screen.queryAllByText("parsed Html")).toBeTruthy();
  });

  it("should render and remove li elements with not injected token values", () => {
    const html =
      "<ul><li>[[label:text]]</li><li>text [[label:text]]</li><li>text [[label:text]] text</li><li>visible li element</li></ul";
    const expectedHtml = "<ul><li>visible li element</li></ul";
    act(() => {
      render(<ParsedHtml html={html} />);
    });
    expect(screen.queryAllByText(expectedHtml)).toBeTruthy();
  });

  it("should render and remove empty li", () => {
    const html = "<ul><li></li><li></li><li>visible li element</li></ul";
    const expectedHtml = "<ul><li>visible li element</li></ul";
    act(() => {
      render(<ParsedHtml html={html} />);
    });
    expect(screen.queryAllByText(expectedHtml)).toBeTruthy();
  });
});
