import { ChooseSettingsTypeStep } from '../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/ChooseSettingsTypeStep';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    processEnv: {},
  },
}));

describe('ChooseSettingsTypeStep', () => {
  describe('InitialSettingsSelection.nextStep', () => {
    it('should return DatabaseExcelComparison for AUTOMATION and DBEXCEL', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'AUTOMATION', selection: 'DBEXCEL' } })
      ).toBe('DatabaseExcelComparison');
    });

    it('should return SelectQuestionType for CONFIG and QM', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(nextStep({ values: { chosen: 'CONFIG', selection: 'QM' } })).toBe(
        'SelectQuestionType'
      );
    });

    it('should return ReviewerSettings for CMS and DEFAULTREVIEWER', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'CMS', selection: 'DEFAULTREVIEWER' } })
      ).toBe('ReviewerSettings');
    });

    it('should return ResourceManagement for CMS and RESOURCEMANAGEMENT', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'CMS', selection: 'RESOURCEMANAGEMENT' } })
      ).toBe('ResourceManagement');
    });

    it('should return RouterSettings for ROUTER and IARM', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'ROUTER', selection: 'IARM' } })
      ).toBe('RouterSettings');
    });

    it('should return MaintenanceMode for MAINTENANCE and WEBCUSTOMER', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({
          values: { chosen: 'MAINTENANCE', selection: 'WEBCUSTOMER' },
        })
      ).toBe('MaintenanceMode');
    });

    it('should return ChatbotHelpWidget for CHATBOT and WEBCUSTOMER', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'CHATBOT', selection: 'WEBCUSTOMER' } })
      ).toBe('ChatbotHelpWidget');
    });

    it('should return MixPanelTracking for MIXPANEL and WEBCUSTOMER', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'MIXPANEL', selection: 'WEBCUSTOMER' } })
      ).toBe('MixPanelTracking');
    });

    it('should return undefined for an unknown combination', () => {
      const nextStep = ChooseSettingsTypeStep.InitialSettingsSelection
        .nextStep as unknown as Function;
      expect(
        nextStep({ values: { chosen: 'UNKNOWN', selection: 'UNKNOWN' } })
      ).toBeUndefined();
    });
  });
});
