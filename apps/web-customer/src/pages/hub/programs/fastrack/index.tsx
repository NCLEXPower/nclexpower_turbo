import React from "react";
import { ProgramListBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";
import { useGetProgramList } from "core-library/hooks";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";

const ProgramListPage: React.FC = () => {
  const { programList, loading } = useGetProgramList();
  const fastrackProgramList = programList ?? [];

  return (
    <ProgramListBlock
      program={fastrackProgramList}
      programTitle="Patient Units Topic (Day 1-8)"
      programSubtitle="Key patient units covered over 8 days of study."
      isLoading={loading}
    />
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ProgramListPage;
