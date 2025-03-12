/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Grid } from "@mui/material";
import {
  TextField,
  Button,
  PhoneField,
  TextAreaField,
  ControlledSelectField,
} from "core-library/components";
import { ContactFormType } from "./validation";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import {
  ContactMock,
  SocialMediaMock,
} from "../../../../core/constant/ContactPageMock";
import Image from "next/image";
import Link from "next/link";
import { ContactIcon } from "core-library/assets";
import { useSanitizedInputs } from "core-library/hooks";
import { CategoryDataType } from "./type"
import { ParsedHtml } from "core-library/components";

interface FormValues {
  control: Control<ContactFormType>;
  handleSubmit: UseFormHandleSubmit<ContactFormType>;
  onSubmit: (data: ContactFormType) => void;
  handleSetCountryCode: (data: string) => void;
  countryCode: string;
  data: CategoryDataType[];
}

export const ContactForm: React.FC<FormValues> = ({
  control,
  handleSubmit,
  onSubmit,
  handleSetCountryCode,
  countryCode,
  data,
}) => {
  const { purifyInputs } = useSanitizedInputs({});

  return (
    <section className="relative flex justify-center mt-0 lg:mt-[clamp(-360px,-9.4vw,1px)] mb-0 lg:mb-20">
      <div className="h-auto w-full lg:w-[clamp(1px,57.917vw,2240px)] flex flex-col lg:flex-row justify-between drop-shadow-lg">
        <div className="flex flex-col w-full lg:w-1/2 bg-white p-5 rounded-l-none lg:rounded-l-[20px]">
          <h3 className="text-[clamp(1px,5.5814vw,60px)] lg:text-[clamp(1px,1.5625vw,35px)] font-bold font-Poppins text-[#232323]">
            Send us a{" "}
            <span className="text-darkBlue">
              message
            </span>
          </h3>
          <p className="lg:text-[clamp(1px,1.041665vw,40px)] text-[clamp(1px,4.18604vw,40px)] font-normal font-ptSans text-darkGray mt-2">
            Fill out the form below, and we’ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sx={{ marginY: 1, display: "flex", gap: 1 }}>
              <TextField
                name="name"
                control={control}
                placeholder="Name"
                sx={{
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                  },
                  "& .MuiInputBase-input": {
                    borderRadius: "5px",
                    padding: "15px",
                  },
                }}
                data-testid="name-input"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginY: 1, display: "flex", gap: 1 }}>
              <TextField
                name="email"
                control={control}
                placeholder="Email"
                sx={{
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                  },
                  "& .MuiInputBase-input": {
                    borderRadius: "5px",
                    padding: "15px",
                  },
                }}
                data-testid="email-input"
              />
            </Grid>
            <Grid item sx={{ marginTop: 2 }}>
              <ControlledSelectField
                name="categoryId"
                options={data}
                control={control}
                label="Concern Category"
                sx={{
                  height: {
                    xs: 'clamp(1px, 10.466vw, 50px)',
                    md: 'clamp(1px, 3.911vw, 112px)',
                    lg: 'clamp(1px, 2.917vw, 112px)'

                  },
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    height: {
                      xs: 'clamp(1px, 10.466vw, 50px)',
                      md: 'clamp(1px, 3.911vw, 112px)',
                      lg: 'clamp(1px, 2.917vw, 112px)'

                    },
                    borderRadius: {
                      xs: "clamp(1px, 2vw, 20px)",
                      sm: "clamp(1px, 1vw, 20px)",
                      md: "clamp(1px, 0.5vw, 20px)"
                    }
                  },
                  "& .MuiInputBase-input": {
                    minHeight: {
                      xs: 'clamp(1px, 10.466vw, 50px)',
                      md: 'clamp(1px, 3.911vw, 112px)',
                      lg: 'clamp(1px, 2.917vw, 112px)'
                    },

                    padding: "0"
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: {
                      xs: "clamp(1px, 3.72092vw, 18px)",
                      md: "clamp(1px, 1.36852vw, 36px)",
                      lg: "clamp(1px, 0.9375vw, 36px)"

                    },
                    top:
                    {
                      xs: 'clamp(-20px,-0.6vw,1px)',
                      md: 'clamp(-20px,-0.6vw,1px)',
                      lg: '0'
                    }
                  }
                }}
                data-testid="concernCategory-select"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginY: 1, display: "flex", gap: 1 }}>
              <PhoneField
                name="phone"
                control={control}
                countryCode={countryCode}
                placeholder="Phone"
                onCountryCodeChanged={(code) => handleSetCountryCode(code)}
                data-testid="phone-input"
                sx={{

                  "& .MuiOutlinedInput-input:focus": {
                    borderRadius: "5px",
                    padding: "13px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginY: 3 }}>
              <TextAreaField
                control={control}
                name="message"
                placeholder="Message..."
                data-testid="message-input"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                fullWidth
                sx={{
                  fontSize: {
                    xs: "clamp(1px, 3.72092vw, 18px)",
                    md: "clamp(1px, 1.36852vw, 36px)",
                    lg: "clamp(1px, 0.9375vw, 36px)"

                  },
                  fontWeight: 600,
                  height: {
                    xs: 'clamp(1px, 10.466vw, 50px)',
                    md: 'clamp(1px, 3.911vw, 112px)',
                    lg: 'clamp(1px, 2.917vw, 112px)'

                  },
                  backgroundColor: "#0F2A71",
                  borderRadius: {
                    xs: "clamp(1px, 2vw, 20px)",
                    sm: "clamp(1px, 1vw, 20px)",
                    md: "clamp(1px, 0.5vw, 20px)"
                  }
                }}
                data-testid="contactus-button"
              >
                SUBMIT
              </Button>
            </Grid>
          </form>
        </div>

        <div
          className="
        flex flex-col w-full lg:w-1/2 bg-hoverBlue p-5  space-y-6 sm:space-y-8 lg:space-y-16 relative rounded-r-none lg:rounded-r-[20px]"
        >
          <p className="text-[clamp(1px,5.5814vw,60px)] lg:text-[clamp(1px,1.5625vw,35px)] font-bold font-Poppins text-white">
            Contact Info
          </p>
          <div className="flex flex-col gap-6 sm:gap-8 ">
            {ContactMock.map((item, index) => (
              <div className="flex gap-4 sm:gap-8 items-center " key={index}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="lg:w-[clamp(1px,1.25vw,48px)] h-auto"
                />
                <ParsedHtml color="white" html={item.subTitle} className=" !text-[clamp(1px,3.72092vw,36px)] lg:!text-[clamp(1px,0.9375vw,36px)] " />
              </div>
            ))}
          </div>
          <div className="flex gap-4 sm:gap-8">
            {SocialMediaMock.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="lg:w-[clamp(1px,1.25vw,48px)] h-auto"
                />
              </Link>
            ))}
          </div>
          <Image
            src={ContactIcon}
            alt="Contact Icon"
            className="absolute bottom-0 right-0 hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
};

