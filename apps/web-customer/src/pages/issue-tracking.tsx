import React, { useEffect, useState } from "react";
import Image from "next/image";

import IssueTrackingBG from "core-library/assets/IssueTrackingBG.png";
import { Button, Input } from "core-library/components";
import { useActiveSteps } from "core-library/hooks";
import { useApi } from "core-library/hooks";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { NCLEXBlueLogo, CoreZigmaLogo } from "core-library/assets";

const IssueTracking = () => {
  const [searchReference, setSearchReference] = useState("");
  const [issueTrackingData, setIssueTrackingData] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getIssueTracking = useApi((api) =>
    api.web.getReportIssue(searchReference)
  );

  const handleSearchSubmitAsync = async () => {
    try {
      setHasSearched(true);
      const result = await getIssueTracking.execute();

      setIssueTrackingData(result.data || null);
    } catch (error) {
      setIssueTrackingData(null);
    }
  };

  console.log("issueTrackingData", issueTrackingData);

  const steps = ["To Be Reviewed", "In Review", "Resolved"];

  return (
    <div className="relative  backdrop-blur-[2.5px] w-full h-screen">
      <Image
        src={IssueTrackingBG}
        alt="Issue Tracking"
        layout="fill"
        objectFit="cover"
        className="opacity-[0.41]  backdrop-blur-[2.5px]"
      />
      <div className="absolute   top-0 left-0 w-full h-full flex justify-center items-start mt-28">
        <div className="w-1/3   rounded-lg shadow-lg space-y-24">
          <div className="space-y-6">
            <div className="flex justify-center items-center gap-4">
              <Image
                src={CoreZigmaLogo}
                className="w-[81px] h-[86px] object-contain "
                alt="Core Zigma Logo"
              />
              <Image
                src={NCLEXBlueLogo}
                className="w-[182px] h-[44px] object-contain"
                alt="NCLEX Blue Logo"
              />
            </div>

            <h1 className="text-[#001E52] font-bold font-Poppins text-[57px] uppercase text-center">
              Track your inquiry
            </h1>
            <div className="flex gap-6 w-full mt-4  ">
              <Input
                sx={{
                  backgroundColor: "#FFFFFF61",
                  border: 2,
                  borderColor: "#001E52",
                  borderRadius: "10px",
                  "& input::placeholder": {
                    color: "#000000",
                  },
                }}
                placeholder="Enter your reference number"
                onChange={(e) => setSearchReference(e.target.value)}
              />

              <Button
                className="w-1/3 "
                sx={{ borderRadius: "10px" }}
                onClick={handleSearchSubmitAsync}
              >
                Search
              </Button>
            </div>
          </div>

          {hasSearched && (
            <div className="bg-[#fff] w-full rounded space-y-3">
              {issueTrackingData ? (
                <>
                  <h5>Reference Number</h5>
                  <h3>{issueTrackingData?.refNo || "N/A"}</h3>
                  <Stepper alternativeLabel>
                    {steps.map((label, index) => (
                      <Step
                        key={label}
                        completed={
                          index <= (issueTrackingData?.reportedIssueStatus || 0)
                        }
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <h4>
                    Status:{" "}
                    {steps[issueTrackingData?.reportedIssueStatus] || "Unknown"}
                  </h4>
                </>
              ) : (
                <div className=" bg-[#fff] p-3 w-full rounded-2xl">
                  <h1 className="text-[#001E52] text-center w-full font-bold text-4xl my-6">
                    No Records Found
                  </h1>
                  <div className="text-center w-full bg-[#001E52] text-white text-sm  py-1 rounded-[10px]">
                    No Record Found
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;
