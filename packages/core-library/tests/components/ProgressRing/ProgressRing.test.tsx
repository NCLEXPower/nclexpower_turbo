import { ProgressRing } from "core-library/components";
import "@testing-library/jest-dom";
import { render } from "../../common";

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

describe("ProgressRing", () => {
  it("renders two CircularProgress components", () => {
    const { getAllByRole } = render(
      <ProgressRing
        value={75}
        size={60}
        color="#3f51b5"
        thickness={6}
        trackColor="#ccc"
      />
    );

    const progressBars = getAllByRole("progressbar");
    expect(progressBars).toHaveLength(2);
  });

  it("renders inner progress ring with correct value", () => {
    const { getAllByRole } = render(
      <ProgressRing value={80} size={50} color="green" />
    );

    const progressBars = getAllByRole("progressbar");

    expect(progressBars[1]).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ProgressRing value={60} size={40} color="red" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
