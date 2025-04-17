import { Skeleton } from "@mui/material";
import React from "react";

const IssueTrackingSkeletonLoader = () => {
  return (
    <div className="relative w-full px-6 lg:px-12 bg-white rounded-2xl py-6">
      <Skeleton variant="text" width="60%" height={30} />
      <Skeleton variant="text" width="60%" height={30} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        className="my-4"
      />
      <Skeleton variant="text" width="40%" height={30} />
    </div>
  );
};

export default IssueTrackingSkeletonLoader;
