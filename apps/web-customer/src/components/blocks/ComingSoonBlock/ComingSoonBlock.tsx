import React from "react";
import { useDesignVisibility } from "core-library/hooks";
import { ComingSoonPage } from "@/components/blocks/ComingSoonBlock/ComingSoon";

export const dateData = [{
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
}]

export const ComingSoonBlock: React.FC = () => {

  useDesignVisibility();

  return (
    <ComingSoonPage />
  )
};