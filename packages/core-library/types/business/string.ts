export function parseJSONtoString(value: string) {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    return null;
  }
}

export function isJSON(value: string) {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Extracts inner text from html string
 * @param input "\<p>Hello\</p>"
 * @returns "Hello"
 */
export function textInHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}
