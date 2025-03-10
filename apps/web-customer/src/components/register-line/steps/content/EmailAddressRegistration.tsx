import { Box } from '@mui/material'
import { Button, EvaIcon, IconButton, PasswordToggleAdornment, TextField } from 'core-library/components'
import React from 'react'
import { useForm } from "react-hook-form";
import {
  EmailRegistrationFormType,
  emailRegistrationSchema,
  RegistrationAtom,
  RegistrationFormType,
  registrationSchema
} from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationIndicators from '@/components/blocks/ForgotPasswordBlock/ChangePasswordBlock/ValidationIndicator';
import { useAtom } from 'jotai';
import { useRegistrationWalkthroughFormContext } from '../../RegistrationWalkthroughContext';

interface Props {
  nextStep(values: Partial<RegistrationFormType>): void;
  next: () => void;
  values: Partial<RegistrationFormType>;
  previousStep(): void;
  previous: () => void;
  reset: () => void;
}

export const EmailAddressRegistration = ({
  next,
  nextStep,
  previousStep,
  previous,
  reset,
}: Props) => {
  const [registrationDetails, setRegistrationDetails] = useAtom(RegistrationAtom);
  const {
    passwordCriteria,
    passwordLimitCriteria,
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword
  } = useRegistrationWalkthroughFormContext();

  const methods = useForm<EmailRegistrationFormType>({
    resolver: yupResolver(emailRegistrationSchema),
    defaultValues: {
      email: registrationDetails.email || "",
      password: registrationDetails.password || "",
      confirmpassword: registrationDetails.confirmpassword || "",
    },
  });
  const { control, handleSubmit, watch } = methods;

  const newPassword = watch("password");
  const confirmPassword = watch("confirmpassword");
  const passwordLimit = newPassword.length <= 8 && newPassword.length > 1;
  const showError = confirmPassword && confirmPassword !== methods.getValues("password");

  async function handleNextStep(values: EmailRegistrationFormType) {
    const details = ({ ...values, ...registrationDetails });
    setRegistrationDetails(details);
    nextStep(details);
    next();
  }

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  return (
    <div className='flex flex-col w-full gap-2'>
      <Box className="w-full">
        <TextField
          label="Email Address"
          control={control}
          name="email"
          sx={{
            borderRadius: "10px",
            width: "100%",
          }}
          inputProps={{
            style: { padding: 15, borderRadius: "10px" },
          }}
        />
      </Box>
      <Box className="flex flex-col gap-2 w-full">
        <Box className="w-full">
          <TextField
            label="Password"
            control={control}
            name="password"
            sx={{ borderRadius: "10px", width: "100%" }}
            type={showPassword ? "text" : "password"}
            isregister
            endAdornment={
              <PasswordToggleAdornment
                showPassword={showPassword}
                onClick={handleClickShowPassword}
              />
            }
            inputProps={{
              style: {
                boxShadow: "none",
              },
            }}
          />
          {passwordLimit && (
            <ValidationIndicators
              criteria={passwordLimitCriteria}
              iconSize="small"
              invalidColor="red"
              validColor="green"
            />
          )}
        </Box>

        <Box className="w-full">
          <TextField
            label="Confirm Password"
            control={control}
            name="confirmpassword"
            sx={{ borderRadius: "10px", width: "100%" }}
            type={showconfirmPassword ? "text" : "password"}
            inputProps={{
              style: {
                boxShadow: "none",
              },
            }}
            endAdornment={
              <PasswordToggleAdornment
                showPassword={showconfirmPassword}
                onClick={handleClickShowconfirmPassword}
              />
            }
          />
          {showError && (
            <ValidationIndicators
              criteria={passwordCriteria}
              iconSize="small"
              invalidColor="red"
              validColor="green"
            />
          )}
        </Box>
        <div className="flex justify-end gap-2 py-4">
          <IconButton
            sx={{
              backgroundColor: "#0F2A71",
              borderRadius: "10px",
              padding: "14px",
              width: "60px",
              "&:hover": {
                backgroundColor: "#0F2A7195",
              }
            }}
            onClick={handlePrevious}
          >
            <EvaIcon
              name="arrow-back-outline"
              fill="#fff"
              width={20}
              height={20}
              ariaHidden
            />
          </IconButton>
          <Button
            disabled={!methods.formState.isValid}
            onClick={handleSubmit(handleNextStep)}
            sx={{
              py: 2,
              fontFamily: "PT Sans Narrow",
              fontWeight: "bold",
              backgroundColor: "#0f2a71",
              color: "#fff",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0f2a71",
                opacity: 0.9,
              },
            }}
          >
            Confirm
          </Button>
        </div>
      </Box>
    </div>
  )
}