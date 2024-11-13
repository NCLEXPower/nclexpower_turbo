import { getLabel } from '../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/utils/getLabel';

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
    useRouter: jest.fn(),
}));


describe("getLabel", () => {
    const arrayValues = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 }
    ];

    it('returns the correct label when value exists', () => {
        const result = getLabel(3, arrayValues);
        expect(result).toEqual({ label: 'Option 3', value: 3 });
    });

    it('returns the correct label when value is a number', () => {
        const result = getLabel(1, arrayValues);
        expect(result).toEqual({ label: 'Option 1', value: 1 });
    });

    it('returns undefined when value does not exist', () => {
        const result = getLabel('nonexistent', arrayValues);
        expect(result).toBeUndefined();
    });

})
