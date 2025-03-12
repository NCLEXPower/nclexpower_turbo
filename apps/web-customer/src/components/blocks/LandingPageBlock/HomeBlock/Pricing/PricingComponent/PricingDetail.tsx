import React, { useState } from "react";
import { NCLEXBlueLogo } from "core-library/assets";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { EvaIcon } from "core-library/components";
import { PricingDetailProps } from "core-library/types/global";

const PricingDetail: React.FC<PricingDetailProps> = ({
  filteredCardData,
  onClose,
}) => {
  const InclusionsList = filteredCardData?.inclusions?.features ?? [];
  const ProgramTitle = filteredCardData.programTitle;

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="w-full md:w-[clamp(1px,39.063vw,1400px)] pt-[clamp(1px,11.1628vw,96px)] md:pt-[clamp(1px,2.083331vw,80px)]">
      <Box sx={{ position: "relative", cursor: "pointer" }}>
        <Toolbar onClick={onClose} aria-label="close" className="!px-[0]">
          <ArrowBackIcon />
          <p className="text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] ms-3 ms-md-2 underline text-darkBlue pt-sans-bold">
            Go Back
          </p>
        </Toolbar>
      </Box>
      <div className="ms-3 ps-3 ps-md-0 ms-md-0 pt-3">
        <Image style={{ width: isMobile ? "clamp(1px,34.884vw,400px)" : "clamp(1px,10.417vw,400px)" }} src={NCLEXBlueLogo} alt="NCLEX Logo" />

        <h1 className="text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] pt-sans-bold mt-2">
          Detailed Pricing
        </h1>

        <div className="my-3 my-md-2">
          <h3 className="text-[#818181] text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] font-ptSans ">
            Product Type
          </h3>
          {ProgramTitle === 0 ? (
            <h2 className="text-darkBlue text-[clamp(1px,5.11627vw,72px)] md:text-[clamp(1px,1.875vw,72px)] pt-sans-bold">
              Registed Nurse (RN)
            </h2>
          ) : (
            <h2 className="text-[#084A4E] text-[clamp(1px,5.11627vw,72px)] md:text-[clamp(1px,1.875vw,72px)] pt-sans-bold">
              Practical Nurse (PN)
            </h2>
          )}
        </div>
        <p className="text-curveGray pt-sans-narrow-regular text-[clamp(1px,3.72092vw,40px)] md:text-[clamp(1px,1.041665vw,40px)] pb-3">
          Transform your learning experience with our comprehensive package,
          designed specifically to help you excel in patient care and medical
          practice.
        </p>

        <div className="flex flex-col pb-0 pb-md-5 text-[#202020]">
          {InclusionsList &&
            InclusionsList.length > 0 &&
            InclusionsList.map((list: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 pt-sans-narrow-regular text-[clamp(1px,3.72092vw,40px)] md:text-[clamp(1px,1.041665vw,40px)]"
              >
                <span>
                  <EvaIcon
                    id="check-icon"
                    name="checkmark-circle-2-outline"
                    fill="#0F2A71"
                    className="!w-[clamp(1px,4.187vw,36px)] md:!w-[clamp(1px,1.042vw,40px)] !h-[clamp(1px,4.187vw,36px)] md:!h-[clamp(1px,1.042vw,40px)]"
                  />
                </span>
                <p className="!m-2">{list}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingDetail;
