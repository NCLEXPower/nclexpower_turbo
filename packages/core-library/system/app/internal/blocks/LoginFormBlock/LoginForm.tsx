/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../../../../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "./validation";
import { TextField } from "../../../../../components/forms/TextField";
import { useFormFocusOnError } from "../../../../../hooks";
import Image from "next/image";
import Link from "next/link";
import { CoreZigmaLogo } from "../../../../../assets";
import { Checkbox } from "../../../../../components";
import { useShowPassword } from "./useShowPassword";
import { useKeyDown } from "../../../../../hooks/useKeyDown";
import { SavedDataProps } from "./LoginFormBlock";
import { useEffect } from "react";

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
  rememberMe: boolean;
  handleChangeRememberMe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  savedData: SavedDataProps | null;
};

export const LoginForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  rememberMe,
  handleChangeRememberMe,
  savedData,
}) => {
  const form = useForm<LoginFormType>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { control, handleSubmit, clearErrors, setFocus, setValue, formState } = form;
  const { showPassword, handleClickShowPassword } = useShowPassword();
  useFormFocusOnError<LoginFormType>(formState.errors, setFocus);

  useEffect(() => {
    if (savedData) {
      setValue("email", savedData.email);
      setValue("password", savedData.password);
    }
  }, [savedData, setValue]);

  useKeyDown("Enter", () => handleSubmit(onSubmit)());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Image
        src={CoreZigmaLogo}
        alt="CoreZigma"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />
      <Typography
        variant="h3"
        sx={{ marginY: 2, color: "#3C31DD", fontWeight: "700" }}
      >
        Welcome Back!
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 4, color: "#757575" }}>
        Please enter your login credentials below.
      </Typography>

      <TextField<LoginFormType>
        name="email"
        control={control}
        placeholder="Enter your email"
        type="email"
        onBlur={() => clearErrors()}
        sx={{
          marginBottom: 2,
          borderRadius: "10px",
          fontSize: "14px",
        }}
        inputProps={{
          style: { borderRadius: "10px" },
          onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          },
        }}
        data-testid="email-input"
      />
      <TextField<LoginFormType>
        name="password"
        type={showPassword ? "text" : "password"}
        control={control}
        placeholder="Enter your password"
        endAdornment={
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
            sx={{ fontSize: "10px" }}
            data-testid="toggle-password"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
        onBlur={() => clearErrors()}
        sx={{
          marginBottom: 2,
          borderRadius: "10px",
          fontSize: "14px",
        }}
        inputProps={{
          style: { borderRadius: "10px" },
        }}
        data-testid="password-input"
      />

      <Grid
        container
        sx={{
          marginY: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "300px",
        }}
      >
        <Checkbox
          checked={rememberMe}
          onChange={handleChangeRememberMe}
          label="Keep me logged in"
          sx={{ borderRadius: 4, fontSize: "14px" }}
          data-testid="checkbox"
        />
        <Typography component="span" variant="caption">
          <Link
            href="/account/forgot-password"
            style={{ textDecoration: "underline", color: "#3C31DD" }}
            data-testid="forgotpassword"
          >
            Forgot Password?
          </Link>
        </Typography>
      </Grid>

      <Button
        disabled={submitLoading}
        loading={submitLoading}
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        data-testid="signin"
        sx={{
          backgroundColor: "#3C31DD",
          height: "45px",
          borderRadius: "10px",
          marginTop: "10px",
          width: "300px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};
