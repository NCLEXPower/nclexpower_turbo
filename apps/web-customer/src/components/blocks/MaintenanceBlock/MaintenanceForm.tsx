/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { ConstructionWorkerImage, MaintenanceModeBackground } from "core-library/assets";
import Image from "next/image";
import { NotifySchema, NotifyType } from "../../../core/Schema";
import { FormProvider, useForm } from "react-hook-form";
import { TextField, Button } from "core-library/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@mui/material";

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
    <Container className='relative' maxWidth={false} sx={{ maxWidth: '1440px' }}>

      {/* Background image */}
      <div className="absolute z-0 right-0 bottom-0">
        <Image
          src={MaintenanceModeBackground}
          alt="Maintenance Background"
          className="w-full h-[40vh] sm:h-[60vh] lg:h-[90vh] object-bottom"
        />
      </div>

      {/* Construction worker image */}
      <div className="absolute z-1 right-0 bottom-0">
        <Image
          src={ConstructionWorkerImage}
          alt="Under Maintenance Worker"
          className="w-full h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] object-bottom"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 sm:top-[18%] sm:left-10 sm:transform-none">

          {/* Title */}
          <h1 className="max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[833px] xl:max-w-[1000px] 2xl:max-w-[1200px] font-ptSans font-bold text-[3rem] lg:text-[3.3rem] xl:text-7xl 2xl:text-8xl leading-snug md:leading-tight">
            We’re Under <span className="text-[#0F2A71]">Maintenance</span>
          </h1>

          {/* Description */}
          <p className="max-w-full sm:max-w-[300px] md:max-w-[350px] xl:max-w-[450px] 2xl:max-w-[500px] mt-4 xl:mt-6 font-ptSans font-[400] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16.4px] xl:text-[21.5px] 2xl:text-[24.5px] leading-[24px] sm:leading-[27px] lg:leading-[28px] xl:leading-[36px] 2xl:leading-[40px] text-[#969696]">
            Our site is down for improvements. Enter your email to be notified when we’re back!
          </p>

          {/* Contact form */}
          <FormProvider {...form}>
            <div className="absolute w-full sm:max-w-[300px] md:max-w-[325px] lg:max-w-[290px] xl:max-w-[370px] 2xl:max-w-[400px] mt-6 lg:mt-8 xl:mt-10">
              <div className="flex flex-col gap-4 items-center justify-start w-full">
                <TextField
                  control={control}
                  name="email"
                  placeholder="Enter your Email Address"
                  sx={{
                    width: "100%",
                    height: "50px,",
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9",
                    gap: "10px",
                    display: "flex",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px",
                    },
                    "& .MuiInputBase-input": {
                      width: "100%",
                      height: "27px",
                      borderRadius: "10px",
                      padding: "12px",
                      fontFamily: '"PT Sans Narrow", sans-serif',
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#9A9A9A",
                    },
                  }}
                />
                <Button
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '10px',
                    padding: '16px 8px',
                    backgroundColor: '#0F2A71',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                    fontFamily: '"PT Sans Narrow", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px',
                    letterSpacing: '-0.01em',
                    '& span': {
                      width: '61px',
                      height: '22px',
                      opacity: 0,
                    },
                  }}
                >
                  Notify Me
                </Button>
              </div>
            </div>
          </FormProvider>

          {/* Contact us */}
          <div className="absolute w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[500px] mt-52 lg:mt-56">
            <p
              className="text-[14px] xl:text-[16px] font-[400] leading-[24px] sm:leading-[27px] xl:leading-[30px] text-left"
              style={{ fontFamily: '"PT Sans Narrow", sans-serif' }}
            >
              If you need immediate assistance, feel free to contact us at{' '}
              <a
                href="mailto:contact@nclexpower.com"
                className="font-[700] underline text-[#0F2A71]"
              >
                contact@nclexpower.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};