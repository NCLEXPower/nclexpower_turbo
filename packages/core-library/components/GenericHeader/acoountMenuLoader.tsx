import { Box } from "@mui/material";
import React from "react";
import { AnimatedBoxSkeleton } from "../AnimatedBoxSkeleton/AnimatedSkeletonBox";

export const AcountMenuLoader = () => {
  return (
    <div className="h-full w-48 flex justify-center items-center gap-2 mr-2">
      <div className="w-[120px] h-full rounded-full overflow-hidden">
        <AnimatedBoxSkeleton height={40} light={"false"} />
      </div>
      <AnimatedBoxSkeleton height={10} light={"false"} />
      <AnimatedBoxSkeleton height={10} light={"false"} />
    </div>
  );
};
