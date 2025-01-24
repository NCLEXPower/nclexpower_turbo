import { useEffect } from "react";

export const useDebounce = (
  callback: VoidFunction,
  delay: number | undefined,
  deps: unknown[]
) =>
  useEffect(() => {
    if (!delay) return callback();
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
  }, [delay, ...deps]);
