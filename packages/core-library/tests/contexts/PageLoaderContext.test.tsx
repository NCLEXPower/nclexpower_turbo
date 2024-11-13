import { render, screen } from "../common";
import { PageLoaderContextProvider } from "../../contexts/PageLoaderContext";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));

jest.mock("../../components", () => ({
  PageLoader: () => <div data-testid="page-loader">Loading...</div>,
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("PageLoaderContextProvider", () => {
  it("renders PageLoader while loading and isAuthenticated is false", () => {
    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div>Test Component</div>
      </PageLoaderContextProvider>
    );

    expect(screen.getByTestId("page-loader")).toBeInTheDocument();
  });
});
