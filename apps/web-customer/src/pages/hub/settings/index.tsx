import { Container } from "@mui/material";
import { withCSP } from "core-library";
import { Tabs } from "core-library/components";
import { TabsItem } from "core-library/core/utils/contants/tabs-item";
import {
  SettingsAccountBlock,
  SettingsPlansBlock,
  SettingsSecurityBlock,
} from "core-library/system/app/internal/blocks";
import { GetServerSideProps } from "next";

const SettingsPage = () => {
  const items: TabsItem[] = [
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
      id: 1,
      title: "Plans",
      content: (
        <SettingsPlansBlock
          title="Account Plan"
          subtitle="Update your billing details and address."
        />
      ),
    },
    {
      id: 1,
      title: "Security",
      content: (
        <SettingsSecurityBlock
          title="Security Settings"
          subtitle="Control your privacy and secure your account with ease."
        />
      ),
    },
  ];
  return (
    <div className="w-full min-h-dvh bg-[#0F2A710D] py-14 sm:p-8">
      <div className="mx-auto w-fit md:min-w-[700px]">
        <h2 className="font-bold text-4xl mb-10 font-ptSans pl-5">Settings</h2>

        <div className="bg-white p-5 sm:p-10 rounded-[25px] max-w-[1500px]">
          <Tabs
            tabsItem={items}
            justifyContent="flex-start"
            tabBtnSx={{
              borderRadius: "50px",
              minHeight: "40px",
              minWidth: "110px",
              fontSize: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default SettingsPage;
