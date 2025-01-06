import React from "react";
import { AboutUsBanner, Arrow } from "core-library/assets";
import Image from "next/image";

export const AboutUsHeroBlock = () => {
  return (
    <section className="h-screen overflow-hidden">
      <div className="h-full w-full relative">
        <div className="absolute justify-center h-full flex flex-col items-center md:items-start text-white z-10 left-0 md:pl-[12%] gap-2 w-full lg:w-auto">
          <div className="flex flex-col leading-none">
            <p className="text-[45px] md:text-[96px] font-bold font-ptSans text-yellow">
              About Us
            </p>
            <p className="text-[16px] md:text-[24px] font-bold font-ptSansNarrow">
              A little info about us, our team, and our vision.
            </p>
          </div>
          <a
            href="#myTeam"
            className="bg-yellow flex items-center gap-2 w-[170px] lg:w-[200px] py-2 justify-center rounded-[8px] mt-2 transform duration-200 hover:scale-105 cursor-pointer"
          >
            <h4 className="font-ptSansNarrow font-bold text-[16px]">
              Meet our team
            </h4>
            <Image src={Arrow} alt="arrow" className="w-[8px] h-[12px]" />
          </a>
        </div>
        <Image
          className="h-screen w-full object-cover object-top"
          loading="lazy"
          src={AboutUsBanner}
          alt="AboutUsBanner"
        />
      </div>
    </section>
  );
};
