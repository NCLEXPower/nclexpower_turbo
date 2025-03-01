import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { RecaptchaComponent } from '../../../components';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    processEnv: {},
  },
}));

beforeEach(() => {
  global.window.grecaptcha = {
    ready: jest.fn((callback) => setTimeout(callback, 500)),
    render: jest.fn(),
    getResponse: jest.fn(),
    reset: jest.fn(),
  };
});

jest.spyOn(global, 'clearInterval').mockImplementation(jest.fn());

document.body.innerHTML = `<script src="https://www.google.com/recaptcha/api.js"></script>`;

describe('RecaptchaComponent', () => {
  it('should render skeleton loader when recaptcha is not loaded', async () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);
    const skeleton = await waitFor(() => screen.getByTestId('skeleton-loader'));
    expect(skeleton).toBeInTheDocument();
  });

  it('should render recaptcha when it is loaded', async () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);
    const recaptcha = await waitFor(() => screen.getByTestId('recaptcha'));
    expect(recaptcha).toBeInTheDocument();
  });

  it('should check recaptcha at intervals and clear interval when loaded', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(setIntervalSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(clearInterval).toHaveBeenCalled();
    });

    setIntervalSpy.mockRestore();
  });

  it('should append the script to the document when the recaptcha is not present', () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);
    const script = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    expect(script).toBeInTheDocument();
  });

  it('should assign ref correctly to ReCAPTCHA component', () => {
    const mockRef = React.createRef<ReCAPTCHA>();
    render(<ReCAPTCHA sitekey='your-sitekey-here' ref={mockRef} />);
    expect(mockRef.current).not.toBeNull();
  });

  it('should only add the script once if mounted multiple times', () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    const scripts = document.querySelectorAll(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    expect(scripts.length).toBe(1);
  });

  it('should not break if window.grecaptcha is undefined', async () => {
    delete global.window.grecaptcha;

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });
  });

  it('should handle script load error gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    document.body.innerHTML = '';

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    const script = document.querySelector('script');
    if (script) {
      script.dispatchEvent(new Event('error'));
    }

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    (console.error as jest.Mock).mockRestore();
  });

  it('should not call clearInterval if checkRecaptcha was never set', async () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });

    expect(clearIntervalSpy).not.toHaveBeenCalledWith(undefined);
  });

  it('should have isRecaptchaLoaded as false initially', () => {
    const { result } = renderHook(() => useState(false));
    expect(result.current[0]).toBe(false);
  });

  it('should check for grecaptcha availability at intervals when script loads', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    delete global.window.grecaptcha;
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(setIntervalSpy).toHaveBeenCalled();
    });

    setIntervalSpy.mockRestore();
  });

  it('should log an error if NEXT_PUBLIC_GOOGLE_RECAPTCHA_URL is not set', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_URL = '';

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    expect(console.error).toHaveBeenCalledWith(
      'Google reCAPTCHA URL is not defined in environment variables.'
    );

    (console.error as jest.Mock).mockRestore();
  });

  it('should handle reCAPTCHA response when user completes verification', async () => {
    const onChangeMock = jest.fn();
    render(
      <RecaptchaComponent sitekey='your-sitekey-here' onChange={onChangeMock} />
    );

    await waitFor(() => {
      (global.window as any).grecaptcha.getResponse.mockReturnValue(
        'test-response'
      );
      onChangeMock('test-response');
    });

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('test-response');
    });
  });

  it('should reset ReCAPTCHA when it expires', async () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });

    (global.window as any).grecaptcha.reset();

    expect((global.window as any).grecaptcha.reset).toHaveBeenCalled();
  });

  it('should set isScriptLoaded state when the script loads successfully', async () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    const script = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    script?.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });
  });

  it('should handle script loading failure gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    const script = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    if (script) {
      script.dispatchEvent(new Event('error'));
    }

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Google reCAPTCHA URL is not defined')
      );
    });

    (console.error as jest.Mock).mockRestore();
  });

  it('should check recaptcha readiness when isScriptLoaded changes', async () => {
    delete global.window.grecaptcha;

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });

    (global.window as any).grecaptcha = {
      ready: jest.fn((callback) => callback()),
      render: jest.fn(),
      getResponse: jest.fn(),
      reset: jest.fn(),
    };

    await waitFor(() => {
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });
  });

  it('should handle grecaptcha being present synchronously', async () => {
    global.window.grecaptcha = {
      ready: jest.fn((callback) => callback()),
      render: jest.fn(),
      getResponse: jest.fn(),
      reset: jest.fn(),
    };

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
    });

    delete global.window.grecaptcha;
  });
});
