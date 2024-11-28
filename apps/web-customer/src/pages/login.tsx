import React from "react";
import { LoginFormBlock } from "../components/blocks/LoginFormBlock/LoginFormBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDesignVisibility } from "core-library/hooks";

const LoginPage: React.FC = () => {
  useDesignVisibility();

  return <LoginFormBlock />;
};

export const getServerSideProps: GetServerSideProps = withCSP(
  undefined,
  "/login"
);

export default LoginPage;
