import { formatPrice } from "../../utils";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("formatPrice", () => {
  it("formats number as currency string", () => {
    expect(formatPrice(100)).toEqual("$100");
    expect(formatPrice(1234, "USD")).toEqual("$1,234");
    expect(formatPrice(1234, "EUR")).toEqual("€1,234");
  });

  it("returns $0 if no value", () => {
    expect(formatPrice(0)).toEqual("$0");
    expect(formatPrice(undefined)).toEqual("$0");
    expect(formatPrice(null as any)).toEqual("$0");
  });
});
