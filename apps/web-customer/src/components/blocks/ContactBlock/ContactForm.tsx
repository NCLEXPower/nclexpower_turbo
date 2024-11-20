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
} from "../../../core/constant/ContactPageMock";
import Image from "next/image";
import Link from "next/link";
import { ContactIcon } from "core-library/assets";
import { useSanitizedInputs } from "core-library/hooks";
import { CategoryDataType } from "./type"

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
    <section className="relative flex justify-center mt-0 lg:mt-[-180px] mb-0 lg:mb-20">
      <div className="h-auto w-full lg:w-[1120px] flex flex-col lg:flex-row justify-between drop-shadow-lg">
        <div className="flex flex-col w-full lg:w-1/2 bg-white p-6 sm:p-8 lg:p-16 rounded-l-none lg:rounded-l-[20px]">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-ptSans text-[#232323]">
            Send us a{" "}
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-ptSans text-darkBlue">
              message
            </span>
          </p>
          <p className="text-sm sm:text-md lg:text-lg font-normal font-ptSans text-darkGray mt-2">
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
            <Grid item sx={{ marginTop: 3 }}>
              <ControlledSelectField
                name="categoryId"
                options={data}
                control={control}
                label="Concern Category"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                  },
                  "& .MuiInputBase-input": {
                    borderRadius: "5px",
                    padding: "15px",
                  },
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
                  px: 4,
                  fontSize: "14px",
                  fontWeight: 600,
                  py: 2,
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
        flex flex-col w-full lg:w-1/2 bg-hoverBlue p-6 sm:p-8 lg:p-16 space-y-6 sm:space-y-8 lg:space-y-16 relative rounded-r-none lg:rounded-r-[20px]"
        >
          <p className="text-xl sm:text-2xl  mx-0 my-1 lg:text-3xl font-bold font-ptSans text-white">
            Contact Info
          </p>
          <div className="flex flex-col gap-6 sm:gap-8">
            {ContactMock.map((item, index) => (
              <div className="flex gap-4 sm:gap-8 items-center" key={index}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  height={32}
                />
                <div
                  className="text-sm sm:text-md lg:text-xl text-white font-normal break-normal"
                  dangerouslySetInnerHTML={{
                    __html: purifyInputs(item.subTitle) as TrustedHTML,
                  }}
                />
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
                  width={24}
                  height={24}
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

