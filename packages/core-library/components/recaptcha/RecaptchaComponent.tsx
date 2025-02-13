import React, { forwardRef, useEffect, useState } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';
import { ComponentLoader } from '../ComponentLoader';
import { Box } from '@mui/material';

export const RecaptchaComponent = forwardRef<ReCAPTCHA, ReCAPTCHAProps>(
  (props, ref) => {
    const [isRecaptchaVisible, setIsRecaptchaVisible] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        const recaptchaFrame = document.querySelector(
          "iframe[title='reCAPTCHA']"
        );
        if (recaptchaFrame) {
          setIsRecaptchaVisible(true);
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <Box mt={2} position='relative'>
        {!isRecaptchaVisible && <ComponentLoader />}
        <div style={{ visibility: isRecaptchaVisible ? 'visible' : 'hidden' }}>
          <ReCAPTCHA {...props} ref={ref as React.RefObject<ReCAPTCHA>} />
        </div>
      </Box>
    );
  }
);
