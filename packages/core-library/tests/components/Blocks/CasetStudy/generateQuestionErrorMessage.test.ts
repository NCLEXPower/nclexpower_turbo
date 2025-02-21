import { generateQuestionErrorMessage } from '../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/utils/generateQuestionErrorMessage';

describe('generateQuestionErrorMessage', () => {
    it('should return the correct message when path contains a valid number', () => {
        const path = 'questionnaires.0.dndAnswer';
        const message = 'is required';
        const expectedMessage = 'Question No. 1 is required';
        const result = generateQuestionErrorMessage(path, message);
        expect(result).toBe(expectedMessage);
    });
})