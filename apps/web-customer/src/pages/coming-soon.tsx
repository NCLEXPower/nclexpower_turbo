import { GoLiveBlock } from "@/components/blocks/GoLive/GoLiveBlock";
import { DeniedCountryBlock } from "@/components/blocks/NotAvailableBlock/DeniedCountryBlock";
import { withCSP } from "core-library";
import { useDesignVisibility } from "core-library/hooks";
import { SsrTypes } from "core-library/types/global";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {
  data?: SsrTypes;
}

const ComingSoon: React.FC<Props> = ({ data }) => {
  useDesignVisibility();
  return <GoLiveBlock data={data?.hasGoLive} />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ComingSoon;
