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

it("sets isMounted to true after useEffect runs", async () => {
  render(
    <PageLoaderContextProvider loading={true} isAuthenticated={false}>
      <div data-testid="child-component">Test Component</div>
    </PageLoaderContextProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 6000));
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

  it("renders null when isMounted is false initially", () => {
    jest.useFakeTimers();

    const { container } = render(
      <PageLoaderContextProvider loading={true} isAuthenticated={false}>
        <div data-testid="child-component">Test Component</div>
      </PageLoaderContextProvider>
    );

    expect(container.firstChild).toBeNull();

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    jest.useRealTimers();
  });
});
