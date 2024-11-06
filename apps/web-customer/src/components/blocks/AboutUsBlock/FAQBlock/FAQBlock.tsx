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
    <div className="flex flex-col text-center mb-14 w-full">
      <h4 className="font-ptSans font-bold text-[32px] sm:text-[40px] text-darkBlue">
        Frequently Asked Questions
      </h4>
      <p className="font-ptSansNarrow text-[16px] sm:text-[20px] text-black font-regular">
        Everything you need to know about the NCLEX Power
      </p>
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
    <section className="w-full h-auto lg:h-screen relative">
      <BackgroundImages />
      <Box className="flex flex-col mx-auto items-center justify-center p-12 w-auto lg:w-[1200px]">
        <FAQHeader />
        <Tabs tabsItem={faqTabs} justifyContent="center" customStyle={tabStyles}/>
      </Box>
    </section>
  );
};
