import { withCSP } from "core-library";
import { GetServerSideProps } from "next";
import React from "react";

const HubOverview: React.FC = () => {
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
