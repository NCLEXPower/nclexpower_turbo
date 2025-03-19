/**
 * Converts a plain object into a FormData instance.
 *
 * @param data - An object with keys and values that are either strings or Blobs.
 * @returns A FormData instance with the provided key/value pairs appended.
 */
export function createFormData<T extends Record<string, FormDataEntryValue>>(
  data: T
): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}
