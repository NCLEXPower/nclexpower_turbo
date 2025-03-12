import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
  HelpWidgetBlock
} from "@/components";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import React from "react";
import { SsrTypes } from "core-library/types/global";
import { useEndpointByKey } from "core-library/hooks";
import { ScrollTop } from "core-library/components";

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
        <div className="w-full h-full">
          <RevolutionBannerBlock />
        </div>
        <div className="w-full h-fit">
          <CoreZigmaBlock />
        </div>
        <div className="w-full h-fit">
          <HowItWorksBlock />
        </div>
        <div className="w-full h-fit" id="pricing">
          <PricingBlock url={url} />
        </div>
        <div className="w-full h-fit">
          <HelpWidgetBlock />
        </div>
      </div>
      <ScrollTop />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default Home;
