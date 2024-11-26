import CSPHead from "core-library/components/CSPHead";
import OTPBlock from "../../../components/blocks/OTPBlock/OTPBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

interface Props {
  generatedNonce: string;
}

 const OTPPage:React.FC<Props> = ({generatedNonce})=> {
  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <OTPBlock />
    </>
);
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default OTPPage;
