import { DndAnswerType, DndOptionsType } from '../type';

export const createOptionList = (indexPos: number, optionList: DndOptionsType[], dndAnswer: DndAnswerType[]) => {
    const option = optionList.filter((item) => {
        return !dndAnswer.some(
            (dndItem) =>
                dndItem.answerId === item.value && dndItem.indexPos !== indexPos
        );
    });
    return option;
};
