/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { UnderMaintenance } from "core-library/assets";
import Image from "next/image";
import { NotifySchema, NotifyType } from "../../../core/Schema";
import { FormProvider, useForm } from "react-hook-form";
import { TextField, Button } from "core-library/components";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onSubmit: (values: NotifyType) => void;
}

export const MaintenanceForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<NotifyType>({
    mode: "onSubmit",
    resolver: yupResolver(NotifySchema),
    defaultValues: NotifySchema.getDefault(),
  });
  const { control, handleSubmit } = form;

  return (
    <div className="h-screen flex flex-col lg:flex-row justify-center items-center px-4 sm:px-10 overflow-hidden lg:px-16 xl:px-20 pb-10">
      <div className="w-full sm:w-[950px] flex justify-center sm:justify-end md:w-[700px] lg:w-4/5 xl:w-[55%] lg:flex-none lg:order-2 ">
        <Image
          src={UnderMaintenance}
          alt="UnderMaintenance"
          className="max-w-full h-auto"
        />
      </div>

      <div className="flex flex-col gap-y-6 w-full sm:w-1/2 md:w-4/5 xl:w-1/2 lg:order-1 text-center lg:text-left lg:items-start">
        <div className="w-full">
          <h1 className="text-[#0f2a71] text-[32px] sm:text-[48px] lg:text-[55px] font-bold font-Rajdhani text-center lg:text-left ">
            Application Under Development
          </h1>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#9A9A9A] font-ptSans text-center lg:text-left px-4 sm:px-0 lg:w-4/5">
            Our application is currently under development and is not yet
            online. We’re working to bring it to life. Please click the "Notify
            Me" button and provide your email address to stay informed.
          </p>
        </div>

        <div className="w-full flex justify-center lg:justify-start">
          <div className="flex-1">
            <FormProvider {...form}>
              <TextField
                control={control}
                label="Email"
                name="email"
                sx={{
                  borderRadius: "10px",
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "80%",
                  },
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    lg: "16px",
                  },
                  height: {
                    xs: "35px",
                    lg: "46px",
                  },
                }}
                endAdornment={
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                      bgcolor: "#0F2A71",
                      borderRadius: "10px",
                      fontFamily: "'PT Sans', sans-serif",
                      fontWeight: "bold",
                      left: 15,
                      zIndex: 1,
                      padding: {
                        xs: "6px 12px",
                        lg: "8px 16px",
                      },
                      fontSize: {
                        xs: "14px",
                        lg: "16px",
                      },
                      "&:hover": {
                        backgroundColor: "#00173F",
                      },
                    }}
                  >
                    Notify Me
                  </Button>
                }
                inputProps={{
                  style: {
                    borderRadius: "10px",
                    boxShadow: "none",
                  },
                }}
              />
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
