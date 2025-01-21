export function formatCustomerName(customer?: {
  firstname?: string;
  middlename?: string;
  lastname?: string;
}): string {
  if (!customer) return "Unknown";

  const { firstname = "", middlename = "", lastname = "" } = customer;

  return `${firstname} ${middlename ? middlename + "." : ""} ${lastname}`.trim();
}
