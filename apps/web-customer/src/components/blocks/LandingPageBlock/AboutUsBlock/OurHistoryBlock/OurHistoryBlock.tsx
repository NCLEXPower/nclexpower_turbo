import { Box } from "@mui/material";
import { CoreZigmaLogo } from "core-library/assets";
import Image from "next/image";
import React from "react";

export const OurHistoryBlock = () => {
  return (
    <section className="w-full h-auto overflow-hidden bg-white">
      <Box className="w-full h-full flex flex-col items-center gap-12 py-12 px-10">
        <div className="text-center">
          <h4 className="font-ptSans font-bold text-[32px] sm:text-[40px] text-darkBlue">
            Our History, Mission & Vision
          </h4>
          <p className="font-ptSansNarrow text-[16px] sm:text-[20px] text-black font-regular">
            Shaping the future through the CORE-Zigma System
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1270px] w-full mx-auto p-4 rounded-md">
          <div className="lg:col-span-2 bg-yellow p-6 sm:p-8 rounded-[8px] space-y-4">
            <h4 className="font-ptSans font-bold text-[24px] sm:text-[28px] text-darkBlue text-center sm:text-left">
              The CORE-Zigma Story
            </h4>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
              <p className="order-2 sm:order-1 font-ptSansNarrow text-[16px] sm:text-[18px] text-black text-justify sm:text-left">
                The name{" "}
                <span className="text-darkBlue font-bold">CORE-Zigma</span>{" "}
                stems from an acronym and a Greek letter: CORE stands for Content
                Review, while Zigma is a spelling modification of the Greek
                letter Sigma – used primarily in mathematics and analytics to
                mean summation. The method thus stands as that – a unified
                system of various components tightly integrated and
                interdependent – where the whole offers so much more than the
                mere sum of its parts. The logo design aptly depicts the
                essence of the system: at the center is an apple core (apple
                of knowledge) being comprised of the letters C and S which
                stands for CORE Zigma initials. The apple then sits on an open
                book, with all elements encapsulated in a circular seal.
              </p>
              <Image
                src={CoreZigmaLogo}
                alt="Core Zigma logo"
                className="order-1 sm:order-2 w-[140px] h-[145px] sm:w-[170px] sm:h-[177px] mx-auto"
              />
            </div>
          </div>

          <div className="lg:row-span-2 bg-gradient-to-r from-[#102973] to-[#181E2F] p-6 sm:p-8 rounded-[8px] space-y-4">
            <h4 className="font-bold text-yellow font-ptSans text-[24px] sm:text-[28px]">
              Past and Present
            </h4>
            <p className="font-regular font-ptSansNarrow text-[16px] sm:text-[18px] text-[#D9D9D9] text-justify sm:text-left">
              What came about as this website first began way back in 2009, as
              a newly-minted nurse in California vowed to create a
              one-of-a-kind nursing review training program. Fast-forward to
              2021 – the year when various system components started to come
              together, to where eventually everything coalesced into the
              system now known as the{" "}
              <span className="text-yellow font-bold">
                CORE-Zigma Method.
              </span>{" "}
              Incorporating the latest technologies along with seamless
              integration of examination strategies that are laid out in a
              consistent and easy-to-follow daily schedule – this unique
              fusion enables the trainee to grasp even the most challenging of
              concepts and develop test-taking skills and endurance
              unparalleled to any other review systems in existence.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#102973] to-[#181E2F] p-6 sm:p-8 rounded-[8px] space-y-4">
            <h4 className="font-bold text-yellow font-ptSans text-[24px] sm:text-[28px]">
              Mission
            </h4>
            <p className="font-regular font-ptSansNarrow text-[16px] sm:text-[18px] text-[#D9D9D9] text-justify sm:text-left">
              Our <span className="text-yellow">mission</span> is to create
              and maintain an evolving review training system whose purpose is
              to solidly and adequately prepare potential examinees to pass
              the nursing licensure examination: the NCLEX-RN and NCLEX-PN.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#102973] to-[#181E2F] p-6 sm:p-8 rounded-[8px] space-y-4">
            <h4 className="font-bold text-yellow font-ptSans text-[24px] sm:text-[28px]">
              Vision
            </h4>
            <p className="font-regular font-ptSansNarrow text-[16px] sm:text-[18px] text-[#D9D9D9] text-justify sm:text-left">
              Our <span className="text-yellow">vision</span> is to achieve a
              consistent and continued 100% passing rate for any and all
              potential examinees who will use our CORE-Zigma System as their
              review training program to prepare for their NCLEX examination.
            </p>
          </div>
        </div>
      </Box>
    </section>
  );
};
