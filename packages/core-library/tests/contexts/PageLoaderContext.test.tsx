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

it("sets isMounted to true after useEffect runs", async () => {
  render(
    <PageLoaderContextProvider loading={true} isAuthenticated={false}>
      <div data-testid="child-component">Test Component</div>
    </PageLoaderContextProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 6000));
});
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
  it("renders children when BASEAPP is not 'webc_app'", () => {
    render(
      <PageLoaderContextProvider loading={false} isAuthenticated={true}>
        <div data-testid="children-component">Child Component</div>
      </PageLoaderContextProvider>
    );

  });

  it("renders PageLoader when BASEAPP is 'webc_app' and loading conditions are true", () => {
    jest.mock("../../config", () => ({
      config: { value: { BASEAPP: "webc_app" } },
    }));

    render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="children-component">Child Component</div>
      </PageLoaderContextProvider>
    );

  });
});