import { useApiCallback, useSessionStorage } from "../../../hooks";
import { useCachedAccessKey } from "../../../contexts/content/useCachedAccessKey";
import { renderHook, waitFor } from "../../common";

jest.mock("../../../hooks/useApi");
jest.mock("../../../hooks/useSessionStorage");
jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));

describe("useCachedAccessKey", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial access key as null and loading as true", () => {
    jest.mocked(useApiCallback).mockReturnValue({ loading: false } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([null, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it("fetches access key from storage if available", () => {
    const accessKey = { contentAccessKey: "123" };
    jest.mocked(useApiCallback).mockReturnValue({ loading: false } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([accessKey, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());

    expect(result.current.data).toEqual(accessKey);
    expect(result.current.loading).toBe(false);
  });

  it("fetch returns accessKey from from storage", () => {
    const accessKey = { contentAccessKey: "123" };
    jest.mocked(useApiCallback).mockReturnValue({ loading: false } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([accessKey, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());

    expect(result.current.fetch()).toEqual(accessKey);
  });

  it("fetch returns accessKey from API request if it's not in storage", async () => {
    const accessKey = { contentAccessKey: "123" };
    jest.mocked(useApiCallback).mockReturnValue({
      loading: false,
      execute: jest.fn().mockResolvedValueOnce(accessKey),
    } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([null, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());

    const fetchPromise = await waitFor(() => result.current.fetch());

    expect(fetchPromise).toEqual(accessKey);
  });

  it("noCheckFetch returns accessKey from from storage", () => {
    const accessKey = { contentAccessKey: "123" };
    jest.mocked(useApiCallback).mockReturnValue({ loading: false } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([accessKey, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());

    expect(result.current.noCheckFetch()).toEqual(accessKey);
  });

  it("noCheckFetch returns accessKey from API request if it's not in storage", async () => {
    const accessKey = { contentAccessKey: "123" };
    jest.mocked(useApiCallback).mockReturnValue({
      loading: false,
      execute: jest.fn().mockResolvedValueOnce(accessKey),
    } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([null, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedAccessKey());

    const fetchPromise = await waitFor(() => result.current.noCheckFetch());

    expect(fetchPromise).toEqual(accessKey);
  });
});
