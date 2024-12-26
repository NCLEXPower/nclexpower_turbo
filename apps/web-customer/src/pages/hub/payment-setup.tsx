import React from "react";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import { PaymentWalkthroughBlock } from "../../components/payment-line/PaymentWalkthroughBlock";
import { SsrTypes } from "core-library/types/global";
import { NotFoundBlock } from "@/components/blocks/NotFoundBlock/NotFoundBlock";

interface Props {
  data?: SsrTypes;
}

const PaymentSetup: React.FC<Props> = ({ data }) => {
  return <PaymentWalkthroughBlock />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default PaymentSetup;
