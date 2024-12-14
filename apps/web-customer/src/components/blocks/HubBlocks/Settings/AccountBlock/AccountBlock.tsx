import React from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../../../../../core/Schema/SettingsForm/validation";
import { Button, EvaIcon, TextField } from "core-library/components";
import Image from "next/image";
import { profile, google } from "core-library/assets"
interface AccountProps {
  title: string;
  subTitle: string;
}
export const AccountBlock: React.FC<AccountProps> = ({ title, subTitle }) => {
    const form = useForm({
        mode: "onSubmit",
        resolver: yupResolver(accountSchema),
        defaultValues: accountSchema.getDefault(),
      });
  const { control, handleSubmit, setValue } = form;
  return (
    <section className="flex flex-col">
      <Box className="flex flex-col mb-8">
        <h4 className="font-ptSans text-[28px] text-black font-bold">
          {title}
        </h4>
        <h4 className="font-ptSans text-[20px] text-[#333333] font-regular">
          {subTitle}
        </h4>
      </Box>
      {/* account block */}
      <Box className="flex gap-4">
        {/* left side */}
        <Box className="bg-[#f3f4f8] rounded-[15px]">
          <Box className="flex flex-col px-8 py-4">
            <h4 className="font-ptSans text-[20px] text-black">
              Personal Information
            </h4>
          </Box>
          <hr className="text-black"/>
          <Box className="flex flex-col gap-4 px-8 py-8">
            <Box className="flex gap-4">
              <TextField
                label={"First Name"}
                control={control}
                placeholder="Enter First Name"
                name="firstName"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
              <TextField
                label={"Last Name"}
                control={control}
                placeholder="Enter Last Name"
                name="lastName"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
            </Box>

            <Box className="flex gap-4">
              <TextField
                label={"Email Address"}
                control={control}
                placeholder="Enter Email Address"
                name="email"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
              <TextField
                label={"Contact Number"}
                control={control}
                placeholder="Enter Contact Number"
                name="contactNumber"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
            </Box>
            
            <Box className="flex">
              <TextField
                label={"Username"}
                control={control}
                placeholder="Enter Username"
                name="username"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
            </Box>
            
            <Box className="flex gap-4">
              <TextField
                label={"City"}
                control={control}
                placeholder="Enter City"
                name="city"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
              <TextField
                label={"Country"}
                control={control}
                placeholder="Select Country"
                name="username"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
              <TextField
                label={"Zip"}
                control={control}
                name="zip"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
              />
            </Box>
            
            <Box className="flex w-full justify-end gap-2 mt-4">
                <Button sx={{ borderRadius: "10px", width: "100px", backgroundColor: "white", color: "#333333"}}>Cancel</Button>
                <Button sx={{ borderRadius: "10px", width: "100px", backgroundColor: "#0F2A71", color: "#FFFFFF"}}>Update</Button>
            </Box>
          </Box>
        </Box>

        {/* right side */}
        <Box className="flex flex-col gap-4">
          <Box className="flex gap-4 bg-[#f3f4f8] rounded-[15px] p-8">
            <Image
              className="w-[100px] h-[100px]"
              src={profile}
              alt="Profile Photo"
            />
            <Box className="flex flex-col gap-4">
              <h4 className="font-ptSans text-[20px] text-black font-regular">
                Edit your photo
              </h4>
              <Box className="flex gap-2 items-center">
                <button className="w-[90px] rounded-[50px] border border-[#33333333] px-4 py-1">
                  Upload
                </button>
                <Box className="rounded-full border border-slate-400 p-2">
                  <EvaIcon
                    width={20}
                    height={20}
                    name="trash-outline"
                    fill="#000000"
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="w-full flex flex-col gap-2 bg-[#f3f4f8] rounded-[15px] p-8">
            <Box className="flex justify-between items-center">
              <Image src={google} alt="Google Logo" />
              <span className="text-[#12B76A] bg-[#C5ECD2] font-ptSans text-[18px] font-semibold p-2 rounded-[10px]">
                Connected
              </span>
            </Box>
            <h4 className="font-ptSans text-[20px] font-semibold text-black">
              Google
            </h4>
            <h4 className="text-[20px] text-[#333333] font-ptSans text-regular">
              Use Google to sign in to your account.{" "}
              <span className="text-[#235EE7]">Click here to learn more.</span>
            </h4>
          </Box>

          <Box className="flex flex-col gap-2 bg-[#f3f4f8] rounded-[15px] p-8">
            <h4 className="text-[20px] font-ptSans text-[#FF0000] font-bold">
              Delete Account
            </h4>
            <h4 className="text-[20px] font-ptSans text-[#333333] font-regular mb-4">
              Once you delete your account, there is no going back. Please be
              certain
            </h4>
            <Button
              className="flex gap-2"
              sx={{
                width: "112px",
                borderRadius: "10px",
                backgroundColor: "#FF0000",
              }}
            >
              <EvaIcon name="alert-triangle-outline" fill="#ffffff" />
              <h4 className="font-ptSans text-[20px] text-white font-bold">
                Delete
              </h4>
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
