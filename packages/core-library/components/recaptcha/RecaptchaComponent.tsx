import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  siteKey: string;
  onVerify: (token: string | null) => void;
}

function RecaptchaComponentInner(
  { siteKey, onVerify }: Props,
  ref: React.Ref<ReCAPTCHA>
) {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReCAPTCHA sitekey={siteKey} ref={ref as any} onChange={onVerify} />
    </div>
  );
}

export const RecaptchaComponent = forwardRef<ReCAPTCHA, Props>(RecaptchaComponentInner);
