import React from "react";
import { AboutUsBanner, Arrow } from "core-library/assets";
import Image from "next/image";

export const AboutUsHeroBlock = () => {
  return (
    <section className="h-[clamp(1px,162.791vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] overflow-hidden">
      <div className="h-full  relative">
        <div className="absolute justify-center h-full w-full flex flex-col items-center md:items-start text-white z-10 left-0 ">
          <div className="container w-100">
            <div className="flex flex-col leading-none">
              <h2 className="text-[clamp(1px,11.1628vw,200px)] md:text-[clamp(1px,5.20834vw,200px)] font-bold font-Poppins text-yellow">
                About Us
              </h2>
              <p className="text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] font-ptSans font-bold  pb-2">
                A little info about us, our team, and our vision.
              </p>
            </div>
            <a
              href="#myTeam"
              className="bg-yellow flex items-center w-[clamp(1px,44.2980vw,500px)] md:w-[clamp(1px,13.021vw,500px)] h-[clamp(1px,11.075vw,110px)] md:h-[clamp(1px,2.917vw,112px)] justify-center rounded-lg mt-2 transform duration-200 hover:scale-105 cursor-pointer"
            >
              <label className="font-ptSans font-bold text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] pe-4">
                Meet our team
              </label>
              <Image src={Arrow} alt="arrow" className="w-[clamp(1px,2.217vw,20px)] md:w-[clamp(1px,0.521vw,20px)] h-auto" />
            </a>
          </div>
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
