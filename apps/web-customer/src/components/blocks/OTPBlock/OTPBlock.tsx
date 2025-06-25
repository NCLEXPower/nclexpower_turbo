import OTPForm from "./OTPForm";
import { OTPType } from "../../../core/Schema";
import { useApi, useOTPManager } from "core-library/hooks";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library";
import { useTwoFactorAuthenticationToken } from "core-library/contexts/auth/hooks";

const OTPBlock: React.FC = () => {
  const router = useRouter();
  const toast = useExecuteToast();
  const { loading, setSecurityMeasures } = useAuthContext();
  const [twoFactorAuthenticationToken] = useTwoFactorAuthenticationToken();
  const [state, actions] = useOTPManager();

  const getEmail = useApi(
    (api) =>
      twoFactorAuthenticationToken
        ? api.auth.getEmailFromTwoFactor()
        : Promise.resolve(null),
    [twoFactorAuthenticationToken]
  );

  if (getEmail.loading) return <p>Loading...</p>;

  if (!getEmail.result?.data) {
    return <NotFoundBlock />;
  }

  const resendOtp = async () => {
    try {
      const result = await actions.resendOTP();
      if (result) {
        toast.showToast("Successfully sent OTP code", "success");
      }
    } catch (err) {
      toast.showToast("Successfully sent OTP code", "error");
      console.error(`Something went wrong during resend code: ${err}`);
    }
  };

  return (
    <OTPForm
      onSubmit={handleSubmit}
      resendRemainingTime={state.remainingTime}
      onResend={resendOtp}
      loading={loading || getEmail.loading || state.loading}
      email={getEmail.result?.data}
    />
  );

  async function handleSubmit(values: OTPType) {
    try {
      await verifyOtp({ otp: values.otp });
    } catch (error) {
      console.error("Something went wrong during verify", error);
      toast.showToast(
        "Code is invalid or expired. Please resend or try again.",
        "error"
      );
    }
  }

  async function verifyOtp(values: { otp: string }) {
    try {
      const result = await actions.verifyOTP(values);
      if (result?.status === 200) {
        setSecurityMeasures(result.data, false);
        await router.push((route) => route.hub);
      }
    } catch (err: any) {
      console.error(
        `This OTP has already been used or expired. Please request a new one.`
      );
    }
  }
};

export default OTPBlock;
