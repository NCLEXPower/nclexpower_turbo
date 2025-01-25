/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useRouter } from "core-library/core/router";
import Image from "next/image";
import { useAtom } from "jotai";
import { ForgotPasswordAtom } from "@/core";
import { NotFoundBlock } from "../../NotFoundBlock/NotFoundBlock";
import { CoreZigmaLogo, resetLink } from "core-library/assets";
import { EvaIcon } from "core-library/components";
import { useApiCallback } from "core-library/hooks";
import { ResendCodeParams } from "core-library/api/types";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";
import { useExecuteToast } from "core-library/contexts";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface Props {}

export const ResetLinkBlock: React.FC<Props> = () => {
  const [email] = useAtom(ForgotPasswordAtom);
  const { openInNewTab, replace } = useRouter();
  const { setResetTime, resetTime } = useOtpVerification();
  const { showToast } = useExecuteToast();

  const resetLinkCb = useApiCallback(
    async (api, args: ResendCodeParams) => await api.web.web_reset_link(args)
  );

  const handleBack = () => {
    replace((route) => route.login);
  };

  const handleResendEmail = async () => {
    if (!email?.email || resetLinkCb.loading) return;

    try {
      const resetLinkResult = await resetLinkCb.execute({
        email: email?.email,
      });

      if (resetLinkResult.data.responseCode === 508) {
        const minutes = resetLinkResult.data.waitTimeInMinutes * 60;
        setResetTime(minutes);
        showToast(
          `You need to wait for ${resetLinkResult.data.waitTimeInMinutes} minutes before resending the reset link.`,
          "info"
        );
      } else if (resetLinkResult.status === 200) {
        showToast("Reset link sent successfully!", "success");
      } else {
        showToast("Failed to send the reset link. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      showToast("An unexpected error occurred. Please try again.", "error");
    }
  };

  const navigateToContact = () => {
    openInNewTab((route) => route.contact_us);
  }

  useEffect(() => {
    if (resetTime > 0) {
      const timer = setInterval(() => {
        setResetTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resetTime, setResetTime]);

  if (!email?.email) {
    return <NotFoundBlock />;
  }

  return (
    <div className="flex items-center justify-between w-full h-full">
      <div className="w-full hidden items-center justify-center ml-0 md:ml-20 lg:block">
        <Image src={resetLink} className="w-[850px] h-auto" alt="resetLink" />
      </div>
      <div className="flex flex-col text-center gap-7 justify-center min-h-screen bg-[#f3f4f8] md:px-10 w-35% w-full max-w-[600px]">
        <div className="px-10 p-20 space-y-5">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="text-center lg:text-left">
            <h4 className="text-[25px] font-ptSans font-bold text-[#0F2A71] md:text-[30px]">
              Password reset request sent
            </h4>
          </div>
          <div className="space-y-1">
            <h4 className="text-[18px] text-center lg:text-start justify-start font-ptSansNarrow font-regular text-[#393A3A]">
              We&apos;ve sent password reset instructions to :
            </h4>
            <p className="text-[18px] pt-sans-narrow rounded-md p-3 px-20 w-100px bg-[#e7eaf1] text-[#0F2A71]">
              {email?.email ?? "[[no-email]]"}
            </p>
            <div className="flex items-center">
              <p className="text-[16px] text-[#6D7081] font-ptSansNarrow font-regular md:text-left lg:text-[18px]">
                If you don&apos;t see the email, check other places it might be,
                like your junk, spam, or social folder, {resetLinkCb.loading ? " " : "or "}
                <button
                  disabled={resetTime !== 0 || resetLinkCb.loading}
                  onClick={handleResendEmail}
                  className={`${resetTime !== 0 ? "text-darkGray" : "text-[#0F2A71]"} font-ptSans font-bold text-[16px] lg:text-[16px]`}
                  style={{ outline: "none" }}
                  onFocus={(e) => e.target.style.outline = "none"}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {resetLinkCb.loading ? (
                    <CircularProgress
                      size={20}
                      color="inherit"
                      id="loader"
                      aria-live="assertive"
                      thickness={5}
                      sx={{ "&:focus": { outline: "none !important" }}}
                    />
                  ) : (
                    `send the email again ${resetTime !== 0 ? `in (${resetTime}s)` : ''}`
                  )}
                </button>
              </p>
            </div>
          </div>
          <div className="w-full p-4 flex items-center bg-[#D9D9D966] rounded-lg gap-4">
            <EvaIcon
              id="back-icon"
              name="question-mark-circle-outline"
              fill="#0F2A71"
              className="w-[40px] h-[40px]"
              ariaHidden
            />
            <div className="flex flex-col text-start">
              <h4 className="text-[16px] font-ptSans font-bold text-[#0F2A71] lg:text-[18px]">
                Need Help?
              </h4>
              <h4 className="text-[14px] font-ptSansNarrow font-regular lg:text-[16px]">
                Our customer support team is here for you.{" "}
                <span
                  onClick={navigateToContact}
                  className="cursor-pointer text-[14px] lg:text-[16px] text-darkBlue font-ptSans font-bold underline"
                >
                  Contact Support
                </span>
              </h4>
            </div>
          </div>
          <div>
            <div
              className="flex items-center justify-end cursor-pointer text-darkBlue mt-5"
              onClick={handleBack}
            >
              <EvaIcon
                id="back-icon"
                name="arrow-ios-back-outline"
                fill="#0F2A71"
                width={25}
                height={25}
                ariaHidden
              />
              <span className="text-[18px] font-ptSansNarrow font-bold ml-1 underline underline-offset-1">
                Return to login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
