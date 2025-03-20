import React, { useState } from "react";
import Image from "next/image";
import { StepIconProps } from "@mui/material";
import {
  HelpOutlineTracking,
  StepActive,
  StepCircleOutline,
} from "core-library/assets";
import { useApi, useKeyDown} from "core-library/hooks";
import IssueTracking from "./IssueTracking";
import IssueTrackingSkeletonLoader from "./IssueTrackingSkeletonLoader";
import { Stepper } from "core-library/components";

interface IssueTracking {
  refNo: string;
  reportedIssueStatus: number;
  loading: boolean;
}

const IssueTrackingBlock = () => {
  const [searchReference, setSearchReference] = useState("");
  const [issueTrackingData, setIssueTrackingData] =
    useState<IssueTracking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getIssueTracking = useApi((api) =>
    api.web.getReportIssue(searchReference)
  );

  const isLoading = getIssueTracking?.loading ?? false;

  const steps = ["To Be Reviewed", "In Review", "Resolved"];

  const handleSearchSubmitAsync = async () => {
    try {
      setHasSearched(true);
      const result = await getIssueTracking.execute();
      setIssueTrackingData(result.data || null);
    } catch (error) {
      setIssueTrackingData(null);
      console.error(error);
    }
  };

  useKeyDown("Enter", () => handleSearchSubmitAsync());

  const CustomStepIcon: React.FC<StepIconProps> = ({ completed }) => {
    return completed ? (
      <Image src={StepActive} alt="Step Active" width={30} height={30} />
    ) : (
      <Image
        src={StepCircleOutline}
        alt="Step Circle Outline"
        width={26}
        height={26}
      />
    );
  };

  const stepperStyles = {
    "& .MuiStep-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
    },
    "& .MuiStepConnector-line": {
      borderColor: "#001E52",
      borderWidth: 2,
      width: "100%",
      flexGrow: 1,
    },
    "& .MuiStepConnector-root": {
      top: "22%",
      transform: "translateY(-50%)",
      marginX: "-8px",
    },
    "& .MuiStepLabel-label": {
      fontSize: { xs: "12px", sm: "14px", md: "1.2rem" }, 
      fontWeight: "bold",
      fontFamily: "PT Sans Narrow",
      color: "#001E52",
      textAlign: "center",
      whiteSpace: "nowrap",
    },
  }


  const renderResults = () => {
    if (!hasSearched) return null;
    if (isLoading) return <IssueTrackingSkeletonLoader />;
    if (!issueTrackingData) {
      return (
        <div className="w-full mt-24 ">
          <div className=" bg-[#F2F2F2D4]  p-3 w-full rounded-[10px] lg:rounded-2xl">
            <h1 className="text-[#001E52] text-center w-full font-bold font-Poppins text-2xl my-4 lg:my-12 lg:text-5xl ">
              No Records Found
            </h1>
            <div className="text-center w-full bg-[#001E52] text-white text-xs lg:text-sm  py-1 rounded-[10px] relative font-Poppins">
              No Record
              <Image
                src={HelpOutlineTracking}
                className="absolute -top-4 -right-4 w-[36px] h-[36px] object-contain"
                alt="Help Outline"
              />
              <p className="bg-white hidden lg:block absolute text-[8px] leading-3 p-2 font-semibold font-Poppins text-left rounded-[5px]  -top-20  -right-32 -mr-1 w-[118px] text-black  ">
                This indicates that the reference number you entered doesn’t
                exist
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full space-y-3">
        <h4 className="text-[#001E52] font-bold font-Poppins text-base lg:text-2xl">
          Results
        </h4>
        <div className="relative  bg-[#F2F2F2D4] rounded-[10px] lg:rounded-2xl">
          <div className="p-6  flex flex-col  justify-between  lg:pt-6">
            <h5 className="text-xs lg:px-6  lg:text-lg text-[#001E52] font-bold font-Poppins">
              Reference Number
            </h5>
            <h3 className="text-[27px] lg:px-6  lg:text-[40px] leading-none mb-3 text-[#001E52] font-Poppins">
              {issueTrackingData?.refNo ?? "N/A"}
            </h3>
            <Stepper
              activeStep={(issueTrackingData?.reportedIssueStatus || 0) + 1}
              alternativeLabel={true}
              orientation="horizontal"
              steps={steps}
              labelStyle={{
                fontWeight: "bold",
                fontFamily: "PT Sans Narrow",
                color: "#001E52",
                width: "100%",
              }}
              sx={stepperStyles}
              StepIconComponent={CustomStepIcon}
            />
            <h4 className="text-sm  text-[#001E52] mt-2 font-bold font-Poppins lg:px-6 lg:text-2xl">
              Status:{" "}
              {issueTrackingData?.reportedIssueStatus !== undefined
                ? steps[issueTrackingData.reportedIssueStatus]
                : "Unknown"}
            </h4>
          </div>
          <Image
            src={HelpOutlineTracking}
            className="absolute -top-3 -right-3 w-[30px] h-[30px] object-contain"
            alt="Help Outline"
          />
        </div>
      </div>
    );
  };

  return (
    <IssueTracking
      renderResults={renderResults}
      getIssueTracking={getIssueTracking}
      setSearchReference={setSearchReference}
      handleSearchSubmitAsync={handleSearchSubmitAsync}
    />
  );
};

export default IssueTrackingBlock;
