import { Config } from "isomorphic-dompurify";

let DOMPurify: any = null;

if (typeof window !== "undefined") {
  // Import `isomorphic-dompurify` only in the browser
  DOMPurify = require("isomorphic-dompurify");
}

type useSanitizedInputsType = {
  purifyInputs(
    dirty: string,
    config?: Config
  ): string | TrustedHTML | DocumentFragment | HTMLElement;
};

export const useSanitizedInputs = ({
  config,
}: {
  config?: Config;
}): useSanitizedInputsType => {
  const purifyInputs = (dirty: string) => {
    if (!DOMPurify) {
      // Return the unprocessed input if DOMPurify is not available
      console.warn("DOMPurify is not available in this environment.");
      return dirty;
    }

    // Sanitize the input using DOMPurify
    const clean = DOMPurify.sanitize(dirty, { ...config });
    return clean;
  };

  return { purifyInputs };
};
