import React from "react";
import { TabsItem } from "core-library/core/utils/contants/tabs-item";
import { Tabs } from "core-library/components";
import { AccountBlock } from "./AccountBlock/AccountBlock";
import { PlansBlock } from "./PlansBlock/PlansBlock";
import { SecurityBlock } from "./SecurityBlock/SecurityBlock";

export const SettingsBlock = () => {
  const faqTabs: TabsItem[] = [
    {
      id: 1,
      title: "Account",
      content: (
        <AccountBlock
          title="Your Profile"
          subTitle="Update your photo and personal details here."
        />
      ),
    },
    {
      id: 2,
      title: "Plans",
      content: <PlansBlock title="Your Profile"
      subTitle="Update your photo and personal details here."/>,
    },
    {
      id: 3,
      title: "Security",
      content: <SecurityBlock title="Your Profile"
      subTitle="Update your photo and personal details here."/>,
    },
  ];
  return (
    <section className="p-24 w-full h-auto relative">
      <Tabs tabsItem={faqTabs} justifyContent="flex-start" />
    </section>
  );
};
