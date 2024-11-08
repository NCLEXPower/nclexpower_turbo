import { COUNTRY_LIST } from "../constant";
export const countryByCode = (code: string) =>
  COUNTRY_LIST.find((country) => country.code === code)?.name;
