import {
  useAccessToken,
  useRefreshToken,
  useEncryptItem,
  useCheckoutIntent,
  useConfirmedIntent,
  useSecretClient,
  useOrderNumber,
  usePaymentIntentId,
  useNewAccount,
  useDeviceSession,
} from "../../../contexts/auth/hooks";
import { renderHook } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks", () => ({
  useSessionStorage: jest.fn(),
}));

describe("Custom session storage hooks", () => {
  const mockUseSessionStorage = require("../../../hooks").useSessionStorage;

  beforeEach(() => {
    mockUseSessionStorage.mockClear();
  });

  it("should call useSessionStorage for useAccessToken with correct arguments", () => {
    renderHook(() => useAccessToken());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "accessToken",
      undefined
    );
  });

  it("should call useSessionStorage for useRefreshToken with correct arguments", () => {
    renderHook(() => useRefreshToken());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "refreshToken",
      undefined
    );
  });

  it("should call useSessionStorage for useEncryptItem with correct arguments", () => {
    renderHook(() => useEncryptItem());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "SessionItem",
      undefined
    );
  });

  it("should call useSessionStorage for useCheckoutIntent with correct arguments", () => {
    renderHook(() => useCheckoutIntent());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "CheckoutIntent",
      undefined
    );
  });

  it("should call useSessionStorage for useConfirmedIntent with correct arguments", () => {
    renderHook(() => useConfirmedIntent());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "ConfirmedIntent",
      undefined
    );
  });

  it("should call useSessionStorage for useSecretClient with correct arguments", () => {
    renderHook(() => useSecretClient());
    expect(mockUseSessionStorage).toHaveBeenCalledWith("secretKey", undefined);
  });

  it("should call useSessionStorage for useOrderNumber with correct arguments", () => {
    renderHook(() => useOrderNumber());
    expect(mockUseSessionStorage).toHaveBeenCalledWith(
      "orderNumber",
      undefined
    );
  });

  it("should call useSessionStorage for usePaymentIntentId with correct arguments", () => {
    renderHook(() => usePaymentIntentId());
    expect(mockUseSessionStorage).toHaveBeenCalledWith("pi", undefined);
  });

  it("should call useSessionStorage for useNewAccount with correct arguments", () => {
    renderHook(() => useNewAccount());
    expect(mockUseSessionStorage).toHaveBeenCalledWith("new_account", false);
  });

  it("should call useSessionStorage for useDeviceSession with correct arguments", () => {
    renderHook(() => useDeviceSession());
    expect(mockUseSessionStorage).toHaveBeenCalledWith("dinfo", null);
  });
});
