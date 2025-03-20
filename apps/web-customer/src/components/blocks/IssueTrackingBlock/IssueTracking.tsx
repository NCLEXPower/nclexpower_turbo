import Image from "next/image";
import {
  NCLEXBlueLogo,
  CoreZigmaLogo,
  IssueTrackingBG,
} from "core-library/assets";
import { Button, Input } from "core-library/components";

interface Props {
  getIssueTracking: { loading: boolean };
  setSearchReference: (ref: string) => void;
  handleSearchSubmitAsync: () => Promise<void>;
  renderResults: () => JSX.Element | null;
}

const IssueTracking = ({
  renderResults,
  getIssueTracking,
  setSearchReference,
  handleSearchSubmitAsync,
}: Props) => {

  const inputStyles = {
    backgroundColor: "#FFFFFF61",
    border: 2,
    borderColor: "#001E52",
    borderRadius: { xs: "6px", md: "10px" },
    width: "80%",
    height: { xs: "36px", sm: "54px" },
    "& input": {
      fontSize: { xs: "14px", sm: "16px", md: "18px" },
    },
    "& input:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "& input::placeholder": {
      color: "#001E52",
      fontSize: { xs: "12px", sm: "14px", md: "16px" },
    },
  }

  const buttonStyles = {
    borderRadius: { xs: "6px", md: "10px" },
    width: { xs: "25%", sm: "30%", md: "20%" },
    height: { xs: "36px", sm: "54px" },
    minHeight: { xs: "36px", sm: "54px" },
    minWidth: "70px",
    fontSize: { xs: "12px", sm: "14px", md: "16px" },
    fontWeight: 700,
    padding: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div className="relative w-full min-h-screen">
      <Image
        src={IssueTrackingBG}
        alt="Issue Tracking"
        layout="fill"
        objectFit="cover"
        className="opacity-[0.41] backdrop-blur-[2.5px]"
      />
      <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center">
        <div className="flex flex-col justify-center w-full mx-[42px] items-center rounded-lg  space-y-6  lg:space-y-12 md:w-[637px]">
          <div className="space-y-6 lg:space-y-8 w-full">
            <div className="flex justify-center items-center gap-4">
              <Image
                src={CoreZigmaLogo}
                className="w-[52.61px] h-[55.86px] lg:w-[81px] lg:h-[86px] object-contain "
                alt="Core Zigma Logo"
              />
              <Image
                src={NCLEXBlueLogo}
                className="w-[118.21px] h-[28.58px] lg:w-[182px] lg:h-[44px] object-contain"
                alt="NCLEX Blue Logo"
              />
            </div>

            <h1 className="text-[#001E52] text-center font-bold font-Poppins text-4xl md:text-[48px] lg:text-[57px] w-full uppercase  whitespace-nowrap min-w-0">
              Track your inquiry
            </h1>
            <div className="flex gap-4 w-full mt-4">
              <Input
                sx={inputStyles}
                placeholder="Enter your reference number"
                onChange={(e) => setSearchReference(e.target.value)}
              />
              <Button
                sx={buttonStyles}
                onClick={handleSearchSubmitAsync}
                disabled={getIssueTracking.loading}
                loading={getIssueTracking.loading}
              >
                Search
              </Button>
            </div>
          </div>
          {renderResults()}
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;
