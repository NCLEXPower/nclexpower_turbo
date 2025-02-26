/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  EvaIcon,
  PasswordToggleAdornment,
  TextField,
  Link,
} from "core-library/components";
import { useShowPassword } from "./useShowPassword";
import { ValidationIndicators } from "./ValidationIndicator";
import {
  ChangePasswordSchema,
  ChangePasswordType,
  validatePassword,
} from "@/core/Schema";
import Image from "next/image";
import {
  ChangePasswordLeftColumn,
  ChangePasswordLockIcon,
} from "core-library/assets";

interface ChangePasswordFormProps {
  submitLoading?: boolean;
  onSubmit: (values: ChangePasswordType) => void;
  handleBack: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  submitLoading,
  handleBack,
}) => {
  const {
    showPassword,
    showconfirmPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
  } = useShowPassword();

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordSchema.getDefault(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = form;

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

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
        isValid: validationChecks.isLengthValid,
        message: "Minimum 6 characters",
      },
      {
        isValid: validationChecks.containsNumber,
        message: "Contains a number",
      },
      {
        isValid: validationChecks.containsUppercase,
        message: "Contains an uppercase letter",
      },
      { isValid: isPasswordMatching, message: "Password must match" },
    ],
    [validationChecks, isPasswordMatching]
  );

  return (
    <div className="w-screen  min-h-screen h-fit flex flex-col items-center lg:justify-center">
      <div className=" flex w-full h-full">
        <div className="hidden lg:block p-3 lg:w-4/12 lg:h-screen">
          <Image
            src={ChangePasswordLeftColumn}
            alt="ChangePassword BG..."
            className="w-full h-full object-fill"
          />
        </div>

        <div className="flex items-center w-full   flex-col-reverse  lg:w-8/12 lg:min-h-screen">
          <div className="w-full px-16 lg:p-3 h-full flex items-center justify-center flex-col rounded-md lg:mt-0 lg:px-12  ">
            <div className="space-y-12 lg:space-y-20 md:w-10/12  lg:w-8/12 xl:w-6/12 ">
              <div className="text-left  space-y-8">
                <h1 className="pt-sans-bold text-[40px] text-[#232323] font-bold leading-3 mt-4">
                  Set New <span className="text-[#0F2A71] ">Password</span>
                </h1>
                <p className="text-[#969696] pt-sans-narrow-regular text-lg lg:text-xl">
                  Set a strong new password to protect your account. Ensure it’s
                  unique and different from your previous password to maximize
                  security.
                </p>
              </div>

              <div className="w-full h-fit flex flex-col items-center justify-start ">
                <FormProvider {...form}>
                  <Stack className="w-full  ">
                    <TextField
                      control={control}
                      name="newPassword"
                      placeholder="New Password"
                      type={showPassword ? "text" : "password"}
                      sx={{
                        borderRadius: "10px",
                        border: " 1px solid #D9D9D9",
                        marginBottom: "12px",
                      }}
                      endAdornment={
                        <PasswordToggleAdornment
                          showPassword={showPassword}
                          onClick={handleClickShowPassword}
                        />
                      }
                      inputProps={{
                        style: { padding: 20, borderRadius: "10px" },
                      }}
                    />

                    <TextField
                      control={control}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type={showconfirmPassword ? "text" : "password"}
                      sx={{ borderRadius: "10px", border: "1px solid #D9D9D9" }}
                      endAdornment={
                        <PasswordToggleAdornment
                          showPassword={showconfirmPassword}
                          onClick={handleClickShowconfirmPassword}
                        />
                      }
                      inputProps={{
                        style: { padding: 20, borderRadius: "10px" },
                      }}
                    />
                    <Box>
                      <h2 className="block lg:hidden my-6 font-normal font-ptSansNarrow text-[#969696]">
                        Passowrd Requirements
                      </h2>
                      <ValidationIndicators
                        criteria={passwordCriteria}
                        iconSize="medium"
                        invalidColor="red"
                        validColor="green"
                      />
                    </Box>
                    <Box
                      sx={{
                        gridColumn: "span 10",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <div className="w-full mt-6 space-y-6">
                        <Button
                          disabled={!isValid || submitLoading}
                          variant="contained"
                          fullWidth
                          sx={{
                            px: 4,
                            py: 2,
                            backgroundColor: "#0F2A71",
                            borderRadius: "10px",
                          }}
                          className="hover:bg-hoverBlue"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Submit
                        </Button>

                        <p className="text-lg text-center text-[#6E6E6E] font-ptSansNarrow">
                          If you need assistance,{" "}
                          <Link
                            href="/contact"
                            className="text-[#0F2A71] font-bold underline"
                          >
                            contact
                          </Link>{" "}
                          our support team for help.
                        </p>
                      </div>
                    </Box>
                  </Stack>
                </FormProvider>
              </div>
            </div>
          </div>

          <Image
            src={ChangePasswordLockIcon}
            alt="ChangePassword BG..."
            className="block lg:hidden w-[97px] mt-6 mb-12 h-[74px] "
          />
          <div
            className="w-full flex py-6 pr-12 lg:pr-24 items-start   justify-end text-darkBlue text-xl cursor-pointer z-10"
            onClick={handleBack}
          >
            <div className="flex items-center justify-center ">
              <EvaIcon
                id="back-icon"
                name="arrow-ios-back-outline"
                fill="#0F2A71"
                width={30}
                height={30}
                ariaHidden
              />
              <span className="pt-sans-narrow-regular ml-1 underline text-[#0F2A71]">
                Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
