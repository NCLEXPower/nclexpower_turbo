/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import React, { useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
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
  const { isMobile } = useResolution();

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

  useKeyDown("Enter", () => handleSubmit(onSubmit)());

  return (
    <div className="flex items-center justify-center lg:justify-between w-full h-auto md:h-screen overflow-hidden">
      <div className="hidden xl:flex lg:flex">
        <Box
          component={Image}
          src={LoginBG}
          alt="CoreZigma"
          sx={{
            width: "clamp(1px,42.969vw,1650px)",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            border: "8px solid white",
            borderRadius: "24px",
            zIndex: -1,
          }}
        />
        <Box className="z-0 w-[clamp(1px,42.448vw,1630px)]">
          <div className="flex items-center justify-center w-full h-screen flex-col ">
            <h4 className="font-Poppins font-bold text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] text-white mb-2 z-1">
              Welcome to <span className="text-yellow">NCLEX Power</span>
            </h4>
            <p className="pt-sans-regular text-white text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
              Pass the NCLEX with our CORE Zigma Review System.
            </p>
          </div>
        </Box>
      </div>
      <div className="flex flex-col justify-center items-center h-auto w-full lg:w-[clamp(1px,56.667vw,2176px)] py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)]">
        <div className="container flex justify-center">
          <div className="md:w-[clamp(1px,40.079vw,900px)] lg:w-[clamp(1px,31.6667vw,1216px)] ">
            <div
              className="flex items-center justify-end cursor-pointer text-darkBlue mb-2 mb-md-5"
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon
                sx={{
                  width: {
                    xs: "clamp(1px,4.187vw,18px)",
                    md: "clamp(1px,1.467vw,40px)",
                    lg: "clamp(1px,1.042vw,40px)"
                  }
                  ,
                  height: {
                    xs: "clamp(1px,4.187vw,18px)",
                    md: "clamp(1px,1.467vw,40px)",
                    lg: "clamp(1px,1.042vw,40px)"
                  }
                }} />
              <span className="font-ptSans font-bold text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] ml-1 underline">
                Back
              </span>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-center">
                <Image
                  src={CoreZigma}
                  className="w-[clamp(1px,27.91vw,120px)] md:w-[clamp(1px,9.776vw,200px)] lg:w-[clamp(1px,6.25vw,240px)] h-[clamp(1px,27.91vw,120px)] md:h-[clamp(1px,9.776vw,200px)] lg:h-[clamp(1px,6.25vw,240px)]"
                  alt="CoreZigma"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <h5 className="font-ptSans font-bold text-[clamp(1px,5.81395vw,36px)] md:text-[clamp(1px,2.54154vw,80px)] lg:text-[clamp(1px,2.083331vw,80px)] text-[#232323]  mb-2">
                  Login
                </h5>
                <p className="font-ptSansNarrow font-light text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] text-darkGray">
                  Please login to continue to your account.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid item >
                    <TextField
                      name="email"
                      control={control}
                      placeholder="Email"
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          height: {
                            xs: 'clamp(1px, 10.466vw, 50px)',
                            md: 'clamp(1px, 3.911vw, 112px)',
                            lg: 'clamp(1px, 2.917vw, 112px)'

                          },
                          fontSize: {
                            xs: "clamp(1px, 3.72092vw, 18px)",
                            md: "clamp(1px, 0.9375vw, 36px)"

                          },
                          padding: {
                            xs: "0 clamp(1px,3.48837vw,30px)",
                            md: "0 clamp(1px,0.78125vw,30px)"
                          }
                        },
                      }}
                      inputProps={{ style: { borderRadius: "" } }}
                    />
                  </Grid>
                  <Grid
                    item
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
                        sx={{ borderRadius: "", width: "100%" }}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{
                              margin: "0",
                              padding: "0",
                              "& .MuiSvgIcon-root": {
                                width: {
                                  xs: "clamp(1px,4.652vw,20px)",
                                  md: "clamp(1px,1.956vw,40px)",
                                  lg: "clamp(1px,1.25vw,48px)"
                                }
                              }
                            }}
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
                  <div className="my-2 flex items-center justify-between ">
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleChangeRememberMe}
                      label="Remember me"
                      sx={{
                        borderRadius: 4,
                        fontSize: {
                          xs: "clamp(1px,3.72092vw,16px)",
                          md: "clamp(1px,1.36852vw,36px)",
                          lg: "clamp(1px, 0.9375vw, 36px)"
                        }
                      }}
                    />
                    <p
                      onClick={handleForgotPasswordClick}
                      className="ml-1 font-ptSans font-normal underline text-darkBlue cursor-pointer text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)]"
                    >
                      Forgot Password?
                    </p>
                  </div>
                  <div className="gap-4 flex items-center">
                    <Button
                      disabled={submitLoading}
                      loading={submitLoading}
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#0F2A71",
                        borderRadius: {
                          xs: "clamp(1px, 2vw, 20px)",
                          sm: "clamp(1px, 1vw, 20px)",
                          md: "clamp(1px, 0.5vw, 20px)"
                        },
                        minHeight: {
                          xs: 'clamp(1px, 10.466vw, 50px)',
                          md: 'clamp(1px, 3.911vw, 112px)',
                          lg: 'clamp(1px, 2.917vw, 112px)'
                        },
                        "&:hover": {
                          backgroundColor: "#00173F",
                        },
                      }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <span className="font-ptSans font-bold text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] normal-case">
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
                        borderRadius: {
                          xs: "clamp(1px, 2vw, 20px)",
                          sm: "clamp(1px, 1vw, 20px)",
                          md: "clamp(1px, 0.5vw, 20px)"
                        },
                        minHeight: {
                          xs: 'clamp(1px, 10.466vw, 50px)',
                          md: 'clamp(1px, 3.911vw, 112px)',
                          lg: 'clamp(1px, 2.917vw, 112px)'
                        },
                        boxShadow: 2,
                        borderColor: "darkGray",
                      }}
                      fullWidth
                      variant="outlined"
                      onClick={signInWithGoogle}
                    >
                      <span className="mr-4 font-ptSans font-normal text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,1.041665vw,40px)] text-black normal-case ">
                        Sign in with Google
                      </span>
                      <GoogleIcon />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center mt-2 lg:mt-6 ">
                    <p className="text-darkGray font-ptSans font-normal text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)]">
                      Need an account?
                    </p>
                    <Link
                      href="/#pricing"
                      className="ml-1 font-ptSans font-bold underline text-darkBlue cursor-pointer no-background text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)]"
                    >
                      Create One
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
