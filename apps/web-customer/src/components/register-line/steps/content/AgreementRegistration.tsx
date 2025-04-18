import { Box } from '@mui/material';
import {
  Button,
  ControlledCheckbox,
  EvaIcon,
  IconButton,
  RecaptchaComponent,
} from 'core-library/components';
import {
  RegistrationAtom,
  RegistrationFormType,
  registrationSchema,
} from './validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useRegistrationWalkthroughFormContext } from '../../RegistrationWalkthroughContext';
import { useActiveSteps, useDownloadPDF } from 'core-library/hooks';
import { useResetOnRouteChange } from 'core-library/core/hooks/useResetOnRouteChange';

interface Props {
  nextStep(values: Partial<RegistrationFormType>): void;
  next: () => void;
  values: Partial<RegistrationFormType>;
  previousStep(): void;
  previous: () => void;
  reset: () => void;
  resetStep: () => void;
}

export const AgreementRegistration: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const [registrationDetails, setRegistrationDetails] = useAtom(RegistrationAtom);
  const { onSubmit, isLoading, recaptchaRef, siteKey } =
    useRegistrationWalkthroughFormContext();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const form = useForm<RegistrationFormType>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      ...registrationDetails,
    },
  });

  const { control, formState, handleSubmit, watch } = form;
  const { isDirty, isValid } = formState;
  const { reset: resetActiveStep } = useActiveSteps(0);

  useResetOnRouteChange({ resetStep: resetActiveStep });
  
  const agreement = watch('termsofservice');

  async function onFormSubmit(values: RegistrationFormType) {
    const data = { ...registrationDetails, ...values };
  
    if (!captchaToken) {
      console.error("reCAPTCHA verification failed.");
      return;
    }
  
    try {
      const result = await onSubmit(data, captchaToken);
  
      if (!result || result.status !== 200) {
          setRegistrationDetails((prev) => ({
            ...prev,
            email: "",
          }));
          previous();
          previousStep();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  const { downloadPdf } = useDownloadPDF();

  const handleDownloadPDF = (policyType: number) => {
    downloadPdf(policyType);
  };

  return (
    <div>
      <Box className='flex flex-col'>
        <Box className='flex items-center'>
          <ControlledCheckbox control={control} name='termsofservice' />
          <Typography
            sx={{
              fontFamily: 'PT Sans Narrow',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '2.25rem',
              color: '#0F2A71',
              marginLeft: -3,
            }}
          >
            I accept{' '}
            <span className='text-darkBlue font-bold underline'>
              <a
                href='#'
                className='!bg-transparent !focus:bg-transparent !active:bg-transparent 
             !ring-0 !focus:outline-none !border-transparent'
                onClick={() => handleDownloadPDF(0)}
              >
                Terms of Service
              </a>
            </span>{' '}
            and{' '}
            <span className='text-darkBlue font-bold underline'>
              <a
                href='#'
                className='!bg-transparent !focus:bg-transparent !active:bg-transparent 
             !ring-0 !focus:outline-none !border-transparent'
                onClick={() => handleDownloadPDF(1)}
              >
                Privacy Policy
              </a>
            </span>
          </Typography>
        </Box>
        {!agreement && (
          <Typography
            sx={{
              color: '#bd321c',
              fontFamily: 'PT Sans Narrow',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            You must read and accept the Terms of Service and Privacy Policy
          </Typography>
        )}
      </Box>
      <div className='flex items-center w-full gap-2'>
        <IconButton
          sx={{
            backgroundColor: '#0F2A71',
            borderRadius: '10px',
            padding: '12px',
            '&:hover': {
              backgroundColor: '#0F2A7195',
            },
          }}
          onClick={handlePrevious}
        >
          <EvaIcon
            name='arrow-back-outline'
            fill='#fff'
            width={25}
            height={25}
            ariaHidden
          />
        </IconButton>
        <Button
          disabled={!isDirty || !isValid || !captchaToken || !agreement}
          loading={isLoading}
          variant='contained'
          sx={{
            width: '85%',
            px: 4,
            py: 2,
            backgroundColor: '#0F2A71',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#00173F',
            },
            marginY: '10px',
          }}
          onClick={handleSubmit(onFormSubmit)}
        >
          <span className='font-ptSans font-bold'>Create Account</span>
        </Button>
      </div>

      <RecaptchaComponent
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={(token) => {
          setCaptchaToken(token);
        }}
      />
    </div>
  );
};
