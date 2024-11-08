import { Box } from "@mui/material";
import { forgotPasswordSchema, ForgotPasswordType } from "./validation";
import { Alert, TextField, Button, Link, LottieAnimation } from "../../../../../../components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordImage } from "../../../../../../assets";

interface Props {
  onSubmit: (values: ForgotPasswordType) => void;
  submitLoading?: boolean;
  showAlert?: boolean;
  isExpired?: boolean;
}

export const EmailVerificationForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  showAlert,
  isExpired,
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
    <section className="w-full h-full flex justify-center items-center">
      <Box className="container-sm flex flex-col lg:flex-row items-center justify-center w-full space-x-0 px-8 lg:space-x-14 lg:px-4">
        <div className="flex">
          <LottieAnimation
            animationData={ForgotPasswordImage}
            width={280}
            height={280}
          />
        </div>

        <Box className="flex flex-col">
          <Box className="flex flex-col text-center mt-4 mb-4">
            <p className="leading-none uppercase text-xl font-semibold lg:text-2xl">
              Forgot your
              <span className="ml-1 text-blue">password?</span>
            </p>

            <p className="leading-none text-[14px] lg:text-[16px] text-curveGray">
              Enter your registered email, we'll help you reset your password.
            </p>
          </Box>

          <FormProvider {...form}>
            <TextField
              control={control}
              placeholder="Email Address"
              name="email"
              sx={{
                borderRadius: "10px",
                width: "100%",
              }}
              inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              data-testid="email-input"
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
                disabled={!isValid || submitLoading}
                data-testid="continue-button"
              >
                Continue
              </Button>
            </div>
          </FormProvider>

          <Box className="flex items-center justify-center w-full gap-2 mt-2">
            <p className="text-[16px]">Already know your password?</p>
            <Link
              href="/login"
              sx={{
                fontSize: "16px",
                color: "blue",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
