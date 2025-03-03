import React, { useMemo } from "react";
import { Alert, Card, TabOption, TabPanel, TabsDesktop } from "../../../../../../components";
import { Box } from "@mui/material";
import { PolicyCreation } from "./PolicyCreation";
import { PolicyManagement } from "./PolicyManagement";

export const PolicyManagementBlock = () => {

  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Create Policy",
        content: <PolicyCreation />
        ,
      },
      {
        key: "Policy Management",
        content: <PolicyManagement />
      },
    ],
    []
  );
  return (
    <Box>
      <Alert
        severity="info"
        title="Policy Management"
        description="You can create and view all the policy that will be sent to the policy page."
      />
      <Card>
        <TabsDesktop tabs={tabs} />
        {tabs.map((tab, idx) => (
          <TabPanel index={idx}>{tab.content}</TabPanel>
        ))}
      </Card>
    </Box>
  )
}