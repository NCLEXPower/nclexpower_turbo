import React, { forwardRef, useEffect, useState } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';
import { AnimatedBoxSkeleton } from '../AnimatedBoxSkeleton/AnimatedSkeletonBox';

declare global {
  interface Window {
    grecaptcha?: {
      render: (...args: any[]) => void;
      getResponse: (...args: any[]) => string;
      reset: (...args: any[]) => void;
      ready: (callback: () => void) => void;
    };
  }
}

export const RecaptchaComponent = forwardRef<ReCAPTCHA, ReCAPTCHAProps>(
  (props, ref) => {
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsRecaptchaLoaded(true);
        });
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
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
      <div style={{ marginTop: '10px', position: 'relative' }}>
        {!isRecaptchaLoaded && (
          <AnimatedBoxSkeleton
            light
            data-testid='skeleton-loader'
            style={{ width: '302px', height: '76px' }}
          >
            Loading ...
          </AnimatedBoxSkeleton>
        )}
        {isRecaptchaLoaded && (
          <ReCAPTCHA {...props} ref={ref as React.RefObject<ReCAPTCHA>} />
        )}
      </div>
    );
  }
);
