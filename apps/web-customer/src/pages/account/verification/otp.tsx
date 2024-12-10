import CSPHead from "core-library/components/CSPHead";
import OTPBlock from "../../../components/blocks/OTPBlock/OTPBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDesignVisibility } from 'core-library/hooks';

interface Props {
  generatedNonce: string;
}

const OTPPage: React.FC<Props> = ({ generatedNonce }) => {
  useDesignVisibility();

  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <OTPBlock />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default OTPPage;
