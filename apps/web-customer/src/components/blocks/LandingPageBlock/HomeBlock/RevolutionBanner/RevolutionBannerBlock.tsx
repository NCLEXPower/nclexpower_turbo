/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";
import { settings } from "core-library/core/utils/contants/wc/HomePageData";
import { CarouselOne, CarouselTwo, CarouselThree } from "core-library/assets";
import Image from "next/image";

interface Props { }

export const RevolutionBannerBlock: React.FC<Props> = () => {


  return (
    <div className="h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] overflow-hidden">
      <ImageCarousel sliderConfig={settings}>
        <div className=" h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] w-full relative">
          <div className="absolute  justify-center h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] w-full flex  flex-col left-0 text-white z-10 ">
            <div className="container">
              <h2 className="text-[clamp(1px,7.44185vw,128px)] md:text-[clamp(1px,3.229164vw,124px)] leading-[1] font-bold font-Rajdhani text-white">
                Welcome to
              </h2>
              <h1 className="text-[clamp(1px,11.1628vw,200px)] md:text-[clamp(1px,5.20834vw,200px)] sm:text-5xl text-4xl font-bold font-Poppins text-[#f4c501] ">
                NCLEX Power Review
              </h1>
              <p className="text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] sm:text-xl text-md ">
                Your Journey to Passing the NCLEX <br /> Begins Now
              </p>
            </div>
          </div>
          <Image
            className="h-full object-cover object-top"
            loading="lazy"
            src={CarouselOne}
            alt="ImageOne"
          />
        </div>
        <div className="h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] w-full relative">
          <div className="absolute w-full h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] flex">
            <div className=" items-start justify-end h-1/2 w-1/2 flex flex-col  text-white ">
              <div className="m-[clamp(1px,5.20834vw,200px)]">
                <h2 className="text-[clamp(1px,11.1628vw,200px)]  md:text-[clamp(1px,4.166665vw,160px)] font-bold font-Rajdhani text-white leading-[1]">
                  Train like a
                </h2>
                <h1 className="text-[clamp(1px,11.1628vw,200px)]  md:text-[clamp(1px,4.166665vw,160px)] font-bold font-Poppins text-[#f4c501] leading-[1] mt-[clamp(-24px,-.833331vw,1px)]">
                  BOXER
                </h1>
              </div>
            </div>
            <div className=" items-end justify-end h-full w-1/2 flex flex-col  text-white  ">
              <div className="m-[clamp(1px,5.20834vw,200px)] pb-5 ">
                <h2 className="text-[clamp(1px,11.1628vw,200px)]  md:text-[clamp(1px,4.166665vw,160px)]  font-bold font-Rajdhani whitespace-nowrap leading-[1] text-white">
                  Pass like a
                </h2>
                <h1 className="text-[clamp(1px,11.1628vw,200px)]  md:text-[clamp(1px,4.166665vw,160px)]  font-bold font-Poppins text-[#f4c501] leading-[1] mt-[clamp(-24px,-.833331vw,1px)] text-end">
                  WINNER
                </h1>
              </div>
            </div>
          </div>
          <Image
            className="h-full object-cover object-center"
            loading="lazy"
            src={CarouselTwo}
            alt="ImageTwo"
          />
        </div>
        <div className="h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] w-full relative">
          <div className="absolute  justify-center h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] w-full flex flex-col  text-white z-10">
            <div className="container">
              <h1 className="text-[clamp(1px,11.1628vw,200px)] md:text-[clamp(1px,5.20834vw,200px)] font-bold font-Poppins text-white">
                Start today!
              </h1>
              <p className="ext-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] mt-5 font-medium">
                Choose our standard
                <span className="text-[#f4c501]"> 23-days</span> or
                <span className="text-[#f4c501]"> 8-days </span> Fast Track
                program,  <br />
                and start your path to success
                <span className="text-[#f4c501]"> now!</span>
              </p>
            </div>
          </div>
          <Image
            className="h-[clamp(1px,174.42vw,1870px)] md:h-[clamp(1px,48.698vw,1870px)] object-cover lg:object-top object-[85%]"
            loading="lazy"
            src={CarouselThree}
            alt="ImageThree"
          />
        </div>
      </ImageCarousel>
    </div>
  );
};
