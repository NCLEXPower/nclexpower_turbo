import { TabsItem } from "core-library/core/utils/contants/tabs-item";
import {
  SettingsAccountBlock,
  SettingsPlansBlock,
  SettingsSecurityBlock,
} from "core-library/system/app/internal/blocks";

export const getSettingsTabs = (): TabsItem[] => [
  {
    id: 1,
    title: "Account",
    content: (
      <SettingsAccountBlock
        title="Your Profile"
        subtitle="Update your photo and your personal details here."
      />
    ),
  },
  {
    id: 2,
    title: "Plans",
    content: (
      <SettingsPlansBlock
        title="Account Plan"
        subtitle="Update your billing details and address."
      />
    ),
  },
  {
    id: 3,
    title: "Security",
    content: (
      <SettingsSecurityBlock
        title="Security Settings"
        subtitle="Control your privacy and secure your account with ease."
      />
    ),
  },
];
