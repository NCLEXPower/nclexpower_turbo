/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { SsrTypes } from "core-library/types/global";

type Props = {
  data: SsrTypes;
};

const InclusionMainPage: React.FC<Props> = ({ data }) => {
  return <ParseBlocks blocks="InclusionBlock" data={data} />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default withAuth(InclusionMainPage);
