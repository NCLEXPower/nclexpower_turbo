import React, { useMemo } from "react";
import {
  Alert,
  Card,
  TabOption,
  TabPanel,
  TabsDesktop,
} from "../../../../../../../components";
import { Container } from "@mui/material";
import { RegularQuestionContentsBlock } from "./blocks/RegularQuestion/RegularQuestionContentsBlock";
import { CSQuestionContentsBlock } from "./blocks/CaseStudy/CaseStudyQuestionContentsBlock";

interface Props {}

// adminstrator
export const QuestionApprovalBlock: React.FC<Props> = () => {
  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Regular Question Contents",
        content: <RegularQuestionContentsBlock />,
      },
      {
        key: "Case Study Contents",
        content: <CSQuestionContentsBlock />,
      },
    ],
    []
  );

  return (
    <Container>
      <Alert
        severity="info"
        title="Administrator Content Approval"
        description="You can view all contents being sent by author that needs your approval. This contents will automatically added as official question in simulator once approved."
      />
      <Card>
        <TabsDesktop tabs={tabs} />
        {tabs.map((tab, idx) => (
          <TabPanel index={idx}>{tab.content}</TabPanel>
        ))}
      </Card>
    </Container>
  );
};
