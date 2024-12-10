import { render, screen, waitFor } from "../../common";
import {
  ContentDataContextProvider,
  useContentDataContext,
} from "../../../contexts/content/ContentDataContext";
import { useCachedAccessKey } from "../../../contexts/content/useCachedAccessKey";
import { useApiContent } from "../../../hooks";

jest.mock("../../../hooks/useApi");
jest.mock("../../../contexts/content/useCachedAccessKey", () => ({
  useCachedAccessKey: jest.fn(),
}));
jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));
jest.mock("../../../components", () => ({
  ErrorBox: jest.fn(({ label }: { label: string }) => <div>{label}</div>),
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ContentDataContextProvider", () => {
  const mockFetch = jest.fn();
  const mockClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useCachedAccessKey).mockReturnValue({
      fetch: mockFetch,
      clear: mockClear,
    } as any);
  });

  it("provides the correct context values when data is loaded", async () => {
    const mockResult = { pages: { pageRoute: "/", pageAuthorization: 0 } };
    jest.mocked(useApiContent).mockReturnValue({
      loading: false,
      result: mockResult,
      error: null,
    } as any);

    const TestComponent = () => {
      const { loading, IsAuthorized, pages } = useContentDataContext();
      return (
        <div>
          <div data-testid="loading">{loading ? "true" : "false"}</div>
          <div data-testid="isAuthorized">
            {IsAuthorized ? "true" : "false"}
          </div>
          <div data-testid="pages">{pages?.pageRoute}</div>
        </div>
      );
    };

    render(
      <ContentDataContextProvider slug="test-slug">
        <TestComponent />
      </ContentDataContextProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("isAuthorized").textContent).toBe("false");
  });

  it("renders ErrorBox when there is an error", async () => {
    const mockError = { message: "Test Error" };
    jest.mocked(useApiContent).mockReturnValue({
      loading: false,
      result: null,
      error: mockError,
    } as any);

    render(<ContentDataContextProvider slug="test-slug" />);

    await waitFor(() => {
      expect(screen.getByText("Test Error")).toBeInTheDocument();
    });
  });

  it("adds and removes window event listeners on mount and unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<ContentDataContextProvider slug="test-slug" />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });

  it("handles access key fetching and error loggin", async () => {
    mockFetch.mockResolvedValueOnce("Test Access Key");
    const mockApi = {
      office: { openPage: jest.fn().mockResolvedValue("Page Data") },
    };
    jest
      .mocked(useApiContent)
      .mockImplementation((callback: any) => callback(mockApi));

    render(<ContentDataContextProvider slug="test-slug" />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
