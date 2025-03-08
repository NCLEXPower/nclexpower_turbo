import React, { useState } from "react";
import Image from "next/image";
import IssueTrackingBG from "core-library/assets/IssueTrackingBG.png";
import { Button, Input } from "core-library/components";
import { useApi } from "core-library/hooks";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Skeleton,
  stepConnectorClasses,
  styled,
} from "@mui/material";

import {
  NCLEXBlueLogo,
  CoreZigmaLogo,
  HelpOutlineTracking,
  StepActive,
  StepCircleOutline,
} from "core-library/assets";

interface IssueTracking {
  refNo: string;
  reportedIssueStatus: number;
}

const IssueTracking = () => {
  const [searchReference, setSearchReference] = useState("");
  const [issueTrackingData, setIssueTrackingData] =
    useState<IssueTracking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const getIssueTracking = useApi((api) =>
    api.web.getReportIssue(searchReference)
  );

  const handleSearchSubmitAsync = async () => {
    try {
      setLoading(true);
      setHasSearched(true);

      const result = await getIssueTracking.execute();
      setIssueTrackingData(result.data || null);
    } catch (error) {
      setIssueTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const IssueTrackingSkeletonLoader = () => {
    return (
      <div className="relative px-12 bg-white rounded-2xl p-6">
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={100}
          className="my-4"
        />
        <Skeleton variant="text" width="40%" height={30} />
      </div>
    );
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: "calc(-50% + 12px)",
      right: "calc(50% + 12px)",
    },

    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#001E52",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const CustomStepIcon = (props: any) => {
    const { completed } = props;

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

  const steps = ["To Be Reviewed", "In Review", "Resolved"];

  return (
    <div className="relative w-full min-h-screen">
      <Image
        src={IssueTrackingBG}
        alt="Issue Tracking"
        layout="fill"
        objectFit="cover"
        className="opacity-[0.41] backdrop-blur-[2.5px]"
      />
      <div className="absolute top-0 left-0 w-full h-full px-6 flex justify-center items-center lg:items-start lg:pt-28">
        <div className="w-full px-6 md:w-2/3 lg:px-0 lg:w-2/3 xl:w-1/2 xl:px-24  rounded-lg  space-y-6 lg:space-y-12">
          <div className="space-y-6">
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

            <h1 className="text-[#001E52] font-bold font-Poppins text-4xl xl:text-[57px] uppercase text-center">
              Track your inquiry
            </h1>
            <div className="flex gap-4 w-full mt-4">
              <Input
                sx={{
                  backgroundColor: "#FFFFFF61",
                  border: 2,
                  borderColor: "#001E52",
                  borderRadius: "10px",
                  width: "80%",
                  "& input": {
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #001E52",
                  },
                  "& input:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "& input::placeholder": {
                    color: "#000000",
                  },
                }}
                placeholder="Enter your reference number"
                onChange={(e) => setSearchReference(e.target.value)}
              />

              <Button
                sx={{
                  borderRadius: "10px",
                  width: { xs: "25%", sm: "30%", md: "20%" },
                  minWidth: "70px",
                  padding: { xs: "4px 8px", sm: "6px 12px" },
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  fontWeight: 700,
                }}
                onClick={handleSearchSubmitAsync}
              >
                Search
              </Button>
            </div>
          </div>

          {hasSearched && (
            <>
              {loading ? (
                <IssueTrackingSkeletonLoader />
              ) : issueTrackingData ? (
                <div className="space-y-3">
                  <h4 className="text-[#001E52] font-bold font-Poppins text-base lg:text-2xl">
                    Results
                  </h4>
                  <div className="relative bg-[#F2F2F2D4] rounded-2xl">
                    <div className="p-6 lg:px-12  lg:pb-12  lg:pt-6">
                      <h5 className="text-xs lg:text-lg text-[#001E52] font-bold font-Poppins">
                        Reference Number
                      </h5>
                      <h3 className="text-[27px] lg:text-[40px] leading-none mb-3 text-[#001E52] font-Poppins">
                        {issueTrackingData?.refNo || "N/A"}
                      </h3>
                      <Stepper
                        alternativeLabel
                        connector={<QontoConnector />}
                        sx={{
                          "& .MuiStepLabel-label": {
                            fontSize: { xs: "12px", sm: "14px", md: "18px" },
                            color: "#001E52",
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            "&.Mui-active": {
                              color: "#001E52",
                            },
                            "&.Mui-completed": {
                              color: "#001E52",
                            },
                          },
                          "& .MuiStepIcon-root": {
                            fontSize: { xs: "20px", md: "28px" },
                            color: "#001E52",
                          },
                          "& .MuiStep-root": {
                            padding: { xs: "0 4px", md: "0 8px" },
                          },
                        }}
                      >
                        {steps.map((label, index) => (
                          <Step
                            key={label}
                            completed={
                              index <=
                              (issueTrackingData?.reportedIssueStatus || 0)
                            }
                          >
                            <StepLabel StepIconComponent={CustomStepIcon}>
                              {label}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      <h4 className="text-sm lg:text-2xl text-[#001E52] mt-2 font-bold font-Poppins">
                        Status:{" "}
                        {steps[issueTrackingData?.reportedIssueStatus] ||
                          "Unknown"}
                      </h4>
                    </div>
                    <Image
                      src={HelpOutlineTracking}
                      className="absolute -top-3 -right-3 w-[30px] h-[30px] object-contain"
                      alt="Help Outline"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-24">
                  <div className=" bg-[#F2F2F2D4]  p-3 w-full rounded-2xl">
                    <h1 className="text-[#001E52] text-center w-full font-bold  font-Poppins text-2xl my-12 lg:text-5xl ">
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
                        This indicates that the reference number you entered
                        doesn’t exist
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;
