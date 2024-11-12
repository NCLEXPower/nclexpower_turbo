import React from "react";
import { ProgramListBlock } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";
import { useGetProgramList } from "core-library/hooks";

const ProgramListPage: React.FC = () => {
  const { programList } = useGetProgramList();
  const fastrackProgramList = programList ?? [];

  return (
    <ProgramListBlock
      program={fastrackProgramList}
      programTitle="Patient Units Topic (Day 1-8)"
      programSubtitle="Key patient units covered over 8 days of study."
    />
  );
};

export default ProgramListPage;