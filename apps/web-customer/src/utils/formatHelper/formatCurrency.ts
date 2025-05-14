export function formatCurrency(currency: string = "USD", value: number = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
}
