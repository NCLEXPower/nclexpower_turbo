import { GetServerSideProps } from "next";
import { PaymentWalkthroughForm } from "./PaymentWalkthroughForm";
import { withCSP } from "core-library";
import { useDesignVisibility } from "core-library/hooks";

export const PaymentWalkthroughBlock = () => {
  useDesignVisibility();

  return <PaymentWalkthroughForm />;
};

export const getServerSideProps: GetServerSideProps = withCSP();
