/**
 * Property of the Arxon Solutions, LLC.
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

interface Props {}

export const CoreZigmaBlock: React.FC<Props> = (props) => {
  return (
    <div className="w-full py-24 flex justify-center items-center font-ptSans relative">
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
      <div className="w-full flex flex-col items-center px-10">
        <div className="flex flex-col gap-5 items-center">
          <p className="lg:text-4xl text-3xl font-bold text-center">
            Pass the NCLEX® with our
            <span className="text-darkBlue"> CORE-Zigma</span> System
          </p>
          <p className="font-bold">We believe the power of our synergy!</p>
          <p>
            Designed with the learner in-mind, the CORE-Zigma System takes a
            unique, integrated approach to exam review and preparation!
          </p>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center py-10">
          <FlipCard frontImage={FlipCardOne} backImage={FlipCardOneBack} />
          <FlipCard frontImage={FlipCardTwo} backImage={FlipCardTwoBack} />
          <FlipCard frontImage={FlipCardThree} backImage={FlipCardThreeBack} />
        </div>
        <div className="lg:flex w-5/6 justify-center pt-10">
          <div className=" h-64 lg:w-1/2 px-5 flex justify-center">
            <div className="bg-darkBlue lg:w-3/4 w-full h-full rounded-lg" />
          </div>
          <div className="lg:w-2/5 pt-10 text-center lg:pl-16 lg:text-right flex flex-col gap-5 items-center">
            <p className="lg:text-4xl text-3xl font-bold">
              Discover <span className="text-darkBlue"> CORE-Zigma</span>
            </p>
            <p className="font-ptSansNarrow text-lg">
              Learn how the CORE-Zigma System empowers your NCLEX review
              preparation – in a way you have not seen before! Our platform
              engages learners using an unprecedented delivery method – with
              various sections interconnected, integrated, and interdependent.
              Peeked your interest yet? Watch this video to learn more about
              this amazing, ground-breaking review method!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
