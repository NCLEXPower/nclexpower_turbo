import React from "react";
import { Box } from "@mui/material";
import { TextField } from "core-library/components";

interface SecurityProps {
  title: string;
  subTitle: string;
}
export const SecurityBlock: React.FC<SecurityProps> = ({ title, subTitle }) => {
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
      <Box className="flex">
        {/* left side */}
        <Box className="w-full flex flex-col bg-[#f3f4f8] rounded-2xl">
            <h4 className="font-ptSans text-[20px] text-black">
                Personal Information
            </h4>
            <hr/>
            <Box className="flex gap-2">
                {/* <TextField name="firstname" control={}/> */}
            </Box>
            <Box className="flex gap-2">

            </Box>
        </Box>

        {/* right side */}
        <Box className="flex flex-col gap-2">
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </section>
  );
};