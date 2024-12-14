import React from "react";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { useDesignVisibility } from "core-library/hooks";
import { ComingSoonPage } from "@/components/blocks/ComingSoonBlock/ComingSoon";

const ComingSoon: React.FC = () => {

  useDesignVisibility();

  return (
    <ComingSoonPage />
  )
};

// export const getServerSideProps: GetServerSideProps = withCSP();

export default ComingSoon;
