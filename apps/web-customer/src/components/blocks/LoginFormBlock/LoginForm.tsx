/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import React, { useEffect } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginFormType, loginSchema } from "core-library/system";
import { Checkbox } from "core-library/components/Checkbox/Checkbox";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { TextField } from "core-library/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useShowPassword } from "../ForgotPasswordBlock/ChangePasswordBlock/useShowPassword";
import { useClientSecretKey } from "core-library/contexts";
import { SavedDataProps } from "./LoginFormBlock";
import { Button } from "core-library/components";
import CoreZigma from "../../images/CoreZigma.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import Image from "next/image";
import { LoginBG } from "core-library/assets";
import { useKeyDown } from "core-library/hooks/useKeyDown";
import { useResolution } from "core-library/hooks";

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
  rememberMe: boolean;
  handleChangeRememberMe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  savedData: SavedDataProps | null;
  handleBack: () => void;
  signInWithGoogle: () => void;
};

export const LoginForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  rememberMe,
  handleChangeRememberMe,
  savedData,
  handleBack,
  signInWithGoogle,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { handleForgotPasswordClick } = useClientSecretKey();
  const { showPassword, handleClickShowPassword } = useShowPassword();
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (savedData) {
      setValue("email", savedData.email);
      setValue("password", savedData.password);
    }
  }, [savedData, setValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const {isMobile} = useResolution();

  useKeyDown("Enter", () => handleSubmit(onSubmit)());

  return (
    <div className="flex items-center justify-between w-full h-screen">
      <div className="hidden xl:flex lg:flex">
        <Box
          component={Image}
          src={LoginBG}
          alt="CoreZigma"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            border: "8px solid white",
            borderRadius: "24px",
            zIndex: -1,
            "@media (max-width: 1600px)": {
              width: "650px",
            },
            "@media (min-width: 1550px)": {
              width: "825px",
            },
          }}
        />
        <Box className="flex z-0 items-center justify-center">
          <div className="flex items-center justify-center h-screen flex-col lg:px-24">
            <h4 className="pt-sans-caption-bold text-[3rem] text-white mb-2 z-1">
              Welcome to <span className="text-yellow">NCLEX Power</span>
            </h4>
            <h5 className="pt-sans-regular text-white text-[1.5rem]">
              Pass the NCLEX with our CORE Zigma Review System.
            </h5>
          </div>
        </Box>
      </div>
      <div className="w-full lg:w-[40rem] xl:w-[68rem] px-12 xl:px-60 lg:px-24">
        <div
          className="flex items-center justify-end cursor-pointer text-darkBlue"
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <span className="pt-sans-narrow-regular ml-1 underline">Back</span>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center">
            <Image
              src={CoreZigma}
              className="smaller-screen"
              alt="CoreZigma"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                display: isMobile ? "none" : "flex",
              }}
            />
          </div>
          <div className="">
            <h5 className="pt-sans-bold text-4xl pt-sans-regular mb-2">
              Login
            </h5>
            <p className="pt-sans-narrow-regular font-light text-darkGray text-lg">
              Please login to continue to your account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item lg={12}>
                <TextField
                  name="email"
                  control={control}
                  placeholder="Email"
                  sx={{ borderRadius: "10px" }}
                  inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
                />
              </Grid>
              <Grid
                item
                lg={12}
                sx={{
                  marginY: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ position: "relative", width: "100%" }}>
                  <TextField
                    control={control}
                    name="password"
                    placeholder="Password"
                    sx={{ borderRadius: "10px", width: "100%" }}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                    inputProps={{
                      style: {
                        boxShadow: "none",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <div className="my-4 flex items-center justify-between">
                <Checkbox
                  checked={rememberMe}
                  onChange={handleChangeRememberMe}
                  label="Remember me"
                  sx={{ borderRadius: 4 }}
                />
                <Typography
                  onClick={handleForgotPasswordClick}
                  className="ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer"
                  component="span"
                >
                  Forgot Password?
                </Typography>
              </div>
              <div className="gap-4 flex items-center">
                <Button
                  disabled={submitLoading}
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
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <span className="pt-sans-narrow-bold text-lg normal-case">
                    Sign In
                  </span>
                </Button>
              </div>
              <div className="flex items-center my-4">
                <span className="h-px flex-1 bg-slate-300"></span>
                <span className="shrink-0 px-3 pt-sans-narrow-regular">or</span>
                <span className="h-px flex-1 bg-slate-300"></span>
              </div>
              <div className="flex items-center justify-center w-full">
                <Button
                  sx={{
                    paddingY: 1.5,
                    borderRadius: "10px",
                    boxShadow: 2,
                    borderColor: "darkGray",
                  }}
                  fullWidth
                  variant="outlined"
                  onClick={signInWithGoogle}
                >
                  <span className="mr-4 pt-sans-narrow-regular text-lg text-black normal-case ">
                    Sign in with Google
                  </span>
                  <GoogleIcon />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-6 pt-sans-narrow-regular text-xl">
                <p className="text-darkGray">Need an account?</p>
                <Link
                  href="/#pricing"
                  className="ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer "
                >
                  Create One
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

