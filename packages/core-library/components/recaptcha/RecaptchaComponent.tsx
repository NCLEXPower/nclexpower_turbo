import React, { forwardRef } from "react";
import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";

export const RecaptchaComponent = forwardRef<ReCAPTCHA, ReCAPTCHAProps>(
  (props, ref) => {
    return (
      <div style={{ marginTop: "10px" }}>
        <ReCAPTCHA
          {...props}
          ref={ref as React.RefObject<ReCAPTCHA>}
        />
      </div>
    );
  }
);