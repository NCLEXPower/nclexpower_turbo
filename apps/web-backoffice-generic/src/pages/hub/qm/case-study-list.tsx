import withAuth from "core-library/core/utils/withAuth";
import { ParseBlocks } from "core-library/system";
import React from "react";

const CaseStudyList = () => {
  return <ParseBlocks blocks="CaseStudyListViewBlock" />;
};

export default withAuth(CaseStudyList);
