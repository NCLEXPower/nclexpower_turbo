import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

function RecaptchaComponent(
  { siteKey, onVerify }: RecaptchaProps,
  ref: React.Ref<ReCAPTCHA>
) {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReCAPTCHA ref={ref as React.Ref<any>} sitekey={siteKey} onChange={onVerify} />
    </div>
  );
}

export default forwardRef<ReCAPTCHA, RecaptchaProps>(RecaptchaComponent);
