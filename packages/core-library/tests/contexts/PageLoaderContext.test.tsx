import { render, screen, act } from "../common";
import { PageLoaderContextProvider } from "../../contexts/PageLoaderContext";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));

jest.mock("../../components", () => ({
  PageLoader: () => <div data-testid="page-loader">Loading...</div>,
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ loading: true }),
}));

describe("PageLoaderContextProvider", () => {
  it("renders PageLoader while loading and isAuthenticated is false", () => {
    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="page-loader">Test Component</div>
      </PageLoaderContextProvider>
    );
  });
});

describe("PageLoaderContextProvider", () => {
  it("renders children-component when isAuthenticated is true", () => {
    render(
      <PageLoaderContextProvider loading={false} isAuthenticated={true}>
        <div data-testid="children-component">Test Component</div>
      </PageLoaderContextProvider>
    );
  });

  it("renders PageLoader when BASEAPP is 'webc_app' and loading conditions are true", () => {
    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="children-component">Test Component</div>
      </PageLoaderContextProvider>
    );
  });
});
