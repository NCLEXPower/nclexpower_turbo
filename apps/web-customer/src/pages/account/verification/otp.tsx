import OTPBlock from "../../../components/blocks/OTPBlock/OTPBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDesignVisibility } from "core-library/hooks";

const OTPPage: React.FC = () => {
  useDesignVisibility();

  return <OTPBlock />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default OTPPage;
