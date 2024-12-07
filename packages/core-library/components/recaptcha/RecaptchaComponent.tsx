import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaComponentProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

export const RecaptchaComponent = forwardRef<
  ReCAPTCHA,
  RecaptchaComponentProps
>(({ siteKey, onVerify }, ref) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReCAPTCHA ref={ref as any} sitekey={siteKey} onChange={onVerify} />
    </div>
  );
});
