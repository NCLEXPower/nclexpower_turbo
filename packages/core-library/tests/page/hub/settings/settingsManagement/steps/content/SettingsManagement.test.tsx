import { fireEvent, render, screen } from '../../../../../../common';
import {
  ChooseProductsConfigurations,
  ContentManagementSystemSettings,
  InAppManagement,
  MaintenanceMode,
  OtherConfigurations,
} from '../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/SettingsManagement';
import { AccessLevels } from '../../../../../../../core/utils/permission';

jest.mock('../../../../../../../config', () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock('../../../../../../../core', () => ({
  useRouter: jest.fn(),
}));

describe('Settings Components', () => {
  const mockNextStep = jest.fn();
  const mockUseAccessControl = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    nextStep: mockNextStep,
    values: { selection: undefined, chosen: undefined },
    accessLevel: AccessLevels.ADMIN,
  };

  describe('ChooseProductsConfigurations', () => {
    it('renders the component properly', () => {
      render(<ChooseProductsConfigurations {...defaultProps} />);
      expect(screen.getByText('Configuration Changes')).toBeInTheDocument();
    });

    it('does not render "Web Simulator" card when accessLevel is not ADMIN or ENCODER', () => {
      mockUseAccessControl.mockReturnValue({
        accessLevel: AccessLevels.DEVELOPER,
      });

      render(<ChooseProductsConfigurations {...defaultProps} />);

      expect(screen.queryByText(/Web Simulator/i)).not.toBeInTheDocument();
    });
  });

  describe('OtherConfigurations', () => {
    it('renders the component properly', () => {
      render(<OtherConfigurations {...defaultProps} />);
      expect(
        screen.getByText('Server/Automations & Other configurations')
      ).toBeInTheDocument();
    });

    it('calls nextStep with correct values on card click', () => {
      render(<OtherConfigurations {...defaultProps} />);
      const card = screen.getByText('DB & Excel Comparison');
      fireEvent.click(card);
      expect(mockNextStep).toHaveBeenCalledWith({
        chosen: 'AUTOMATION',
        selection: 'DBEXCEL',
      });
    });
  });

  describe('ContentManagementSystemSettings', () => {
    it('renders the component properly', () => {
      render(<ContentManagementSystemSettings {...defaultProps} />);
      expect(
        screen.getByText('CMS & Reviewers Configurations')
      ).toBeInTheDocument();
    });

    it('calls nextStep with correct values on card click', () => {
      render(<ContentManagementSystemSettings {...defaultProps} />);
      const card = screen.getByText('Default Reviewer Configuration');
      fireEvent.click(card);
      expect(mockNextStep).toHaveBeenCalledWith({
        chosen: 'CMS',
        selection: 'DEFAULTREVIEWER',
      });
    });
  });

  describe('InAppManagement', () => {
    it('renders the "In App Router Management" card', () => {
      render(<InAppManagement {...defaultProps} />);

      expect(screen.getByTestId('in-app-router-card')).toBeInTheDocument();
    });

    it('calls nextStep with correct values when "In App Router Management" card is clicked', () => {
      render(<InAppManagement {...defaultProps} />);

      const card = screen.getByTestId('in-app-router-card');
      fireEvent.click(card);

      expect(mockNextStep).toHaveBeenCalledWith({
        chosen: 'ROUTER',
        selection: 'IARM',
      });
    });
  });

  describe('MaintenanceMode', () => {
    it('renders the "Chatbot Mode" card', () => {
      render(<MaintenanceMode {...defaultProps} />);

      expect(screen.getByTestId('chatbot-widget-card')).toBeInTheDocument();
    });

    it('calls nextStep with correct values when "Chatbot Mode" card is clicked', () => {
      render(<MaintenanceMode {...defaultProps} />);

      const card = screen.getByTestId('chatbot-widget-card');
      fireEvent.click(card);

      expect(mockNextStep).toHaveBeenCalledWith({
        chosen: 'CHATBOT',
        selection: 'WEBCUSTOMER',
      });
    });
  });

  describe('MixPanel', () => {
    it('renders the "MixPanel Mode" card', () => {
      render(<MaintenanceMode {...defaultProps} />);

      expect(screen.getByTestId('mixpanel-card')).toBeInTheDocument();
    });

    it('calls nextStep with correct values when "MixPanel" card is clicked', () => {
      render(<MaintenanceMode {...defaultProps} />);

      const card = screen.getByTestId('mixpanel-card');
      fireEvent.click(card);

      expect(mockNextStep).toHaveBeenCalledWith({
        chosen: 'MIXPANEL',
        selection: 'WEBCUSTOMER',
      });
    });
  });
});
