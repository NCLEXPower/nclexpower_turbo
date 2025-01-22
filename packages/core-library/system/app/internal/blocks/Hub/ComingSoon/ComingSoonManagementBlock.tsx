import React from "react";
import { ContentDateType } from "./validation";
import { ComingSoonManagement } from "./ComingSoonManagement";

export const ComingSoonManagementBlock: React.FC = () => {
  function onSubmit(values: ContentDateType) {
    console.log(values);
  }

  return <ComingSoonManagement />;
};
