import React from "react";

import { useDesignVisibility } from "core-library/hooks";

import IssueTrackingBlock from "@/components/blocks/IssueTrackingBlock/IssueTrackingBlock";
import { GetServerSideProps } from 'next';
import { withCSP } from 'core-library';


interface IssueTracking {
  refNo: string;
  reportedIssueStatus: number;
}

const IssueTracking = () => {
  useDesignVisibility({ hideHeader: false, hideFooter: true });

  return <IssueTrackingBlock/>
};
export const getServerSideProps: GetServerSideProps = withCSP();
export default IssueTracking;
