import { formatCurrency } from "../../utils/format-currency";

describe("formatCurrency", () => {
  it("formats USD currency by default", () => {
    expect(formatCurrency(undefined, 1000)).toBe("$1,000");
  });

  it("formats USD currency with explicit value", () => {
    expect(formatCurrency("USD", 1234.56)).toBe("$1,234.56");
  });

  it("formats EUR currency", () => {
    expect(formatCurrency("EUR", 1000)).toBe("€1,000");
  });

  it("formats JPY currency", () => {
    expect(formatCurrency("JPY", 5000)).toBe("¥5,000");
  });

  it("formats with default value 0", () => {
    expect(formatCurrency("USD")).toBe("$0");
  });

  it("formats negative values", () => {
    expect(formatCurrency("USD", -100)).toBe("-$100");
  });

  it("formats large numbers", () => {
    expect(formatCurrency("USD", 1000000)).toBe("$1,000,000");
  });
});
