import React, { forwardRef, useEffect, useState } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';
import { AnimatedBoxSkeleton } from '../AnimatedBoxSkeleton/AnimatedSkeletonBox';

export const RecaptchaComponent = forwardRef<ReCAPTCHA, ReCAPTCHAProps>(
  (props, ref) => {
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      const recaptchaScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_URL;

      if (!recaptchaScriptUrl) {
        console.error(
          'Google reCAPTCHA URL is not defined in environment variables.'
        );
        return;
      }

      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsRecaptchaLoaded(true);
        });
      } else {
        const script = document.createElement('script');
        script.src = recaptchaScriptUrl;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);
      }
    }, []);

    useEffect(() => {
      if (isScriptLoaded) {
        const checkRecaptcha = setInterval(() => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              setIsRecaptchaLoaded(true);
              clearInterval(checkRecaptcha);
            });
          }
        }, 500);

        return () => clearInterval(checkRecaptcha);
      }
    }, [isScriptLoaded]);

    return (
      <div
        style={{ marginTop: '10px', position: 'relative' }}
        data-testid='recaptcha'
      >
        {!isRecaptchaLoaded && (
          <AnimatedBoxSkeleton
            light
            data-testid='skeleton-loader'
            style={{ width: '302px', height: '76px' }}
          />
        )}
        {isRecaptchaLoaded && (
          <ReCAPTCHA {...props} ref={ref as React.RefObject<ReCAPTCHA>} />
        )}
      </div>
    );
  }
);
