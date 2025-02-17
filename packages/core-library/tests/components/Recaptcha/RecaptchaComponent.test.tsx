import { render, screen, waitFor } from '@testing-library/react';
import { RecaptchaComponent } from '../../../components';
import React from 'react';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    processEnv: {},
  },
}));

beforeAll(() => {
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

  it('should clear interval when component unmounts', async () => {
    const { unmount } = render(
      <RecaptchaComponent sitekey='your-sitekey-here' />
    );
    unmount();
    await waitFor(() => expect(clearInterval).toHaveBeenCalled());
  });

  it('should append the script to the document when the recaptcha is not present', () => {
    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    const script = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    );
    expect(script).toBeInTheDocument();
  });

  it('should set isRecaptchaLoaded to true when recaptcha is ready', async () => {
    const setStateMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setStateMock]);

    render(<RecaptchaComponent sitekey='your-sitekey-here' />);

    await waitFor(() => {
      expect(setStateMock).toHaveBeenCalledWith(true);
    });

    jest.restoreAllMocks();
  });
});
