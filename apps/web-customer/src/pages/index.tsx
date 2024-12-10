import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
} from "@/components";
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
  const { scrollTop } = useScroll();
  const { ToTopButtonSx } = useWebHeaderStyles();

  const url = useEndpointByKey({
    data: data?.endpoints,
    key: "pricing-section",
  });

  return (
    <React.Fragment>
      <div className="w-screen flex flex-col overflow-y-auto overflow-x-hidden font-ptSans ">
        <IconButton
          onClick={() => scrollTop()}
          sx={ToTopButtonSx}
          className="fadeIn"
        >
          <NorthIcon
            sx={{
              width: "25px",
              height: "25px",
            }}
            className="text-[#0f2a71]"
          />
        </IconButton>
        <div className="w-full h-screen">
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
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default Home;
