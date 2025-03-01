import React from "react";
import { CroppedCoreZigma, TransparentCoreZigma } from "core-library/assets";
import Image from "next/image";
import { FAQItemBlock } from "./FAQItem";
import { Box } from "@mui/material";
import { TabsItem } from "core-library/core/utils/contants/tabs-item";
import { Tabs } from "core-library/components";

export const FAQBlock = () => {
  const faqTabs: TabsItem[] = [
    {
      id: 1,
      title: "The CORE-Zigma System",
      content: <FAQItemBlock topic="About NCLEX" />,
    },
    {
      id: 2,
      title: "About Program and Access",
      content: <FAQItemBlock topic="About Program and Access" />,
    },
    {
      id: 3,
      title: "About Payment",
      content: <FAQItemBlock topic="About Payment" />,
    },
    {
      id: 4,
      title: "Comments and Feedback",
      content: <FAQItemBlock topic="Comments and Feedback" />,
    },
  ];

  const tabStyles = {
    background: "transparent",
    selectedColor: "#0F2A71",
    defaultColor: "#000000",
    borderBottom: "2px solid #0F2A71",
    defaultBorderBottom: "2px solid #000000"
  };

  const FAQHeader = () => (
    <div className="container">
      <div className="flex flex-col text-center mb-14 ">
        <h4 className="font-Poppins font-bold text-[clamp(1px,7.44185vw,70px)] md:text-[clamp(1px,2.5vw,96px)] text-darkBlue">
          Frequently Asked Questions
        </h4>
        <p className="font-ptSans text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] text-black font-regular">
          Everything you need to know about the NCLEX Power
        </p>
      </div>
    </div>
  );

  const BackgroundImages = () => (
    <>
      <Image
        width={350}
        src={CroppedCoreZigma}
        alt="CoreZigma"
        className="absolute top-0 left-0"
      />
      <Image
        width={400}
        src={TransparentCoreZigma}
        alt="CoreZigma"
        className="absolute bottom-10 right-10"
      />
    </>
  );

  return (
    <section className="w-full relative overflow-visible py-16">
      <BackgroundImages />
      <div className="container">
        <Box className="flex flex-col items-center justify-center relative z-10">
          <FAQHeader />
          <Box className="w-full ">
            <Tabs tabsItem={faqTabs} justifyContent="center" customStyle={tabStyles} />
          </Box>
        </Box>
      </div>
    </section>
  );
};
