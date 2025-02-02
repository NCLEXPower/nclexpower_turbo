import { DeniedCountryBlock } from "@/components/blocks/NotAvailableBlock/DeniedCountryBlock";
import { AboutUsBlock } from "../components/blocks/LandingPageBlock/AboutUsBlock/AboutUsBlock";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import React from "react";

const AboutUs: React.FC = () => <DeniedCountryBlock />;

export const getServerSideProps: GetServerSideProps = withCSP();

export default AboutUs;
