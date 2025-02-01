import { SettingsWizardFormContextProvider } from "./SettingsWizardFormContext";
import { SettingsManagementPageForm } from "./SettingsManagementPageForm";
import { useSetFileRoutes } from "../../../../../../../hooks/useSetFileRoutes";

type Props = {
  fileRoutes?: string[];
};

export const SettingsManagementPageBlock: React.FC<Props> = ({
  fileRoutes,
}) => {
  useSetFileRoutes(fileRoutes);
  return (
    <SettingsWizardFormContextProvider>
      <SettingsManagementPageForm />
    </SettingsWizardFormContextProvider>
  );
};
