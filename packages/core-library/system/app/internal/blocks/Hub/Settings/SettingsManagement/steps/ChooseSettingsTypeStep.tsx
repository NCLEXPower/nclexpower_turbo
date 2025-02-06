/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SettingsManagement } from './content/SettingsManagement';
import { SettingsSelectionType } from '../types';
import { QuestionManagementFormSteps } from './QuestionManagementSettingsTypeStep';
import { InAppRouterManagement } from './routing/InAppRouterManagement';
import { ImageManagement } from './ImageManagement/ImageManagement';
import { WizardFormMap } from '../../../../../../../../hooks';
import { MaintenanceMode } from './MaintenanceMode/MaintenanceMode';
import { ChatBotHeplWidget } from './ChatbotManagement/ChatBotHelpWidget';
import { MixPanelTracking } from './MixPanelTracking/MixPanelTracking';

export type SettingsManagementFormSteps = 'DatabaseExcelComparison';

export type SettingsManagementSteps =
  | 'InitialSettingsSelection'
  | SettingsManagementFormSteps
  | QuestionManagementFormSteps
  | 'ReviewerSettings'
  | 'ResourceManagement'
  | 'RouterSettings'
  | 'MaintenanceMode'
  | 'ChatbotHelpWidget'
  | 'MixPanelTracking';

export interface SettingsManagementStepProps {
  isLoading: boolean;
  previous: () => void;
  reset: () => void;
}

export const ChooseSettingsTypeStep = {
  InitialSettingsSelection: {
    nextStep: ({ values }) => {
      if (values.chosen === 'AUTOMATION' && values.selection === 'DBEXCEL')
        return 'DatabaseExcelComparison';
      if (values.chosen === 'CONFIG' && values.selection === 'QM')
        return 'SelectQuestionType';
      if (values.chosen === 'CMS' && values.selection === 'DEFAULTREVIEWER')
        return 'ReviewerSettings';
      if (values.chosen === 'CMS' && values.selection === 'RESOURCEMANAGEMENT')
        return 'ResourceManagement';
      if (values.chosen === 'ROUTER' && values.selection === 'IARM')
        return 'RouterSettings';
      if (values.chosen === 'MAINTENANCE' && values.selection === 'WEBCUSTOMER')
        return 'MaintenanceMode';
      if (values.chosen === 'CHATBOT' && values.selection === 'WEBCUSTOMER')
        return 'ChatbotHelpWidget';
      if (values.chosen === 'MIXPANEL' && values.selection === 'WEBCUSTOMER')
        return 'MixPanelTracking';
    },
    previousStep: 'InitialSettingsSelection',
    content: (props) => <SettingsManagement {...props} />,
  },
  SelectQuestionType: {
    previousStep: 'InitialSettingsSelection',
  },
  RouterSettings: {
    previousStep: 'InitialSettingsSelection',
    content: (props) => <InAppRouterManagement {...props} />,
  },
  MaintenanceMode: {
    previousStep: 'InitialSettingsSelection',
    content: (props) => <MaintenanceMode {...props} />,
  },
  ResourceManagement: {
    previousStep: 'InitialSettingsSelection',
    content: (props) => <ImageManagement {...props} />,
  },
  ChatbotHelpWidget: {
    previousStep: 'InitialSettingsSelection',
    content: (props) => <ChatBotHeplWidget {...props} />,
  },
  MixPanelTracking: {
    previousStep: 'InitialSettingsSelection',
    content: (props) => <MixPanelTracking {...props} />,
  },
} as WizardFormMap<
  Partial<SettingsManagementSteps>,
  SettingsSelectionType,
  SettingsManagementStepProps
>;
