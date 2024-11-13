/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { NotFoundPage } from "core-library/assets";
import Image from "next/image";
import { useRouter } from "core-library";
import { EvaIcon } from "core-library/components";

export const NotFoundBlock: React.FC = () => {
  const router = useRouter();

  const Back = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center font-['Poppins'] text-center p-4">
      <div className="w-full  max-w-[643.5px] h-auto md:h-[637px] flex-shrink-5 mb-8 md:mb-0 md:mr-10 mt-20 md:mt-0">
        <Image
          src={NotFoundPage}
          alt="Page Not Found"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-center">
        <h1 className="text-[#3562D8] font-Poppins text-center text-[70px] md:text-[120px] font-bold leading-none md:leading-[108%]">
          404
        </h1>

        <h1 className="font-Rajdhani text-center text-[#232323] text-[36px] md:text-[80px] font-bold leading-none md:leading-[100%] pb-4">
          Page not found
        </h1>

        <p className="text-center text-[16px] md:text-[23px] font-ptSans font-normal leading-[24px] md:leading-[36px] text-[#9A9A9A] max-w-[560px] pb-3">
          Were&apos; sorry, the page you requested could not be found. Please go
          back to the previous page.
        </p>

        <div className="w-full flex justify-center">
          <button
            className="mt-4 flex w-full md:w-[120px] h-[45px] md:h-[55px] py-[10px] md:py-[13px] justify-center items-center flex-shrink-0 bg-[#0F2A71] rounded-[10px] text-[#FFFDF1] text-center font-ptSansNarrow font-bold leading-none md:leading-[36px]"
            onClick={Back}
          >
            GO BACK
            <EvaIcon
              id="back-icon"
              name="arrow-ios-forward-outline"
              fill="white"
              width={30}
              height={30}
              ariaHidden
            />
          </button>
        </div>
      </div>
    </div>
  );
};
