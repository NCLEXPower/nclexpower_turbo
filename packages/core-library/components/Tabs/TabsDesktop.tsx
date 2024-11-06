import { Tab } from "./Tab";
import { useTabsContext } from "../../contexts";
import { Tabs, SxProps } from "@mui/material";
import React from "react";

export type TabOption = { key: string; content: JSX.Element };

interface Props {
  id?: string;
  tabs: Array<TabOption>;
  "aria-label"?: string;
  sx?: SxProps;
}

export const TabsDesktop: React.FC<Props> = ({ id, tabs, sx, ...other }) => {
  const { activeTabIndex, onTabChanged } = useTabsContext();

  return (
    <Tabs
      id={id}
      value={activeTabIndex}
      onChange={(_, value) => onTabChanged(value)}
      sx={{ mb: 3 }}
      {...other}
    >
      {tabs.map((tab, index) => (
        <Tab key={`${index}`} label={tab.key} sx={sx} />
      ))}
    </Tabs>
  );
};
