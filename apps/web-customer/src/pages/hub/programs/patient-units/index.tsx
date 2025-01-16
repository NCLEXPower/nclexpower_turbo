import React from "react";
import { ProgramListBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";
import { useGetProgramList } from "core-library/hooks";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";

const ProgramListPage: React.FC = () => {
  const { programList, loading } = useGetProgramList();
  const patientUnitsProgramList = programList ? programList.slice(15) : [];

  return (
    <ProgramListBlock
      program={patientUnitsProgramList}
      programTitle="Patient Units Topic (Day 14-23)"
      programSubtitle="Key patient units covered over 10 days of study."
      isLoading={loading}
    />
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ProgramListPage;
