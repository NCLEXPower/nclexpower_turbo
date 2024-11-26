import { ResetLinkBlock } from "@/components/blocks/ForgotPasswordBlock/ResetLinkBlock/ResetLinkBlock";
import { withCSP } from "core-library";
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";

interface Props {
  generatedNonce: string;
}

export const ResetLink:React.FC<Props> = ({generatedNonce}) => {
  return (
    <>
    <CSPHead nonce={generatedNonce} />
    <ResetLinkBlock />;
    </>
)};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ResetLink;
