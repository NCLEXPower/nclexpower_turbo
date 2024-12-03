import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  siteKey: string;
  onVerify: (token: string | null) => void;
}

export const RecaptchaComponent = forwardRef<ReCAPTCHA, Props>(
  ({ siteKey, onVerify }, ref) => {
    return (
      <div style={{ marginTop: "10px" }}>
        <ReCAPTCHA sitekey={siteKey} ref={ref} onChange={onVerify} />
      </div>
    );
  }
);
