export const OTP_REGEX = /^\d{6}$/;
export const CONTAINS_NUMBER_REGEX = /(?=.*[0-9])/;
export const CONTAINS_UPPERCASE_REGEX = /(?=.*[A-Z])/;
export const STRING_REGEX = /^[ A-Za-z0-9_'*(),./#&+-]*$/;
export const ISO_DATE_REGEX =
  /^\d{4}-\d{2}-\d{2}(?:[Tt]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})?)?$/;
