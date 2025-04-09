import { DeniedCountryBlock } from "@/components/blocks/NotAvailableBlock/DeniedCountryBlock";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import React from "react";

const Blocked: React.FC = () => <DeniedCountryBlock />;

export const getServerSideProps: GetServerSideProps = withCSP();

export default Blocked;
