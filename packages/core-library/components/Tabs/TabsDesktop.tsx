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
  indentIndex?: number;
  tabsSx?: SxProps;
  getTabSx?: (index: number) => SxProps;
}

export const TabsDesktop: React.FC<Props> = ({
  id,
  tabs,
  sx,
  tabsSx,
  indentIndex,
  getTabSx,
  ...other
}) => {
  const { activeTabIndex, onTabChanged } = useTabsContext();

  return (
    <Tabs
      id={id}
      value={activeTabIndex}
      onChange={(_, value) => onTabChanged(value)}
      sx={{ mb: 3, ...tabsSx }}
      {...other}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={`${index}`}
          label={tab.key}
          sx={{
            ...(getTabSx ? getTabSx(index) : sx),
          }}
        />
      ))}
    </Tabs>
  );
};
