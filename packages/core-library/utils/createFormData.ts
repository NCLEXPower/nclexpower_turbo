/**
 * Converts a plain object into a FormData instance.
 *
 * @param data - An object where keys are strings and values can be either
 *               a single `FormDataEntryValue` (string or Blob) or an array of `FormDataEntryValue`.
 *               Arrays are handled by appending each value separately under the same key.
 * @returns A FormData instance with the provided key/value pairs appended.
 */
export function createFormData<
  T extends Record<string, FormDataEntryValue | FormDataEntryValue[]>,
>(data: T): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        formData.append(key, val);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}
