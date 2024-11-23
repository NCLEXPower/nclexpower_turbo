import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { parseBase64toJSON } from "../types";
import { config } from "../config";

interface RecaptchReturn {
  reset: () => void;
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  siteKey: string;
}

export const useRecaptcha = (): RecaptchReturn => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const parsedSiteKey = getKey(config.value.SITEKEY, ["SITEKEY"]);

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  return { reset: resetCaptcha, recaptchaRef, siteKey: parsedSiteKey };
};

export function getKey(value: string, group: string[]) {
  try {
    const configValues = parseBase64toJSON(value);
    if (!configValues) return undefined;

    const groupArray = group.join(",").toUpperCase().split(",");

    for (const key in configValues) {
      if (groupArray.includes(key.toUpperCase())) {
        return configValues[key];
      }
    }

    return undefined;
  } catch (error) {
    console.error(
      "An error occurred while processing the base64 string:",
      error as any
    );
    return undefined;
  }
}
