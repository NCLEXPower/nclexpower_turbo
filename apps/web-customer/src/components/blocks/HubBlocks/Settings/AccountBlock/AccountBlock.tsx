import React from "react";
import { Box } from "@mui/material";

interface AccountProps {
  title: string;
  subTitle: string;
}
export const AccountBlock: React.FC<AccountProps> = ({ title, subTitle }) => {
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
      <Box className="flex bg-[#f3f4f8]">
        {/* left side */}
        <Box className="flex flex-col rounded-[15px]">
            <h4 className="font-ptSans text-[20px] text-black">
                Personal Information
            </h4>
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
