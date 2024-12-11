/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  Button,
  ControlledCheckbox,
  EvaIcon,
  IconButton,
  PasswordToggleAdornment,
  RecaptchaComponent,
  TextField,
} from "core-library/components";
import React, { RefObject, useEffect, useMemo, useState } from "react";
import { RegistrationFormType, registrationSchema } from "core-library/system";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useShowPassword } from "../ForgotPasswordBlock/ChangePasswordBlock/useShowPassword";
import { usePreviousValue } from "core-library/hooks";
import { RegisterBG } from "core-library/assets";
import ReCAPTCHA from "react-google-recaptcha";
import { validatePassword } from "@/core/Schema";
import ValidationIndicators from "../ForgotPasswordBlock/ChangePasswordBlock/ValidationIndicator";

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormType, token: string) => void;
  submitLoading?: boolean;
  handleBack: () => void;
  recaptchaRef: RefObject<ReCAPTCHA>;
  siteKey: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  submitLoading,
  handleBack,
  recaptchaRef,
  siteKey,
}) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const form = useForm<RegistrationFormType>({
    mode: "onSubmit",
    resolver: yupResolver(registrationSchema),
    defaultValues: registrationSchema.getDefault(),
  });

  const { control, watch, resetField, handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;

  const hasNoMiddleName = watch("hasNoMiddleName");
  const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName);

  const newPassword = watch("password", "");
  const confirmPassword = watch("confirmpassword", "");

  const validationChecks = useMemo(
    () => validatePassword(newPassword),
    [newPassword]
  );

  const isPasswordMatching = useMemo(
    () => newPassword === confirmPassword && newPassword !== "",
    [newPassword, confirmPassword]
  );

  const passwordCriteria = useMemo(
    () => [
      {
        isValid: isPasswordMatching,
        message: isPasswordMatching
          ? "Passwords match"
          : "Passwords do not match",
      },
    ],
    [validationChecks, isPasswordMatching]
  );

  useEffect(() => {
    resetField("middlename");
  }, [hasNoMiddleName, hasNoMiddleNamePrevValue, resetField]);

  const {
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
  } = useShowPassword();

  async function onFormSubmit(values: RegistrationFormType) {
    if (!captchaToken) {
      console.error("reCAPTCHA verification failed.");
      return;
    }

    await onSubmit(values, captchaToken);
  }

  return (
    <React.Fragment>
      <Box className="w-full h-auto flex justify-around">
        <Box className="w-full lg:w-1/2 flex flex-col gap-8 px-12 py-8 justify-between h-screen">
          <Box className="w-full flex justify-between items-center">
            <IconButton onClick={handleBack} size="small">
              <EvaIcon
                id="back-icon"
                name="arrow-ios-back-outline"
                width={30}
                height={30}
                ariaHidden
              />
            </IconButton>
            <h4 className="text-[18px] font-regular font-ptSans">
              Already have an account?{" "}
              <span className="text-[18px] font-bold underline font-mainBlue">
                <Link href="/login">Login</Link>
              </span>
            </h4>
          </Box>

          <Box className="flex flex-col leading-none text-center">
            <h4 className="text-[22px] md:text-[32px] font-ptSans font-bold uppercase text-mainBlue">
              Start Your NCLEX Journey
            </h4>
            <p className="text-[16px] md:text-[18px] font-ptSansNarrow font-regular">
              Register now to prepare for your nursing board exam and succeed in
              your career!
            </p>
          </Box>

          <Box className="flex flex-col">
            <FormProvider {...form}>
              <Box className="flex flex-col gap-2">
                <Box className="flex flex-col gap-2">
                  <Box className="w-full flex flex-col lg:flex-row gap-2">
                    <Box className="flex flex-col lg:flex-row w-full gap-2">
                      <Box className="w-full">
                        <TextField
                          label="First Name"
                          control={control}
                          name="firstname"
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                          }}
                          inputProps={{
                            style: { padding: 15, borderRadius: "10px" },
                          }}
                        />
                      </Box>
                      <Box className="flex flex-col w-full">
                        <TextField
                          label="Middle Initial (optional)"
                          control={control}
                          name="middlename"
                          disabled={hasNoMiddleName}
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                          }}
                          inputProps={{
                            style: { padding: 15, borderRadius: "10px" },
                          }}
                        />
                        <ControlledCheckbox
                          control={control}
                          name="hasNoMiddleName"
                          label="I do not have a middle initial"
                          sx={{ fontSize: 12, lineHeight: 1.2 }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="flex flex-col lg:flex-row w-full gap-2">
                    <Box className="w-full">
                      <TextField
                        label="Last Name"
                        control={control}
                        name="lastname"
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        inputProps={{
                          style: { padding: 15, borderRadius: "10px" },
                        }}
                      />
                    </Box>

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
                  </Box>

                  <Box className="flex flex-col lg:flex-row gap-2 w-full">
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
                      {confirmPassword && (
                        <ValidationIndicators
                          criteria={passwordCriteria}
                          iconSize="small"
                          invalidColor="red"
                          validColor="green"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box className="flex flex-col">
                  <ControlledCheckbox
                    name="termsofservice"
                    label="I accept Terms of Service and Privacy Policy"
                    sx={{ fontSize: "14px" }}
                  />

                  <ControlledCheckbox
                    name="consent"
                    label="I consent to the collection and use of my personal information as described in the Privacy Policy and agree to the Terms of Service"
                    sx={{ fontSize: "14px" }}
                  />
                </Box>

                <Button
                  disabled={
                    !isDirty || !isValid || submitLoading || !captchaToken
                  }
                  loading={submitLoading}
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    py: 2,
                    backgroundColor: "#0F2A71",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#00173F",
                    },
                    marginY: "10px",
                  }}
                  onClick={handleSubmit(onFormSubmit)}
                >
                  <span className="font-ptSans font-bold">Create Account</span>
                </Button>
              </Box>
              <RecaptchaComponent
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={(token) => {
                  setCaptchaToken(token);
                }}
              />
            </FormProvider>
          </Box>
        </Box>

        <Box className="bg-peach lg:w-1/2 hidden lg:flex items-center justify-center">
          <Image
            src={RegisterBG}
            alt="registration page"
            className="object-cover object-left w-[500px] h-[450px] shadow-2xl"
            style={{ borderRadius: "35% 65% 65% 35% / 35% 34% 66% 65% " }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
