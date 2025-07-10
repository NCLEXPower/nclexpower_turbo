import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ErrorImage from "../../../assets/monitor.png";
import { EvaIcon} from "core-library/components";
import { useRouter } from "core-library";

interface Props {}

const ErrorBlock: React.FC<Props> = () => {

  const router = useRouter();

  const Back = () => {
    router.back();
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Box
      className="z-1000 w-full h-screen bg-rgba(0, 0, 0, 0.7) flex justify-center items-center"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Box className="flex flex-row justify-center items-center w-full h-full">
        <Box className="flex flex-row justify-center items-center">
          <Box className="px-4 pb-8 md:px-12 bg-white w-screen h-screen flex flex-col justify-center items-center text-center">
            <Image className="w-[10rem] md:w-[20rem]" src={ErrorImage} alt="Error message image" />
            <h1 className="text-lg leading-none md:text-2xl font-Poppins font-bold">
              Oh no! Something went wrong.
            </h1>
            <p className="text-darkGray text-sm leading-none">
              Sorry, we're having a technical issue. Please refresh the page or check back soon.
            </p>
            <button
              onClick={Back}
              className="bg-[#0F2A71] w-[5.5rem] md:h-[45px] text-sm md:text-2xl flex justify-center items-center text-white rounded-[10px] md:w-[120px] h-[35px] font-ptSansNarrow text-center"
            >
              GO BACK
              <EvaIcon
                id="back-icon"
                name="arrow-ios-forward-outline"
                fill="white"
                width={20}
                height={20}
                ariaHidden
              />
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorBlock;
