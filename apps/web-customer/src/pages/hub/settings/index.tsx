import { SettingsManagementBlock } from "@/components/blocks/HubBlocks/SettingsManagementBlock/SettingsManagementBlock";
import { withCSP } from "core-library";
import { GetServerSideProps } from "next";

const SettingsManagementPage = () => {
  return <SettingsManagementBlock />;
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default SettingsManagementPage;
