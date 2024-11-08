import {
  SecurityQuestionForm,
  NewPasswordForm,
  ChangePasswordButton,
  BackToChangeEmail,
  Header,
} from "./index";
import { Box } from "@mui/material";
import { ChangePasswordImage } from "../../../../../../assets";
import usePasswordChange from "./usePasswordChange";
import { LottieAnimation } from "../../../../../../components";

export function PasswordChangeBlock() {
  const {
    handleButtonClick,
    control,
    showAlert,
    validSecQAndSecA,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    watch,
  } = usePasswordChange();

  return (
    <>
      <section className="w-full h-full flex justify-center items-center">
        <Box className="container-sm flex flex-col lg:flex-row items-center justify-center w-full space-x-0 px-8 lg:space-x-14 lg:px-4">
          <Box className="flex flex-col order-2 lg:order-1">
            <Header showAlert={showAlert} />

            <SecurityQuestionForm
              control={control}
              onSecQandASubmit={handleButtonClick}
              validSecQAndSecA={validSecQAndSecA}
            />

            {validSecQAndSecA && (
              <>
                <p className="leading-none text-center text-[16px] text-curveGray">
                  Please enter your new password to continue with the reset.
                </p>

                <NewPasswordForm
                  control={control}
                  onSubmit={handleButtonClick}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleClickShowConfirmPassword={
                    handleClickShowConfirmPassword
                  }
                  showAlert={showAlert}
                />
              </>
            )}

            <ChangePasswordButton
              handleButtonClick={handleButtonClick}
              validSecQAndSecA={validSecQAndSecA}
              watch={watch}
            />

            <Box className="flex items-center justify-left w-full gap-2 mt-4">
              <BackToChangeEmail
                href="/account/forgot-password"
                text="Change Email"
              />
            </Box>
          </Box>

          <div
            className="flex order-1 lg:order-2"
            data-testid="lottie-animation"
          >
            <LottieAnimation animationData={ChangePasswordImage} />
          </div>
        </Box>
      </section>
    </>
  );
}
