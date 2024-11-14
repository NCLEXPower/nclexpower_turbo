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

interface Props {}

export const ResetLinkBlock: React.FC<Props> = () => {
  const [email] = useAtom(ForgotPasswordAtom);
  const router = useRouter();

  const handleBack = () => {
    router.replace((route) => route.login);
  };

  if (!email?.email) {
    return <NotFoundBlock />;
  }

  return (
    <div className="flex items-center justify-between w-full min-h-screen h-fit">
      <div className="w-full hidden items-center justify-center lg:p-28 lg:flex ml-20">
        <Image
          src={resetLink}
          style={{ width: "80%", height: "auto" }}
          alt="resetLink"
        />
      </div>
      <div className="flex flex-col text-center gap-7 justify-center min-h-screen h-fit pt-28 bg-[#f3f4f8] md:px-10 w-35%">
        <div className="px-10 lg:p-20 md:space-y-5">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-[28px] pt-sans-bold font-bold text-[#0F2A71] md:text-[30px]">
              Password reset request sent
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[18px] text-start justify-start pt-sans-narrow-regular text-[#393A3A]">
              We&apos;ve sent password reset instructions to :
            </p>
            <p className="text-[18px] pt-sans-narrow-bold rounded-md p-3 px-20 border-2 border-[#dddfeb] w-100px bg-[#e7eaf1] text-[#0F2A71]">
              {email?.email ?? "[[no-email]]"}
            </p>
            <p className="text-[18px] pt-sans-narrow-regular md:text-left">
              If you don&apos;t see the email, check other places it might be,
              like your junk, spam, or social folder, or{" "}
              <span className="text-[#0F2A71] pt-sans-narrow-bold">
                send the email again.
              </span>
            </p>
          </div>
          <div className="py-7">
            <div className="w-full px-4 py-1 flex items-center bg-[#D9D9D966] rounded-lg gap-4">
              <EvaIcon
                id="back-icon"
                name="question-mark-circle-outline"
                fill="#0F2A71"
                width={60}
                height={60}
                ariaHidden
              />
              <div className="text-start">
                <p className="text-[18px] pt-sans-narrow-bold text-[#0F2A71]">
                  Need Help?
                </p>
                <p>
                  Our customer support team is here for you. Contact Support
                </p>
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
                <span className="text-[18px] pt-sans-narrow-regular ml-1 underline underline-offset-1 pt-sans-narrow-bold">
                  Return to login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
