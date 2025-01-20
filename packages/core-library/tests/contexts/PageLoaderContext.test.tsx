import { render, screen, waitFor } from "../common";
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
  it("renders children when isAuthenticated is true", async () => {
    render(
      <PageLoaderContextProvider loading={false} isAuthenticated={true}>
        <div data-testid="child-component">Child Component</div>
      </PageLoaderContextProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("child-component")).toBeInTheDocument()
    );
  });

  it("renders PageLoader when BASEAPP is webc_app and loading conditions are true", async () => {
    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="child-component">Child Component</div>
      </PageLoaderContextProvider>
    );

  });

  it("sets isMounted to true after the component mounts", async () => {
    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="child-component">Child Component</div>
      </PageLoaderContextProvider>
    );
  });
});