import React, { useMemo } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Button, TextField } from "core-library/components";
import { useShowPassword } from "./useShowPassword";
import { ValidationIndicators } from "./ValidationIndicator";
import {
  ChangePasswordSchema,
  ChangePasswordType,
  validatePassword,
} from "@/core/Schema";
import Image from "next/image";
import { ChangePasswordBG, NCLEXBlueLogo } from "core-library/assets";
import { ChangePasswordLock } from "../../../icons/ChangePasswordLock";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
  const { showPassword, showconfirmPassword } = useShowPassword();

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
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen p-6 mt-10 lg:mt-0 flex items-center lg:p-12 justify-center flex-col bg-white rounded-md lg:w-[39rem] lg:h-[44.625rem]">
        <div
          className="w-full flex items-center justify-end text-darkBlue text-xl cursor-pointer  z-10"
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <span className="pt-sans-narrow-regular ml-1 underline">
            Back to login
          </span>
        </div>
        <div className="text-center mb-5 flex items-center justify-center flex-col">
          <ChangePasswordLock />
          <h1 className="pt-sans-bold text-3xl font-bold text-[#0F2A71] leading-3 mt-4">
            Set new password
          </h1>
        </div>
        <div className="text-center mb-5 text-darkGray">
          <p className="text-[#606060] pt-sans-narrow-regular text-xl">
            Please enter a new password. Ensure that your new password is
            different from the previous one for better security.
          </p>
        </div>
        <FormProvider {...form}>
          <Image
            src={ChangePasswordBG}
            alt="ChangePassword BG..."
            style={{ position: "absolute", zIndex: 0 }}
            className="w-[1000px]"
          />
          <div className="hidden lg:block">
            <Image
              src={NCLEXBlueLogo}
              alt="ChangePassword BG..."
              style={{ position: "absolute", zIndex: 0, bottom: 40, right: 60 }}
            />
          </div>
          <Stack className="w-full gap-2">
            <span className="pt-sans-narrow-bold text-[#0F2A71] text-xl">
              New Password
            </span>
            <TextField
              control={control}
              name="newPassword"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              sx={{ borderRadius: "10px", border: "1px solid #0F2A71" }}
              inputProps={{ style: { padding: 20, borderRadius: "10px" } }}
            />
            <span className="pt-sans-narrow-bold text-[#0F2A71] text-xl mt-4">
              Confirm Password
            </span>
            <TextField
              control={control}
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showconfirmPassword ? "text" : "password"}
              sx={{ borderRadius: "10px", border: "1px solid #0F2A71" }}
              inputProps={{ style: { padding: 20, borderRadius: "10px" } }}
            />
            <Grid item xs={12} sx={{ marginY: 2 }}>
              <p className="text-[#E92828] pt-sans-narrow-bold text-xl mb-2">
                Must contain at least
              </p>
              <ValidationIndicators
                criteria={passwordCriteria}
                iconSize="medium"
                invalidColor="red"
                validColor="green"
              />
            </Grid>
            <Box
              sx={{
                gridColumn: "span 10",
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <div className="mt-10 w-full">
                <Button
                  disabled={!isValid || submitLoading}
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    py: 2,
                    backgroundColor: "#0F2A71",
                    borderRadius: "0.625rem",
                  }}
                  className="hover:bg-hoverBlue"
                  onClick={handleSubmit(onSubmit)}
                >
                  Change Password
                </Button>
              </div>
            </Box>
          </Stack>
        </FormProvider>
      </div>
    </section>
  );
};
