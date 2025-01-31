import React from "react";
import { BillingSummaryBlock } from "../../../components/blocks/HubBlocks/BillingSummaryBlock";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";

const BillingSummaryPage: React.FC = () => {
    return <BillingSummaryBlock/>
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default BillingSummaryPage;