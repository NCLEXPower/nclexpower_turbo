import withAuth from 'core-library/core/utils/withAuth'
import { ParseBlocks } from 'core-library/system';
import React from 'react'

const IssueTrackingManagement: React.FC = () => {
  return <ParseBlocks blocks="IssueTrackingManagementBlock" />;
};

export default withAuth(IssueTrackingManagement);