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
    <div className="container">
      <div className="md:w-[clamp(1px,40.079vw,900px)] lg:w-[clamp(1px,31.6667vw,1216px)] ">
        <section className="h-dvh w-dvw flex items-center justify-center pt-sans-caption ">
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
              className="flex items-center justify-end w-full  cursor-pointer text-darkBlue "
              style={{ backgroundColor: "transparent" }}
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
            </Link>

            <div className="flex items-center justify-center py-14">
              <Image
                src={CoreZigmaLogo}
                className="w-[clamp(1px,27.91vw,120px)] md:w-[clamp(1px,9.776vw,200px)] lg:w-[clamp(1px,6.25vw,240px)] h-[clamp(1px,27.91vw,120px)] md:h-[clamp(1px,9.776vw,200px)] lg:h-[clamp(1px,6.25vw,240px)]"
                alt="CoreZigma"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <h2 className="mb-4 text-[clamp(1px,5.81395vw,36px)] md:text-[clamp(1px,2.54154vw,80px)] lg:text-[clamp(1px,2.083331vw,80px)] text-center font-Poppins font-bold">
              Forgot Your <span className="text-darkBlue">Password?</span>
            </h2>
            <div className="md:w-[clamp(1px,40.079vw,900px)] lg:w-[clamp(1px,31.6667vw,1216px)]">
              <p className="text-center font-ptSans font-regular text-darkGray text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)]">
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
                    inputProps={{ style: { borderRadius: "10px" } }}
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
                  <div className="mt-3">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        height: {
                          xs: 'clamp(1px, 10.466vw, 50px)',
                          md: 'clamp(1px, 3.911vw, 112px)',
                          lg: 'clamp(1px, 2.917vw, 112px)'

                        },
                        borderRadius: {
                          xs: "clamp(1px, 2vw, 20px)",
                          sm: "clamp(1px, 1vw, 20px)",
                          md: "clamp(1px, 0.5vw, 20px)"
                        },
                        fontSize: {
                          xs: "clamp(1px, 3.72092vw, 18px)",
                          md: "clamp(1px, 0.9375vw, 36px)"

                        },
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
            <div className="flex items-center justify-center pt-5 font-ptSans font-normal text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)]">
              <p className="text-darkGray">Don't have an account?</p>
              <Link
                href="/#pricing"
                className="ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer "
                style={{ backgroundColor: "transparent" }}
              >
                Sign up
              </Link>
            </div>
          </Box>
        </section>
      </div>
    </div>
  );
};
