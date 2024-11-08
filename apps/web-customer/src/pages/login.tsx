import React from "react";
import { LoginFormBlock } from "../components/blocks/LoginFormBlock/LoginFormBlock";
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

interface Props {
  generatedNonce: string;
}

const LoginPage: React.FC<Props> = ({ generatedNonce }) => {
  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <LoginFormBlock />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default LoginPage;
