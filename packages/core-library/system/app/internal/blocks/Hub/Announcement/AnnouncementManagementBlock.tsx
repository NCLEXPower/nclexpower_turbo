import React, { useMemo } from "react";
import { Alert, Card, TabOption, TabPanel, TabsDesktop } from "../../../../../../components";
import { Container } from "@mui/material";
import { AnnouncementPage } from "./AnnouncementPage";
import { AnnouncementManagementLists } from "./AnnouncementManagementLists";

export const AnnouncementManagementBlock = () => {

  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Create Announcement",
        content: <AnnouncementPage />
        ,
      },
      {
        key: "View Lists of Announcement",
        content: <AnnouncementManagementLists />,
      },
    ],
    []
  );
  return (
    <Container>
      <Alert
        severity="info"
        title="Announcement Management "
        description="You can create and view all the announcement that will be sent to the users."
      />
      <Card>
        <TabsDesktop tabs={tabs} />
        {tabs.map((tab, idx) => (
          <TabPanel index={idx}>{tab.content}</TabPanel>
        ))}
      </Card>
    </Container>
  )
}