import React from "react";
import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";

export interface RecaptchaComponentProps extends ReCAPTCHAProps {}

export const RecaptchaComponent = React.forwardRef<ReCAPTCHA, RecaptchaComponentProps>(
  (props, ref) => {
    return <ReCAPTCHA {...props} ref={ref} />;
  }
);