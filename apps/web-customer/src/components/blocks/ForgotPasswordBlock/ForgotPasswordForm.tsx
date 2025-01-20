import { forgotPasswordSchema, ForgotPasswordType } from "../../../core/Schema";
import { Box } from "@mui/material";
import { Alert, TextField } from "core-library/components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CoreZigmaLogo } from "core-library/assets";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button } from "core-library/components";

interface Props {
  onSubmit: (values: ForgotPasswordType) => void;
  submitLoading?: boolean;
  showAlert?: boolean;
  isExpired?: boolean;
  resetTime: number;
}

export const ForgotPasswordForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  showAlert,
  isExpired,
  resetTime,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordSchema.getDefault(),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <section className="h-screen flex items-center justify-center pt-sans-caption ">
      <Box
        sx={{
          display: "flex",
          p: 5,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          className="flex items-center justify-end xl:px-60 px-40 cursor-pointer text-darkBlue ml-[470px] "
          style={{ backgroundColor: 'transparent' }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <span className="pt-sans-narrow-regular ml-1 underline text-[20px]">
            Back
          </span>
        </Link>

        <div className="flex items-center justify-center py-14">
          <Image
            src={CoreZigmaLogo}
            alt="CoreZigma"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>

        <h2 className="mb-4 text-[40px] text-center pt-sans-bold text-4xl pt-sans-regular ">
          Forgot Your <span className="text-darkBlue">Password?</span>
        </h2>
        <div className="max-w-96 min-w-[550px] pt-10">
          <p className="pt-sans-narrow-regular font-light text-darkGray text-xl">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <div className="pt-5">
            <FormProvider {...form}>
              <TextField
                control={control}
                label="Email"
                name="email"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
              {showAlert && (
                <div className="pt-2">
                  <Alert
                    severity="success"
                    title="Successfully sent to your email"
                  />
                </div>
              )}
              {isExpired && (
                <div className="pt-2">
                  <Alert
                    severity="error"
                    title="Account Expired"
                    description="The account you are trying to access is already expired."
                  />
                </div>
              )}
              <div className="mt-5">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: "10px",
                    backgroundColor: "#0F2A71",
                  }}
                  className="hover:bg-hoverBlue"
                  loading={submitLoading}
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid || submitLoading || resetTime !== 0}
                  resetTime={resetTime}
                >
                  Continue
                </Button>
              </div>
            </FormProvider>
          </div>
        </div>
        <div className="flex items-center justify-center mt-20 pt-sans-narrow-regular text-xl">
          <p className="text-darkGray">Don't have an account?</p>
          <Link
            href="/#pricing"
            className="ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer "
            style={{ backgroundColor: 'transparent' }}
          >
            Sign up
          </Link>
        </div>
      </Box>
    </section>
  );
};
