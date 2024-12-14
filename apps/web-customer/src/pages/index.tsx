import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
  HelpWidgetBlock
} from "@/components";
import { ScrollTopIcon } from "core-library/components";
import { useScroll, withCSP } from "core-library";
import { GetServerSideProps } from "next";
import NorthIcon from "@mui/icons-material/North";
import React from "react";
import useWebHeaderStyles from "@/pages/contents/useWebHeaderStyles";
import { IconButton } from "@mui/material";
import { SsrTypes } from "core-library/types/global";
import { useEndpointByKey } from "core-library/hooks";

interface Props {
  data?: SsrTypes;
}

const Home: React.FC<Props> = ({ data }) => {
  const url = useEndpointByKey({
    data: data?.endpoints,
    key: "pricing-section",
  });

  return (
    <React.Fragment>
      <div className="w-screen flex flex-col overflow-y-auto overflow-x-hidden font-ptSans ">
        <div className="w-full h-screen">
          <RevolutionBannerBlock />
        </div>
        <div className="w-full h-fit">
          <CoreZigmaBlock />
        </div>
        <div className="w-full h-fit">
          <HowItWorksBlock />
        </div>
        <div className="w-full h-fit">
          <HelpWidgetBlock />
        </div>
        <div className="w-full h-fit" id="pricing">
          <PricingBlock url={url} />
        </div>
        <ScrollTopIcon />
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default Home;
