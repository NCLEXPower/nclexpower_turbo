import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import React from "react";
import DashboardBlock from "@/components/blocks/DashboardBlock/DashboardBlock";
import { HydrationWrapper } from "core-library/components";

const HubOverview: React.FC = () => {
  return (
    <HydrationWrapper>
      <div className="w-full flex bg-[#E7EAF1] items-center justify-center ">
        <DashboardBlock />
      </div>
    </HydrationWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default HubOverview;
