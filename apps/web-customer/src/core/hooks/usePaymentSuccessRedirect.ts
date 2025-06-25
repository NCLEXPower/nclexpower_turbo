import { useEffect, useState } from "react";
import { useConfirmedIntent } from "core-library/contexts/auth/hooks";
import { Decryption } from "core-library/utils/Decryption";
import { config } from "core-library/config";
import { IntentValueType } from "core-library/types/global";
import { useRouter } from "next/router";

/**
 * @deprecated
 */
export const usePaymentSuccessRedirect = (confirmValue: IntentValueType) => {
  const router = useRouter();
  const [parsedValue, setParsedValue] = useState();
  const [checker, setChecker] = useState(false);
  const key = config.value.SECRET_KEY ?? "no-action-key";
  const [, , clearSessionItem] = useConfirmedIntent();
  const decryptedValue = Decryption(confirmValue ?? "", key);

  useEffect(() => {
    if (decryptedValue !== null) {
      const value = JSON.parse(decryptedValue ?? "");
      setParsedValue(value.value);
      setChecker(true);
    } else {
      if (router.pathname.includes("payment-success")) {
        router.push("/");
      }
    }
  }, [confirmValue]);

  if (checker) {
    if (router.pathname.includes("payment-success")) {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const finalIntent = urlParams.get("payment_intent");
        if (parsedValue !== finalIntent) {
          router.push("/");
        }
      }
    }
  }

  useEffect(() => {
    if (!router.pathname.includes("payment-success")) {
      clearSessionItem();
    }
  }, [router.pathname]);
};
