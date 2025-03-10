import { renderHook, act } from "../common";
import { useApiCallback } from "../../hooks";
import { Api } from "../../api";

jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

describe("useApiCallback", () => {
  it("calls asyncFn with a created Api instance and provided arguments", async () => {
    const asyncFn = jest.fn().mockResolvedValue("success");
    const { result } = renderHook(() => useApiCallback(asyncFn));
    const testArgs = { foo: "bar" };

    let returnedValue;
    await act(async () => {
      returnedValue = await result.current.execute(testArgs);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);

    const passedApi = asyncFn.mock.calls[0][0];

    expect(passedApi).toBeInstanceOf(Api);

    expect(asyncFn.mock.calls[0][1]).toEqual(testArgs);

    expect(returnedValue).toEqual("success");
  });

  it("throws error when asyncFn rejects", async () => {
    const error = new Error("failure");
    const asyncFn = jest.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useApiCallback(asyncFn));
    const testArgs = { foo: "bar" };

    let caughtError;
    await act(async () => {
      try {
        await result.current.execute(testArgs);
      } catch (err) {
        caughtError = err;
      }
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
    // Ensure that the thrown error is the exact error from asyncFn (i.e. not wrapped)
    expect(caughtError).toBe(error);
  });
});
