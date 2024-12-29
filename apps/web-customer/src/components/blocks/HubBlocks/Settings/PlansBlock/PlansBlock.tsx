import React from "react";
import { Box, Grid, SxProps, Typography } from "@mui/material";
import { Button, Card } from "core-library/components";
import { PlansCard } from "@/components/blocks/HubBlocks/Settings/PlansBlock/PlansCard/PlansCard";
import { Plan } from "@/components/blocks/HubBlocks/Settings/PlansBlock/constant";
import { PlanType } from "@/components/blocks/HubBlocks/Settings/type";
import Image from "next/image";
import { MasterCardIcon, VisaIcon } from "core-library/assets";

interface PlansProps {
  title: string;
  subTitle: string;
}
export const PlansBlock: React.FC<PlansProps> = ({ title, subTitle }) => {
  const plans: PlanType[] = Plan;

  return (
    <section className="flex flex-col">
      <Box className="flex flex-col mb-8">
        <h4 className="font-ptSans text-[28px] text-black font-bold">
          {title}
        </h4>
        <h4 className="font-ptSans text-[20px] text-[#333333] font-regular">
          {subTitle}
        </h4>
      </Box>
      <Grid spacing={4}>
        <Grid item sx={{ borderRadius: "15px" }} className=" bg-[#f3f4f8]">
          <div className="border-b w-full  border-[#0F2A71] border-opacity-50">
            <p className="p-2 font-extrabold px-5">Subscription Plan</p>
          </div>
          <div className=" min-h-[240px] flex w-[100%]">
            {plans.length > 0 && plans.map((item) => <PlansCard plan={item} />)}
          </div>
        </Grid>
        <Grid item my={5} display="flex" width={1} gap={5}>
          <Box
            sx={{ borderRadius: "15px", width: 1 }}
            className=" bg-[#f3f4f8]"
          >
            <div className="border-b w-full  border-[#0F2A71] border-opacity-50">
              <div className="py-4 px-8 font-extrabold">Payment Method</div>
            </div>
            <Grid p={4} columnGap={2}>
              <Box
                sx={{
                  border: 1,
                  display: "flex",
                  borderColor: "#0F2A71",
                  alignItems: "center",
                  bgcolor: "#fff",
                  p: 4,
                  my: 2,
                  borderRadius: "10px",
                }}
              >
                <Box p={2}>
                  <Image alt="visaIcon" src={VisaIcon} />
                </Box>
                <Box>
                  <Typography fontWeight={600}>Visa Ending 3532</Typography>
                  <Typography>Expiry date: 12/25</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  border: 1,
                  color: "#fff",
                  display: "flex",
                  borderColor: "#0F2A71",
                  alignItems: "center",
                  bgcolor: "#0F2A71",
                  p: 4,
                  borderRadius: "10px",
                }}
              >
                <Box p={2}>
                  <Image alt="MasterCardIcon" src={MasterCardIcon} />
                </Box>
                <Box>
                  <Typography fontWeight={600}>Visa Ending 3532</Typography>
                  <Typography>Expiry date: 12/25</Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box
            sx={{ borderRadius: "15px", width: 1 }}
            className=" bg-[#f3f4f8]"
          >
            <div className="border-b w-full  border-darkBlue border-opacity-50">
              <div className="p-2 font-extrabold px-5">Latest Payment</div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

const cardBgsx: SxProps = {
  border: 1,
  display: "flex",
  flexDirection: "column",
  width: 1,
  p: 4,
  justifyContent: "space-between",
  borderColor: "#084A4E",
  borderRadius: "15px",
};

const buttonSx: SxProps = {
  fontSize: "15px",
  fontWeight: 600,
  borderRadius: "10px",
  minWidth: "240px",
};
