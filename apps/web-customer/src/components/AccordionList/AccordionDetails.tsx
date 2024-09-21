import React from "react";
import { AccordionDetails, Box } from "@mui/material";
import Image from "next/image";
import { getSectionTypeIcons, getSectionStatusIcons } from "../../utils";
import { SectionListType } from "../../core/types/programList";

interface CustomAccordionDetailsProps {
  sections: SectionListType[];
}

export const CustomAccordionDetails: React.FC<CustomAccordionDetailsProps> = ({
  sections,
}) => {
  return (
    <>
      <AccordionDetails>
        <Box className="h-auto">
          <div className="flex w-full justify-between bg-[#dbdfea] px-8 py-2">
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Sections
            </h4>
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Status
            </h4>
          </div>
        </Box>
        <Box className="flex flex-col space-y-2 bg-white px-10 pt-4">
          {sections.map((item) => {
            const { sectionId, sectionType, sectionTitle, sectionStatus } =
              item;
            return (
              <div
                key={sectionId}
                className="flex justify-between items-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={getSectionTypeIcons(sectionType)}
                    alt={sectionType}
                    width={16}
                    height={16}
                  />
                  <h4 className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer">
                    {sectionTitle}
                  </h4>
                </div>
                <Image
                  src={getSectionStatusIcons(sectionStatus)}
                  alt={sectionStatus}
                  width={16}
                  height={16}
                />
              </div>
            );
          })}
        </Box>
      </AccordionDetails>
    </>
  );
};