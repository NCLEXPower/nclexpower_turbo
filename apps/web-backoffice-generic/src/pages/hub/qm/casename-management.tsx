import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";
import React from "react";

const CaseNameManagement = () => {
  return <ParseBlocks blocks="CaseNameManagementBlock" />;
};

export default withAuth(CaseNameManagement);
