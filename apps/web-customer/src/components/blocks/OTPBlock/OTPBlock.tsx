import OTPForm from "./OTPForm";
import { OTPType } from "../../../core/Schema";
import { useBeforeUnload } from "core-library/hooks";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";

const OTPBlock: React.FC = () => {
  const {
    loading,
    waitTime,
    resendLoading,
    executeVerify2faCb: nonSsoExecute,
    verificationPreparation,
    resendOtp,
    executeSsoVerify2faCb: ssoExecute,
    ssoDetails,
  } = useOtpVerification();

  useBeforeUnload(true);

  if (!verificationPreparation.email) {
    return <NotFoundBlock />;
  }

  return (
    <OTPForm
      onSubmit={handleSubmit}
      submitLoading={loading}
      resendRemainingTime={waitTime}
      onResend={handleResend}
      isResendLoading={resendLoading}
      email={verificationPreparation.email}
    />
  );

  async function handleSubmit(values: OTPType) {
    if (ssoDetails?.procedure === "sso") {
      await ssoExecute({
        email: verificationPreparation.email,
        code: values.otp,
      });
    }

    await nonSsoExecute({
      email: verificationPreparation.email,
      password: verificationPreparation.password,
      appName: verificationPreparation.appName,
      code: values.otp,
    });
  }

  async function handleResend() {
    await resendOtp({ email: verificationPreparation.email });
  }
};

export default OTPBlock;
