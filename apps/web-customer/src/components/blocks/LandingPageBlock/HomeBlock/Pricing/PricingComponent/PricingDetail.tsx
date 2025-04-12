import { ArxeniusLogoBlue } from "core-library/assets";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Toolbar } from "@mui/material";
import { EvaIcon } from "core-library/components";
import { PricingDetailProps } from "core-library/types/global";

const PricingDetail: React.FC<PricingDetailProps> = ({
  filteredCardData,
  onClose,
}) => {
  const InclusionsList = filteredCardData?.inclusions?.features ?? [];
  const ProgramTitle = filteredCardData.programTitle;

  return (
    <div className="w-full   xl:w-4/6  lg:pl-16 my-6 ">
      <Box sx={{ position: "relative", cursor: "pointer" }}>
        <Toolbar onClick={onClose} aria-label="close">
          <ArrowBackIcon />
          <p className="text-base ml-3 underline text-darkBlue font-bold">
            Go Back
          </p>
        </Toolbar>
      </Box>
      <div className="ml-8 space-y-6 ">
        <Image width={150} src={ArxeniusLogoBlue} alt="NCLEX Logo" />

        <h1 className="text-3xl lg:text-5xl font-ptSans font-semibold">
          Detailed Pricing
        </h1>

        <div>
          <h3 className="text-[#818181] text-lg lg:text-2xl font-ptSans ">
            Product Type
          </h3>
          {ProgramTitle === 0 ? (
            <h2 className="text-darkBlue text-2xl lg:text-4xl font-ptSans font-semibold">
              Registed Nurse (RN)
            </h2>
          ) : (
            <h2 className="text-[#084A4E] text-2xl lg:text-4xl font-ptSans font-semibold">
              Practical Nurse (PN)
            </h2>
          )}
        </div>
        <p className="text-curveGray font-ptSansNarrow  text-lg">
          Transform your learning experience with our comprehensive package,
          designed specifically to help you excel in patient care and medical
          practice.
        </p>

        <div className="flex flex-col text-lg lg:text-2xl text-[#202020]">
          {InclusionsList &&
            InclusionsList.length > 0 &&
            InclusionsList.map((list: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 font-ptSansNarrow"
              >
                <span>
                  <EvaIcon
                    id="check-icon"
                    name="checkmark-circle-2-outline"
                    fill="#0F2A71"
                    width={28}
                    height={28}
                  />
                </span>
                <p className="m-2">{list}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingDetail;
