/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";

const ProgramSectionManagementCreatePage: React.FC = () => {
  return <ParseBlocks blocks="ProgramSectionManagementCreateBlock" />;
};

export default withAuth(ProgramSectionManagementCreatePage);
