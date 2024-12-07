import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

type ReCAPTCHARef = InstanceType<typeof ReCAPTCHA>;

function RecaptchaComponent(
  { siteKey, onVerify }: RecaptchaProps,
  ref: React.Ref<ReCAPTCHARef>
) {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReCAPTCHA
        ref={ref}
        sitekey={siteKey}
        onChange={onVerify}
      />
    </div>
  );
}

export default forwardRef<ReCAPTCHARef, RecaptchaProps>(RecaptchaComponent);