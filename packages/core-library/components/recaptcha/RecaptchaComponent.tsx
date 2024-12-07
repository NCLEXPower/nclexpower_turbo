import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

export const RecaptchaComponent = forwardRef<ReCAPTCHA, Props>(
  ({ siteKey, onVerify }, ref) => {
    return (
      <div style={{ marginTop: "10px" }}>
        <ReCAPTCHA
          sitekey={siteKey}
          ref={ref as React.MutableRefObject<ReCAPTCHA | null>}
          onChange={onVerify}
        />
      </div>
    );
  }
);

(RecaptchaComponent as React.FC).displayName = "RecaptchaComponent";
