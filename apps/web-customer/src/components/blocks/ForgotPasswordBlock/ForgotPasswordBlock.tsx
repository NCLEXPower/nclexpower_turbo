import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useState } from "react";
import { ForgotPasswordAtom, ForgotPasswordType } from "../../../core/Schema";
import { useRouter } from "core-library/core/router";
import { useApiCallback } from "core-library/hooks";
import { useAtom } from "jotai";
import { useExecuteToast } from "core-library/contexts";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";
import { ResendCodeParams } from "core-library/api/types";

export function ForgotPasswordFormBlock() {
  const [, setAtomEmail] = useAtom(ForgotPasswordAtom);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [showAlert, setshowAlert] = useState<boolean>(false);
  const { setResetTime, resetTime } = useOtpVerification();
  const { executeToast } = useExecuteToast();
  const router = useRouter();

  const emailCb = useApiCallback(
    async (api, args: { email: string }) =>
      await api.web.web_select_email(args.email)
  );
  const resetLinkCb = useApiCallback(
    async (api, args: ResendCodeParams) => await api.web.web_reset_link(args)
  );

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      submitLoading={emailCb.loading || resetLinkCb.loading || router.loading}
      isExpired={isExpired}
      showAlert={showAlert}
      resetTime={resetTime}
    />
  );

  async function handleSubmit(values: ForgotPasswordType) {
    try {
      const result = await emailCb.execute({ email: values.email });
      if (result.data.isExpired) {
        setIsExpired(result.data.isExpired);
      }

      if (!result.data.accountIsFound) {
        executeToast(
          "The account you are trying to access is not found.",
          "top-right",
          false,
          { type: "error" }
        );
      }

      if (
        result.data.accountIsFound &&
        result.data.proceed &&
        !result.data.isExpired
      ) {
        setIsExpired(result.data.isExpired);
        setAtomEmail(values);
        const resetLinkResult = await resetLinkCb.execute({
          email: values.email,
        });
        if (resetLinkResult.data.responseCode === 508) {
          const minutes = resetLinkResult.data.waitTimeInMinutes * 60;
          setResetTime(minutes);
          setshowAlert(false);
          executeToast(
            `Something went wrong. Please try again later.`,
            "top-right",
            false,
            { type: "error" }
          );
          return;
        }
        setshowAlert(true);
        await router.push((route) => route.reset_link_success);
      }
    } catch (error) {
      console.error(error);
      executeToast(
        `Something went wrong. Please try again later.`,
        "top-right",
        false,
        { type: "error" }
      );
      return;
    }
  }
}
