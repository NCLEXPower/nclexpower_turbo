import { withCSP } from "core-library";
import { useNewAccount } from "core-library/contexts/auth/hooks";
import { GetServerSideProps } from "next";
import React from "react";
import { PaymentWalkthroughBlock } from "../../components/payment-line/PaymentWalkthroughBlock";

const HubOverview: React.FC = () => {
  const [isNewAccount] = useNewAccount();

  if (isNewAccount) {
    return <PaymentWalkthroughBlock />;
  }

  return (
    <>
      <div className="flex grow bg-slate-500 items-center justify-center h-screen">
        Web Customer Hub
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default HubOverview;
