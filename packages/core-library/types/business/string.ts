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

/**
 * Decode a Base64 encoded string
 * @param base64String "base64String=eyJyYnMiOiAiZGVwbG95bWVudF9pZCIsICJnc2siOiAiZGVwbG95bWVuX2lkIn0K"
 * @returns "JSON "{\"property1\": \"value1\"}""
 */
export function parseBase64toString(base64String: string): string {
  return Buffer.from(base64String, "base64").toString("utf-8");
}

/**
 * Base64 string to JSON
 * @param value "value=eyJyYnMiOiAiZGVwbG95bWVudF9pZCIsICJnc2siOiAiZGVwbG95bWVuX2lkIn0K"
 * @returns "Object {"property1": "value1"}"
 */
export function parseBase64toJSON(value: string) {
  try {
    const decodedString = parseBase64toString(value);
    return JSON.parse(decodedString);
  } catch (e) {
    return null;
  }
}
