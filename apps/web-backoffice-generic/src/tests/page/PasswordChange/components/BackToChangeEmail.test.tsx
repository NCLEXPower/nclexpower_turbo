import React from "react";
import { BackToChangeEmail } from "../../../../components/blocks/page/PasswordChange/index";
import { render, screen } from "core-library/tests/common";

jest.mock("core-library/config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("core-library/core/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("BackToChangeEmail", () => {
  it("renders with correct href and text", () => {
    const href = "/account/forgot-password";
    const text = "Change Email";

    render(<BackToChangeEmail href={href} text={text} />);

    const linkElement = screen.getByRole("link", { name: `${text}` });
    const iconElement = screen.getByTestId("back-icon");

    expect(linkElement).toHaveAttribute("href", href);
    expect(linkElement).toHaveTextContent(text);
    expect(iconElement).toBeInTheDocument();
  });
});