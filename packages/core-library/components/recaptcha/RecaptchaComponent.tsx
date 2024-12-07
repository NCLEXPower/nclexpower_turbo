import React, { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaComponentProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
  recaptchaRef?: RefObject<ReCAPTCHA>;
}

export const RecaptchaComponent: React.FC<RecaptchaComponentProps> = ({
  recaptchaRef,
  siteKey,
  onVerify,
}) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={onVerify} />
    </div>
  );
};
