import { renderHook } from "../common";
import { useSafeStripe } from "../../hooks";
import { useElements, useStripe, Elements } from "@stripe/react-stripe-js";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  Elements: ({ children }: { children: React.ReactNode }) => children,
}));

describe("useSafeStripe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return stripe and elements when Stripe context is properly set up", () => {
    const mockStripe = { mock: "stripe-instance" };
    const mockElements = { mock: "elements-instance" };

    jest.mocked(useStripe).mockReturnValue(mockStripe as any);
    jest.mocked(useElements).mockReturnValue(mockElements as any);

    const { result } = renderHook(() => useSafeStripe());

    expect(result.current.stripe).toBe(mockStripe);
    expect(result.current.elements).toBe(mockElements);
    expect(result.current.error).toBe(null);
    expect(result.current.isStripeReady).toBe(true);
  });

  test("should throw an error when Stripe context is missing", () => {
    jest.mocked(useStripe).mockReturnValue(null);
    jest.mocked(useElements).mockReturnValue(null);

    const { result } = renderHook(() => useSafeStripe());

    expect(result.current.stripe).toBe(null);
    expect(result.current.elements).toBe(null);
    expect(result.current.error).toEqual(
      new Error("Stripe Elements context not found.")
    );
    expect(result.current.isStripeReady).toBe(false);
  });

  test("should handle missing stripe instance while elements are present", () => {
    const mockElements = { mock: "elements-instance" };
    jest.mocked(useStripe).mockReturnValue(null);
    jest.mocked(useElements).mockReturnValue(mockElements as any);

    const { result } = renderHook(() => useSafeStripe());

    expect(result.current.stripe).toBe(null);
    expect(result.current.elements).toBe(null);
    expect(result.current.error).toEqual(
      new Error("Stripe Elements context not found.")
    );
    expect(result.current.isStripeReady).toBe(false);
  });

  test("should handle missing elements instance while stripe is present", () => {
    const mockStripe = { mock: "stripe-instance" };

    jest.mocked(useStripe).mockReturnValue(mockStripe as any);
    jest.mocked(useElements).mockReturnValue(null);

    const { result } = renderHook(() => useSafeStripe());

    expect(result.current.stripe).toBe(null);
    expect(result.current.elements).toBe(null);
    expect(result.current.error).toEqual(
      new Error("Stripe Elements context not found.")
    );
    expect(result.current.isStripeReady).toBe(false);
  });
});
