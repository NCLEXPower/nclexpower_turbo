import React from "react";
import { ParseBlocks } from "core-library/system";
import { GetServerSideProps } from "next";
import { getAllRoutes } from "@/core/utils/getFileRoutes";

type Props = {
  routes: string[];
};

const InternalApplicationSettings = ({ routes }: Props) => {
  return <ParseBlocks blocks="SettingsBlock" fileRoutes={routes} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      routes: getAllRoutes(),
    },
  };
};

export default InternalApplicationSettings;
