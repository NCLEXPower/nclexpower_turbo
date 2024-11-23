import CSPHead from "core-library/components/CSPHead";
import { ForgotPasswordFormBlock } from "../../components/blocks/ForgotPasswordBlock/ForgotPasswordBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDesignVisibility } from 'core-library/hooks';

interface Props {
  generatedNonce: string;
}

export const ForgotPassword: React.FC<Props> = ({ generatedNonce }) => {
  useDesignVisibility();

  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <ForgotPasswordFormBlock />
    </>
  )
};


export const getServerSideProps: GetServerSideProps = withCSP();
export default ForgotPassword;
