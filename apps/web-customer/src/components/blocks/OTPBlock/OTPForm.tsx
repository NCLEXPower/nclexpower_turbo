import React from "react";
import { OTPSchema, OTPType } from "../../../core/Schema";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "core-library/components";
import { ControlledOtpField } from "core-library/components";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import { CoreZigmaLogo, VerifyAccountBg } from "core-library/assets";

type Props = {
  onSubmit: (values: OTPType) => void;
  submitLoading: boolean;
  resendRemainingTime: number;
  onResend: () => Promise<void>;
  isResendLoading?: boolean;
  email: string;
};

const OTPForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  resendRemainingTime,
  onResend,
  isResendLoading,
  email,
}) => {
  const form = useForm<OTPType>({
    mode: "all",
    resolver: yupResolver(OTPSchema),
  });

  const { handleSubmit, control } = form;

  const otpValue = useWatch({
    control,
    name: "otp",
  });

  const disabledOtp = otpValue?.length !== 6;

  return (
    <section className="h-screen relative">
      <Image src={VerifyAccountBg} className="w-full" alt="VerifyAccountBG" />
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10">
        <div className="absolute inset-0 bg-none lg:bg-white opacity-60 z-0"></div>
        <div className="flex flex-col gap-4 w-full items-center justify-center relative z-10">
          <div className="flex flex-col w-full justify-center items-center">
            <Image
              src={CoreZigmaLogo}
              alt="NCLEXLogo"
              className="w-[100px] h-[104px]"
            />
            <h4 className="font-ptSans text-[30px] text-darkBlue font-bold">
              Verify your Account
            </h4>
            <p className="font-ptSansNarrow text-[14px] font-regular text-darkBlue">
              Please enter the 6-digit code sent to your email:
            </p>
            <p className="font-ptSansNarrow text-[14px] font-bold text-darkBlue">
              {email}
            </p>
          </div>
          <FormProvider {...form}>
            <Stack className="my-2">
              <Stack className="flex items-center justify-center gap-2">
                <ControlledOtpField
                  control={control}
                  name="otp"
                  digits={6}
                  label=""
                  variant="outlined"
                  resendRemainingTime={resendRemainingTime}
                  onResend={onResend}
                  isResendLoading={isResendLoading}
                />
              </Stack>
              <Button
                variant="contained"
                className="hover:bg-hoverBlue"
                sx={{
                  px: 4,
                  py: 2,
                  backgroundColor: "#0F2A71",
                  mt: 2,
                  borderRadius: "6px",
                }}
                loading={submitLoading}
                disabled={submitLoading || disabledOtp}
                onClick={handleSubmit(onSubmit)}
              >
                Continue
              </Button>
            </Stack>
          </FormProvider>
        </div>
      </Box>
    </section>
  );
};

export default OTPForm;
