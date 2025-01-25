// import { screen } from "@testing-library/react";
import ComingSoonPreview from "../../../../core-library/system/app/internal/blocks/Hub/ComingSoon/ComingSoonPreview";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
    getConfig: jest
      .fn()
      .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
  }));
  
  jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
  }));
  
  jest.mock("console", () => ({
    time: jest.fn(),
  }));

const defaultProps = {
  watchEventName: "Test Event",
  watchEnvironment: "Production",
  watchDescription: "This is a test description.",
  watchConfetti: false,
  watchAnnouncement: false,
  isSwitchOn: false,
  handleDeactivate: jest.fn(),
};

describe("ComingSoonPreview Component", () => {
  test("renders component with Go Live Timer off", () => {
    render(<ComingSoonPreview {...defaultProps} />);
    expect(screen.getByText("Go Live Timer: Off")).toBeInTheDocument();
  });

  test("renders component with Go Live Timer on", () => {
    render(<ComingSoonPreview {...defaultProps} isSwitchOn={true} />);
    expect(screen.getByText("Go Live Timer: On")).toBeInTheDocument();
  });
});
