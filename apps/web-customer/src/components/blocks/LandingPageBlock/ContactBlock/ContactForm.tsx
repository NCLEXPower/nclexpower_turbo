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
    <section className="relative flex justify-center mt-[clamp(-360px,-54.4vw,1px)] md:mt-[clamp(-180px,-9.35vw,1px)] mb-5 md:mb-[clamp(1px,11.1628vw,96px)]
] z-20">
      <div className="container">

        <div className="px-5 px-md-3 flex flex-col lg:flex-row justify-between drop-shadow-lg">
          <div className="flex flex-col w-full lg:w-1/2 bg-white p-5 p-md-4 rounded-t-[clamp(1px,4.5vw,20px)] md:rounded-t-none rounded-l-none md:!rounded-l-[clamp(1px,1vw,20px)]">
            <h3 className="md:text-[clamp(1px,1.5625vw,60px)] text-[clamp(1px,5.5814vw,60px)] font-bold font-ptSans text-[#232323]">
              Send us a{" "}
              <span className=" text-darkBlue">
                message
              </span>
            </h3>
            <p className="text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,40px)] font-normal font-ptSans text-darkGray mt-2">
              Fill out the form below, and we’ll get back to you soon.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} sx={{ marginY: 1, display: "flex", gap: 1 }}>
                <TextField
                  name="name"
                  control={control}
                  placeholder="Name"
                  data-testid="name-input"
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 1, display: "flex", gap: 1 }}>
                <TextField
                  name="email"
                  control={control}
                  placeholder="Email"
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
                    width: "100%",
                    borderRadius: "5px",
                    height: {
                      xs: "clamp(1px, 10.466vw, 110px)",
                      md: "clamp(1px, 2.917vw, 112px)",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px",

                    },
                    "& .MuiSvgIcon-root": {
                      width: {
                        xs: "clamp(1px,5.814vw,64px)",
                        md: "clamp(1px,1.667vw,64px)"
                      },
                      height: {
                        xs: "clamp(1px,5.814vw,64px)",
                        md: "clamp(1px,1.667vw,64px)"
                      },
                      margin: {
                        xs: "clamp(1px,2.3vw,20px) 0",
                        md: "clamp(1px,0.625vw,16px) 0"
                      },
                      top: "0"
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: {
                        xs: "clamp(1px, 3.72092vw, 36px)",
                        md: "clamp(1px, 0.9375vw, 36px)"
                      },
                    },
                    "& .MuiSelect-select": {
                      borderRadius: "5px",
                      padding: {
                        xs: "0 clamp(1px,3.48837vw,30px)",
                        md: "0 clamp(1px,0.78125vw,30px)"
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
              <Grid item sx={{ marginTop: 4 }}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  fullWidth
                  sx={{
                    fontSize: {
                      xs: "clamp(1px, 3.72092vw, 36px)",
                      md: "clamp(1px, 0.9375vw, 36px)"
                    },
                    fontWeight: 600,
                    minHeight: {
                      xs: "clamp(1px, 10.466vw, 110px)",
                      md: "clamp(1px,2.917vw,112px)"
                    },
                    backgroundColor: "#0F2A71",
                    borderRadius: "5px",
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
        flex flex-col w-full md:w-1/2 bg-hoverBlue p-5 relative rounded-b-[clamp(1px,4.5vw,20px)] md:rounded-b-none  md:rounded-r-[clamp(1px,1vw,20px)] "
          >
            <h4 className="text-[clamp(1px,5.5814vw,60px)] md:text-[clamp(1px,1.5625vw,60px)] mx-0 my-1 font-bold font-ptSans text-white mb-5">
              Contact Info
            </h4>
            <div className="flex flex-col ">
              {ContactMock.map((item, index) => (
                <div className="flex  items-center mb-4" key={index}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="w-[clamp(1px,4.652vw,48px)] md:w-[clamp(1px,1.25vw,48px)] h-auto"
                  />
                  <ParsedHtml color="white" html={item.subTitle} className="mx-3 font-class" />
                </div>
              ))}
            </div>
            <div className="flex mt-4 mt-md-5">
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
                    className="w-[clamp(1px,4.652vw,48px)] md:w-[clamp(1px,1.25vw,48px)] h-auto me-4 "
                  />
                </Link>
              ))}
            </div>
            <Image
              src={ContactIcon}
              alt="Contact Icon"
              className="absolute bottom-0 right-0 hidden md:block w-[clamp(1px,14.323vw,550px)] h-auto"
            />
          </div>
        </div>
      </div>
    </section >
  );
};

