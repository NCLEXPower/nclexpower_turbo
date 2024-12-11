import { DndAnswerType, DndOptionsType } from '../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/type';
import { createOptionList } from '../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/utils/createOptionList';

describe('createOptionList', () => {
    const mockOptionList: DndOptionsType[] =
        [
            {
                id: 'test-id',
                label: "test-label",
                value: "test-value"
            },
            {
                id: 'test-id-2',
                label: "test-label-2",
                value: "test-value-2"
            }
        ]
    it('should return all options if dndAnswer is empty', () => {
        const result = createOptionList(0, mockOptionList, []);
        expect(result).toEqual(mockOptionList);
    });
})