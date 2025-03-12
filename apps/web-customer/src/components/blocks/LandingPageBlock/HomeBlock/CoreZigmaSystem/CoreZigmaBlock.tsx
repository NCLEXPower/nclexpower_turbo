/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import Image from "next/image";
import {
  CroppedCoreZigma,
  FlipCardOne,
  FlipCardOneBack,
  FlipCardThree,
  FlipCardThreeBack,
  FlipCardTwo,
  FlipCardTwoBack,
  TransparentCoreZigma,
} from "core-library/assets";
import { FlipCard } from "../../../../../components/Cards/FlippableCard/FlipCard";

interface Props { }

export const CoreZigmaBlock: React.FC<Props> = (props) => {
  return (
    <div className="w-full py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)] flex justify-center items-center font-ptSans relative">
      <Image
        src={CroppedCoreZigma}
        alt="CoreZigma"
        className="absolute top-0 left-0 w-[clamp(1px,18.2292vw,700px)]"
      />
      <Image
        src={TransparentCoreZigma}
        alt="CoreZigma"
        className="absolute m-[clamp(1px,2.083331vw,80px)] bottom-0 right-0 w-[clamp(1px,20.834vw,800px)]"
      />
      <div className="container">
        <div className="">
          <div className="text-center">
            <h2 className="text-[clamp(1px,9.30232vw,70px)] md:text-[clamp(1px,2.5vw,96px)] font-Poppins font-bold   text-center ">
              Pass the NCLEX® with our
              <span className="text-darkBlue ">  CORE-Zigma</span> System
            </h2>
            <p className="font-Sans font-bold text-[clamp(1px,4.65116vw,48px)] !mb-[clamp(1px,4.65116vw,40px)] md:!mb-0 md:text-[clamp(1px,1.25vw,48px)]">We believe the power of our synergy!</p>
            <p className="font-Sans font-normal text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
              Designed with the learner in-mind, the CORE-Zigma System takes a
              unique, integrated approach to exam <br className="hidden md:block" /> review and preparation!
            </p>
          </div>
          <div className="w-full h-full flex flex-wrap items-center justify-center py-[clamp(1px,2.083331vw,80px)]">
            <div className="px-[clamp(1px,1.041665vw,40px)]">
              <FlipCard frontImage={FlipCardOne} backImage={FlipCardOneBack} />
            </div>
            <div className="px-[clamp(1px,1.041665vw,40px)]">
              <FlipCard frontImage={FlipCardTwo} backImage={FlipCardTwoBack} />
            </div>
            <div className="px-[clamp(1px,1.041665vw,40px)]">
              <FlipCard frontImage={FlipCardThree} backImage={FlipCardThreeBack} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 justify-center pt-[clamp(1px,2.083331vw,80px)] gap-[clamp(1rem,4.105vw,5rem)] items-start mb-5">
            <div className="h-[clamp(1px,51.63vw,734px)] md:h-[clamp(1px,19.115vw,734px)] w-full md:w-[clamp(1px,31.25vw,1200px)] flex justify-center order-2 md:order-none">
              <div className="bg-darkBlue w-full h-full rounded-lg" />
            </div>
            <div className="w-full text-center lg:text-right items-center md:items-end order-1 md:order-none">
              <p className="md:text-[clamp(1px,2.0833307vw,80px)] text-[clamp(1px,7.44185vw,80px)] font-Poppins font-bold">
                Discover <span className="text-darkBlue"> CORE-Zigma</span>
              </p>
              <p className="font-Sans font-normal text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)]">
                Learn how CORE-Zigma empowers your NCLEX preparation with top-notch resources and expert guidance. Our platform offers comprehensive study materials, practice tests, and personalized learning plans to help you succeed. Watch our video to see how we can make your NCLEX journey smoother and more effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
