/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";
import { settings } from "core-library/core/utils/contants/wc/HomePageData";
import {
  CarouselOne,
  CarouselTwo,
  CarouselTwoTablet,
  CarouselThree,
} from "core-library/assets";
import Image from "next/image";
import { useResolution } from "core-library/hooks";

interface Props {}

export const RevolutionBannerBlock: React.FC<Props> = () => {
  const { isMobile, isTablet } = useResolution();
  return (
    <div className="h-screen overflow-hidden">
      <ImageCarousel
        key={window.innerWidth}
        sliderConfig={settings}
        showDots={true}
      >
        <div className="h-full w-full relative">
          <div className="absolute  justify-center h-full w-full flex  flex-col left-0 text-white z-10 pl-[12%] pt-[3%]">
            <p className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold font-Rajdhani drop-shadow-xl">
              Welcome to
            </p>
            <p className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-bold font-Poppins text-[#f4c501] -mt-4 lg:-mt-5 drop-shadow-xl">
              NCLEX Power Review
            </p>
            <p className="lg:text-2xl sm:text-xl text-md -mt-4 lg:-mt-5">
              Your Journey to Passing the NCLEX <br /> Begins Now
            </p>
          </div>
          <Image
            className="h-screen object-cover object-top"
            loading="lazy"
            src={CarouselOne}
            alt="ImageOne"
          />
        </div>
        <div className="h-full w-full relative">
          <div className="absolute w-full h-full flex lg:flex-row flex-row-reverse">
            <div className="items-end lg:items-start justify-start lg:h-full w-1/2 flex flex-col left-0 text-white pl-0 pr-10 lg:pr-0 md:pl-20 pt-[8dvh] lg:pt-[25dvh]">
              <p className="lg:text-6xl md:text-6xl text-5xl font-bold font-Rajdhani whitespace-nowrap drop-shadow-xl">
                Train like a
              </p>
              <p className="lg:text-7xl md:text-6xl text-4xl font-bold font-Poppins text-[#f4c501] -mt-4 lg:-mt-7 drop-shadow-xl">
                BOXER
              </p>
            </div>
            <div className="items-start lg:items-end justify-end lg:h-full w-1/2 flex flex-col right-0 text-white pr-0 pl-10 lg:pl-20 md:pr-20 pb-[8dvh] lg:pb-[12dvh] ">
              <p className="lg:text-6xl md:text-6xl text-5xl font-bold font-Rajdhani whitespace-nowrap drop-shadow-xl">
                Pass like a
              </p>
              <p className="lg:text-7xl md:text-6xl text-4xl font-bold font-Poppins text-[#f4c501] -mt-4 lg:-mt-5 drop-shadow-xl">
                WINNER
              </p>
            </div>
          </div>
          <Image
            className="h-screen w-screen object-cover object-center"
            loading="lazy"
            src={
              isMobile
                ? CarouselTwoTablet
                : isTablet
                  ? CarouselTwoTablet
                  : CarouselTwo
            }
            alt="ImageTwo"
          />
        </div>

        <div className="h-full w-full relative">
          <div className="absolute  justify-center h-full w-full flex flex-col left-0 text-white z-10 pl-[12%] mt-52 md:-mt-5">
            <p className="text-5xl lg:text-7xl font-bold font-Poppins drop-shadow-xl">
              Start today!
            </p>
            <p className="text-xl lg:text-2xl mt-5 font-medium">
              Choose our standard
              <span className="text-[#f4c501]">
                {" "}
                <strong>23-days</strong>
              </span>{" "}
              or
              <br />
              <span className="text-[#f4c501]">
                {" "}
                <strong>8-days </strong>
              </span>{" "}
              Fast Track program, and start
              <br /> your path to success
              <span className="text-[#f4c501]">
                {" "}
                <strong>now!</strong>
              </span>
            </p>
          </div>
          <Image
            className="h-screen object-cover lg:object-top object-[85%]"
            loading="lazy"
            src={CarouselThree}
            alt="ImageThree"
          />
        </div>
      </ImageCarousel>
    </div>
  );
};
