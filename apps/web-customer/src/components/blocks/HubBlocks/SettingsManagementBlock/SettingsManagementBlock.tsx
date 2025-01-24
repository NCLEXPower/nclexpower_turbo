import { Tabs } from "core-library/components/Tabs/Tabs";
import { getSettingsTabs } from "./SettingsManagementTabs";

export const SettingsManagementBlock = () => {
  return (
    <div className="w-full min-h-dvh bg-[#0F2A710D] py-14 sm:p-8">
      <div className="mx-auto w-fit md:min-w-[700px]">
        <h2 className="font-bold text-4xl mb-10 font-ptSans pl-5">Settings</h2>

        <div className="bg-white p-5 sm:p-10 rounded-[25px] max-w-[1500px]">
          <Tabs
            tabsItem={getSettingsTabs()}
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
