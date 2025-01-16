import React from "react";
import { ProgramListBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";
import { useGetProgramList } from "core-library/hooks";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";

const ProgramListPage: React.FC = () => {
  const { programList, loading } = useGetProgramList();
  const bodySystemsProgramList = programList ?? [];

  return (
    <ProgramListBlock
      program={bodySystemsProgramList}
      programTitle="Body Systems Topic (Day 1-13)"
      programSubtitle="Key body systems covered over 13 days of study."
      isLoading={loading}
    />
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ProgramListPage;
