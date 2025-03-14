import { ComponentState } from "../../components";
import { logRoles, render, screen } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("Components States", () => {
  it("should render isError component state when it is not successful", () => {
    render(
      <ComponentState
        data={{ result: "error" }}
        isSuccess={false}
        isError={true}
        isLoading={false}
      >
        <div>Child Content</div>
      </ComponentState>
    );

    const errorState = screen.getByTestId("component-is-error-id");

    expect(errorState).toBeInTheDocument();
    expect(screen.queryByText("Error!")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).toBeInTheDocument();
  });
  it("should render isLoading component state when it is successful", () => {
    render(
      <ComponentState
        data={{}}
        isSuccess={false}
        isError={false}
        isLoading={true}
      >
        <div>Child Content</div>
      </ComponentState>
    );

    const loadingState = screen.getByTestId("component-is-loading-id");

    expect(loadingState).toBeInTheDocument();
    expect(screen.queryByText("Loading")).toBeInTheDocument();
    expect(screen.queryByText("Please Wait...")).toBeInTheDocument();
  });
  it("should render isEmpty component state when it is successful", () => {
    const mockData = {
      result: [],
    };

    render(
      <ComponentState
        data={mockData}
        isSuccess={true}
        isError={false}
        isLoading={false}
      >
        <div>Child Content</div>
      </ComponentState>
    );

    const emptyState = screen.getByTestId("component-is-empty-id");

    expect(emptyState).toBeInTheDocument();
    expect(screen.queryByText("Empty!")).toBeInTheDocument();
    expect(screen.queryByText("No Data Available")).toBeInTheDocument();
  });
});
